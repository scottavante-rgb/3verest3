use cpal::traits::{DeviceTrait, HostTrait, StreamTrait};
use std::sync::{
    atomic::{AtomicBool, Ordering},
    Arc, Mutex,
};

pub struct AudioRecorder {
    stop_flag: Arc<AtomicBool>,
    samples_buffer: Arc<Mutex<Vec<i16>>>,
}

impl AudioRecorder {
    pub fn new() -> Self {
        Self {
            stop_flag: Arc::new(AtomicBool::new(false)),
            samples_buffer: Arc::new(Mutex::new(Vec::new())),
        }
    }

    pub fn start_streaming(&mut self, _target_sample_rate: u32) -> Result<(), String> {
        let host = cpal::default_host();
        let device = host
            .default_input_device()
            .ok_or("No input device available")?;

        let config = device
            .default_input_config()
            .map_err(|e| format!("Failed to get default input config: {}", e))?;

        let stop_flag = self.stop_flag.clone();
        let samples_buffer = self.samples_buffer.clone();

        let stream = match config.sample_format() {
            cpal::SampleFormat::F32 => device.build_input_stream(
                &config.into(),
                move |data: &[f32], _: &_| {
                    if stop_flag.load(Ordering::Relaxed) {
                        return;
                    }
                    let mut buffer = samples_buffer.lock().unwrap();
                    for &sample in data {
                        let sample_i16 = (sample * i16::MAX as f32) as i16;
                        buffer.push(sample_i16);
                    }
                },
                |err| eprintln!("Error in audio stream: {}", err),
                None,
            ),
            cpal::SampleFormat::I16 => device.build_input_stream(
                &config.into(),
                move |data: &[i16], _: &_| {
                    if stop_flag.load(Ordering::Relaxed) {
                        return;
                    }
                    let mut buffer = samples_buffer.lock().unwrap();
                    buffer.extend_from_slice(data);
                },
                |err| eprintln!("Error in audio stream: {}", err),
                None,
            ),
            cpal::SampleFormat::U16 => device.build_input_stream(
                &config.into(),
                move |data: &[u16], _: &_| {
                    if stop_flag.load(Ordering::Relaxed) {
                        return;
                    }
                    let mut buffer = samples_buffer.lock().unwrap();
                    for &sample in data {
                        let sample_i16 = (sample as i32 - 32768) as i16;
                        buffer.push(sample_i16);
                    }
                },
                |err| eprintln!("Error in audio stream: {}", err),
                None,
            ),
            _ => return Err("Unsupported sample format".to_string()),
        }
        .map_err(|e| format!("Failed to build input stream: {}", e))?;

        stream
            .play()
            .map_err(|e| format!("Failed to start recording: {}", e))?;

        // Keep the stream alive until stop is called
        // The stream will be dropped when this function returns, but we keep it alive
        // by not storing it in self (which would cause Send issues)
        while !self.stop_flag.load(Ordering::Relaxed) {
            std::thread::sleep(std::time::Duration::from_millis(10));
        }

        Ok(())
    }

    pub fn stop(&self) {
        self.stop_flag.store(true, Ordering::Relaxed);
    }

    pub fn get_samples(&self) -> Vec<i16> {
        let buffer = self.samples_buffer.lock().unwrap();
        buffer.clone()
    }

    pub fn clear_samples(&self) {
        let mut buffer = self.samples_buffer.lock().unwrap();
        buffer.clear();
    }
}

impl Default for AudioRecorder {
    fn default() -> Self {
        Self::new()
    }
}
