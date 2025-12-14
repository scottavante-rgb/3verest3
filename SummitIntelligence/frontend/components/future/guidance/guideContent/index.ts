export { oppositionGuide } from "./oppositionGuide";
export { judicialGuide } from "./judicialGuide";
export { briefingsGuide } from "./briefingsGuide";
export { governanceGuide } from "./governanceGuide";
export { economicsGuide } from "./economicsGuide";
export { integrationsGuide } from "./integrationsGuide";
export { simulateGuide } from "./simulateGuide";
export { intelligenceGuide } from "./intelligenceGuide";
export { meetingPrepGuide } from "./meetingPrepGuide";
export { knowledgeGuide } from "./knowledgeGuide";
export { ledgerGuide } from "./ledgerGuide";
export { signalGuide } from "./signalGuide";
export { oracleGuide } from "./oracleGuide";
export { lensGuide } from "./lensGuide";
export { dossierGuide } from "./dossierGuide";
export { autopilotGuide } from "./autopilotGuide";
export { microscopeGuide } from "./microscopeGuide";
export { panoramaGuide } from "./panoramaGuide";
export { dashboardGuide } from "./dashboardGuide";
export { agentEvolutionGuide } from "./agentEvolutionGuide";

import { oppositionGuide } from "./oppositionGuide";
import { judicialGuide } from "./judicialGuide";
import { briefingsGuide } from "./briefingsGuide";
import { governanceGuide } from "./governanceGuide";
import { economicsGuide } from "./economicsGuide";
import { integrationsGuide } from "./integrationsGuide";
import { simulateGuide } from "./simulateGuide";
import { intelligenceGuide } from "./intelligenceGuide";
import { meetingPrepGuide } from "./meetingPrepGuide";
import { knowledgeGuide } from "./knowledgeGuide";
import { ledgerGuide } from "./ledgerGuide";
import { signalGuide } from "./signalGuide";
import { oracleGuide } from "./oracleGuide";
import { lensGuide } from "./lensGuide";
import { dossierGuide } from "./dossierGuide";
import { autopilotGuide } from "./autopilotGuide";
import { microscopeGuide } from "./microscopeGuide";
import { panoramaGuide } from "./panoramaGuide";
import { dashboardGuide } from "./dashboardGuide";
import { agentEvolutionGuide } from "./agentEvolutionGuide";
import type { FeatureGuide } from "../types";

export const allGuides: Record<string, FeatureGuide> = {
  opposition: oppositionGuide,
  judicial: judicialGuide,
  briefings: briefingsGuide,
  governance: governanceGuide,
  economics: economicsGuide,
  integrations: integrationsGuide,
  simulate: simulateGuide,
  intelligence: intelligenceGuide,
  "meeting-prep": meetingPrepGuide,
  knowledge: knowledgeGuide,
  ledger: ledgerGuide,
  signal: signalGuide,
  oracle: oracleGuide,
  lens: lensGuide,
  dossier: dossierGuide,
  autopilot: autopilotGuide,
  microscope: microscopeGuide,
  panorama: panoramaGuide,
  dashboard: dashboardGuide,
  "agent-evolution": agentEvolutionGuide,
};
