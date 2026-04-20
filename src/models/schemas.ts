import { z } from 'zod';

import { BODY_ZONES } from '@/models/bodyZones';
import { ROUTE_OPTIONS, UNIT_OPTIONS } from '@/constants/app';

const zoneIds = BODY_ZONES.map((zone) => zone.id);
const routeIds = ROUTE_OPTIONS.map((route) => route.value);

export const peptideSchema = z.object({
  name: z.string().trim().min(2, 'Enter a peptide name.').max(64, 'Keep the name under 64 characters.'),
  nickname: z.string().trim().max(32, 'Keep the nickname under 32 characters.').optional().or(z.literal('')),
});

export const logEntrySchema = z.object({
  peptideId: z.string().min(1, 'Choose a peptide.'),
  dose: z.coerce.number().positive('Dose must be greater than zero.'),
  unit: z.enum(UNIT_OPTIONS),
  route: z.enum(routeIds as [string, ...string[]]),
  siteId: z.enum(zoneIds as [string, ...string[]]),
  timestamp: z.string().min(1, 'Timestamp is required.'),
  notes: z.string().trim().max(280, 'Keep notes under 280 characters.').optional().or(z.literal('')),
  mood: z.number().int().min(1).max(5).optional(),
  energy: z.number().int().min(1).max(5).optional(),
  focus: z.number().int().min(1).max(5).optional(),
});

export type PeptideInput = z.infer<typeof peptideSchema>;
export type LogEntryInput = z.infer<typeof logEntrySchema>;

