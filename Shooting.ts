import Matter from 'matter-js';
import Constants from './Constants';
import { EntityMap, GameBullet, GameEngineSystemTS, GameEntity, GameEntityType, GameObject, GamePhysics } from './types';
import { memoizedFindEntitiesByType } from './utils';
import Bullet from './Bullet';




const Shooting: GameEngineSystemTS = (entities, { touches, time }) => {
  let bullets = memoizedFindEntitiesByType<GameBullet>(entities, 'bullet');
  let [ physicsEngine ] = memoizedFindEntitiesByType<GamePhysics>(entities, 'physics');
  const { engine } = physicsEngine;
  const { world } = engine;
  let mummy = entities['mummy'] as GameObject;
  let mummyBody = mummy.body;

  const createBullet = () => {
    if (bullets.length < 50) {
      const bulletBody = Matter.Bodies.rectangle(mummyBody.position.x + 30, mummyBody.position.y - 25, 10, 10)
     
      const bulletId = `bullet_${bullets.length + 1}`;
      const bullet: GameBullet = { type: 'bullet',  body: bulletBody, size: [10, 10], color: 'red', renderer: Bullet, id: bulletId};
      // adding to entities
      entities[bulletId] = bullet;
      memoizedFindEntitiesByType.clear();
      console.log('adding to physics engine');
      Matter.World.add(world, bulletBody);
      Matter.Body.applyForce( bulletBody, bulletBody.position, {x: 0.01, y: 0.00});
    }
  }

  touches.filter(t => t.type === "press").forEach(t => {

    console.log('creating bullet');
    createBullet()
    // 
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

  // Matter.Engine.update(physicsEngine, time.delta);

  return entities;
};

export default Shooting;