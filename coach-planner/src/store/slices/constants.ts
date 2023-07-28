import { uuidv4 } from '@firebase/util';
import { Vector2d } from 'konva/lib/types';

export enum LineTypes {
  forward = 'forward',
  backward = 'backward',
  pass = 'pass',
  forwardPuck = 'puckForward',
  backwardPuck = 'puckBackward',
  shot = 'shot',
}

export enum ColorTypes {
  red = 'red',
  blue = 'blue',
  black = 'black',
  green = 'green',
}
export enum UserActionsValues {
  select = 'select',
  draw = 'draw',
  addPlayer = 'addPlayer',
  addEquipment = 'addEquipment',
}

export interface CanvasState {
  lineType: LineTypes;
  color: ColorTypes;
  lineWidth: number;
  userAction: UserActionsValues;
  playerType: PlayerTypes;
  equipmentType: EquipmentTypes;
}

export interface ColorWidth {
  color: ColorTypes;
  lineWidth: number;
}

export interface ArrowLine {
  id: string;
  points: number[];
  color: string;
  line: LineTypes;
  width: number;
}

export const getObjectWithId = <T>(object: T): T & { id: string } => ({
  ...object,
  id: uuidv4(),
});

export enum PlayerTypes {
  circle = 'circle',
  triangle = 'triangle',
  square = 'square',
}

export interface Player {
  point: number[];
  color: string;
  type: PlayerTypes;
  id: string;
}

export interface Equipment {
  rotation: number;
  scale?: Vector2d | undefined;
  point: number[];
  color: string;
  type: EquipmentTypes;
  id: string;
}

export enum EquipmentTypes {
  puck = 'puck',
  stick = 'stick',
  tire = 'tire',
  ball = 'ball',
  cone = 'cone',
  goal = 'goal',
}

export interface DrawObjectsState {
  current: string | null;
  lines: Record<string, ArrowLine> | null;
  players: Record<string, Player> | null;
  equipment: Record<string, Equipment> | null;
  convaSize?: number | null;
}
