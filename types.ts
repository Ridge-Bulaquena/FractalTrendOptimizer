
export enum MetricType {
  FRACTAL_DIMENSION = 'FRACTAL_DIMENSION',
  ENTROPY_GRADIENT = 'ENTROPY_GRADIENT',
  CASCADE_INTENSITY = 'CASCADE_INTENSITY',
  DIFFUSION_DEPTH = 'DIFFUSION_DEPTH'
}

export interface Node {
  id: string;
  label: string;
  val: number;
  group: number;
  color?: string;
}

export interface Link {
  source: string;
  target: string;
  value: number;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}

export interface AnalysisResult {
  timestamp: number;
  fractalDimension: number;
  entropy: number;
  activeNodes: number;
  narrativeSummary: string;
}

export interface NarrativeCluster {
  id: string;
  label: string;
  strength: number;
  tags: string[];
}
