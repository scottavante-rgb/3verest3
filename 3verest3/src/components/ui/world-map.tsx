'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

interface Dot {
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
}

interface WorldMapProps {
  dots: Dot[];
}

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Helper function to create curved arc path
const createArc = (start: [number, number], end: [number, number]) => {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Control point for the arc - higher curve for longer distances
  const curvature = 0.4; // Increased from default for more pronounced arcs
  const midX = (start[0] + end[0]) / 2;
  const midY = (start[1] + end[1]) / 2 - distance * curvature;

  return `M ${start[0]},${start[1]} Q ${midX},${midY} ${end[0]},${end[1]}`;
};

const WorldMap = ({ dots }: WorldMapProps) => {
  return (
    <div className="w-full h-full absolute inset-0" suppressHydrationWarning>
      <motion.div
        className="w-full h-full relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        suppressHydrationWarning
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 140,
            center: [0, 20],
          }}
          width={800}
          height={400}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#c8e6de"
                  stroke="#00aa88"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Connection arcs */}
          {dots.map((dot, index) => {
            const startCoords: [number, number] = [dot.start.lng, dot.start.lat];
            const endCoords: [number, number] = [dot.end.lng, dot.end.lat];

            return (
              <motion.path
                key={`arc-${index}`}
                d={createArc(startCoords, endCoords)}
                fill="none"
                stroke="#00aa88"
                strokeWidth={2.5}
                strokeLinecap="round"
                opacity={0.7}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 1.5, delay: index * 0.1, ease: "easeInOut" }}
              />
            );
          })}

          {/* Location markers */}
          {dots.map((dot, index) => (
            <g key={`markers-${index}`} suppressHydrationWarning>
              <Marker coordinates={[dot.start.lng, dot.start.lat]} suppressHydrationWarning>
                <motion.circle
                  r={5}
                  fill="#00aa88"
                  stroke="#ffffff"
                  strokeWidth={2.5}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 1 }}
                  suppressHydrationWarning
                />
              </Marker>
              <Marker coordinates={[dot.end.lng, dot.end.lat]} suppressHydrationWarning>
                <motion.circle
                  r={5}
                  fill="#00aa88"
                  stroke="#ffffff"
                  strokeWidth={2.5}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 1.2 }}
                  suppressHydrationWarning
                />
              </Marker>
            </g>
          ))}
        </ComposableMap>
      </motion.div>
    </div>
  );
};

export default WorldMap;
