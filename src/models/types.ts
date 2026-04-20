export type RouteType = 'subcutaneous' | 'intramuscular' | 'nasal';
export type UnitType = 'mg' | 'mcg' | 'ml' | 'units';
export type BodyMapView = 'front' | 'back';

export type BodyZoneId =
  | 'left-shoulder-front'
  | 'right-shoulder-front'
  | 'left-abdomen'
  | 'right-abdomen'
  | 'left-thigh-front'
  | 'right-thigh-front'
  | 'left-arm-back'
  | 'right-arm-back'
  | 'left-glute'
  | 'right-glute'
  | 'left-thigh-back'
  | 'right-thigh-back';

export interface BodyZone {
  id: BodyZoneId;
  label: string;
  view: BodyMapView;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Peptide {
  id: string;
  name: string;
  nickname?: string;
  createdAt: string;
}

export interface LogEntry {
  id: string;
  peptideId: string;
  peptideName: string;
  dose: number;
  unit: UnitType;
  route: RouteType;
  siteId: BodyZoneId;
  siteLabel: string;
  timestamp: string;
  notes?: string;
  mood?: number;
  energy?: number;
  focus?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  createdAt: string;
}

