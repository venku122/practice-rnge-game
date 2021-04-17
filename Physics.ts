import Matter from 'matter-js';
import Constants from './Constants';
import { EntityMap, GameEngineSystemTS, GameEntity, GameEntityType, GameObject, GamePhysics } from './types';
import { memoizedFindEntitiesByType } from './utils';




const Physics: GameEngineSystemTS = (entities, { touches, time }) => {
  let [ physicsSystem ] = memoizedFindEntitiesByType<GamePhysics>(entities, 'physics');
  let physicsEngine = physicsSystem.engine;
  let mummy = entities['mummy'] as GameObject;
  let mummyBody = mummy.body;

  touches.filter(t => t.type === "press").forEach(t => {
    Matter.Body.applyForce( mummyBody, mummyBody.position, {x: 0.00, y: -0.10});
  });

  /*
  for( let i = 1; i < 5; i++) {
    const pipe = entities[`pipe${i}`];
    if (pipe) {
      if (pipe?.body.position.x <= -1 * (Constants.PIPE_WIDTH / 2)) {
        Matter.Body.setPosition(pipe.body, {x: Constants.MAX_WIDTH * 2 - (Constants.PIPE_WIDTH / 2 ), y: pipe.body.position.y});
      } else {
        Matter.Body.translate(pipe.body, {x: -1, y: 0});
      }
    }
  }
  */

  Matter.Engine.update(physicsEngine, time.delta);

  return entities;
};

export default Physics;