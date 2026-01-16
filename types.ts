
export enum Branch {
  RQNTC = 'R-QNT-C',
  RQNTV = 'R-QNT-V'
}

export enum Chirality {
  Dextro = 'Right-Handed',
  Levo = 'Left-Handed'
}

export interface KnotParticle {
  id: string;
  type: 'Proton' | 'Electron' | 'Neutron';
  position: { x: number; y: number; z: number };
  chirality: Chirality;
  mass: number;
  torsion: number;
}

export interface SimulationState {
  size: number;
  k_vacuum: number;
  branch: Branch;
  particles: KnotParticle[];
  isSimulating: boolean;
}

export interface TheoryMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  thought?: string;
}
