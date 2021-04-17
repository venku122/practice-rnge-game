import { GameEngineUpdateEventOptionType } from "react-native-game-engine";

export type GameEntityType = 'object' | 'physics' | 'bullet' | 'shooting';

type GameEntityBase = {
  type: GameEntityType;
  id: string;
}

export type GameObject = GameEntityBase & {
  body: Matter.Body;
  size: [number, number];
  color: string;
  renderer: React.ComponentType;
  type: 'object';
}

export type GameBullet = GameEntityBase & {
  body: Matter.Body;
  size: [number, number];
  color: string;
  renderer: React.ComponentType;
  type: 'bullet';
}

export type GamePhysics = GameEntityBase & {
  engine: Matter.Engine;
  world: Matter.World;
  type: 'physics';
}

export type GameShooting = GameEntityBase & {
  engine: Matter.Engine;
  world: Matter.World;
  type: 'shooting';
}

export type GameEntity = GameObject | GamePhysics | GameBullet | GameShooting;

export type EntityMap = {[key: string]: GameEntity}

// not included in the official types :/
export interface GameEngineMethods {
  start: () => void;
  stop: () => void;
  swap: (newEntities: {} | Promise<any> ) => void;
  dispatch: (event: any) => void;
}

export type GameEngineSystemTS = (entities: EntityMap, update: GameEngineUpdateEventOptionType) => EntityMap;