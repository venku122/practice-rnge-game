import Matter from 'matter-js';
import { GameEngineSystem } from 'react-native-game-engine';
import Constants from './Constants';

const Physics: GameEngineSystem = (entities, { touches, time }) => {
  let engine = entities.physics.engine;
  let bird = entities.bird.body;

  touches.filter(t => t.type === "press").forEach(t => {
    Matter.Body.applyForce( bird, bird.position, {x: 0.00, y: -0.10});
  });

  for( let i = 1; i < 5; i++) {
    const pipe = entities[`pipe${i}`];
    if (pipe?.body.position.x <= -1 * (Constants.PIPE_WIDTH / 2)) {
      Matter.Body.setPosition(pipe.body, {x: Constants.MAX_WIDTH * 2 - (Constants.PIPE_WIDTH / 2 ), y: pipe.body.position.y});
    } else {
      Matter.Body.translate(pipe.body, {x: -1, y: 0});
    }
  }

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;