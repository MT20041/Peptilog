import { BodyZone } from '@/models/types';

export const BODY_ZONES: BodyZone[] = [
  { id: 'left-shoulder-front', label: 'Left shoulder', view: 'front', x: 22, y: 16, width: 18, height: 12 },
  { id: 'right-shoulder-front', label: 'Right shoulder', view: 'front', x: 60, y: 16, width: 18, height: 12 },
  { id: 'left-abdomen', label: 'Left abdomen', view: 'front', x: 28, y: 40, width: 18, height: 14 },
  { id: 'right-abdomen', label: 'Right abdomen', view: 'front', x: 54, y: 40, width: 18, height: 14 },
  { id: 'left-thigh-front', label: 'Left thigh', view: 'front', x: 31, y: 67, width: 16, height: 18 },
  { id: 'right-thigh-front', label: 'Right thigh', view: 'front', x: 53, y: 67, width: 16, height: 18 },
  { id: 'left-arm-back', label: 'Left upper arm', view: 'back', x: 20, y: 18, width: 18, height: 14 },
  { id: 'right-arm-back', label: 'Right upper arm', view: 'back', x: 62, y: 18, width: 18, height: 14 },
  { id: 'left-glute', label: 'Left glute', view: 'back', x: 30, y: 44, width: 16, height: 14 },
  { id: 'right-glute', label: 'Right glute', view: 'back', x: 54, y: 44, width: 16, height: 14 },
  { id: 'left-thigh-back', label: 'Left thigh', view: 'back', x: 31, y: 67, width: 16, height: 18 },
  { id: 'right-thigh-back', label: 'Right thigh', view: 'back', x: 53, y: 67, width: 16, height: 18 },
];

export const BODY_ZONE_MAP = Object.fromEntries(BODY_ZONES.map((zone) => [zone.id, zone]));

