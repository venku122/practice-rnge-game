import { EntityMap, GameEntity, GameEntityType } from "./types";

/**
 * Returns an array of entities of the given type
 * Memoized be almost as fast as knowing the key of the entity to begin with
 * @param entities 
 * @param type 
 */
 export function memoizedFindEntitiesByType<T extends GameEntity>(entities: EntityMap, type: GameEntityType): T[] {
  if (memoizedFindEntitiesByType.cache[type]) {
     return memoizedFindEntitiesByType.cache[type].map((entityId) => entities[entityId]);
  }

  const entitityIdsOfType: string[] = [];
  for ( let entityId in entities) {
    if (entities[entityId].type === type) {
      entitityIdsOfType.push(entityId);
    }
  }
  memoizedFindEntitiesByType.cache[type] = entitityIdsOfType;
  return entitityIdsOfType.map((entityId) => entities[entityId]) as unknown as T[];
}

memoizedFindEntitiesByType.clear = function() {
  memoizedFindEntitiesByType.cache = {};
}

memoizedFindEntitiesByType.cache = {};
