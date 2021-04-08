import React,  { Component } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Matter from 'matter-js';
import { GameEngine } from 'react-native-game-engine';
import Constants from './Constants';
import Physics from './Physics';
import Bird from './Bird';
import Wall from './Wall';
import { generatePipes } from './PipeGenerator';
 

type State = {
  running: boolean;
}

// not included in the official types :/
interface GameEngineMethods {
  start: () => void;
  stop: () => void;
  swap: (newEntities: {} | Promise<any> ) => void;
  dispatch: (event: any) => void;
}
export default class App extends Component<void, State> {

  private gameEngine: GameEngineMethods;
  private entities: {};

  constructor(props) {
    super(props);

    this.state = {
      running: true,
    };

    this.gameEngine = null;

    this.entities = this.setupWorld();
  }

  setupWorld = (): {} => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    let bird = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 4, Constants.MAX_HEIGHT / 2, 50, 50);

    let floor = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT - 25, Constants.MAX_WIDTH, 50, { isStatic: true });
    let ceiling = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 2, 25, Constants.MAX_WIDTH, 50, { isStatic: true });

    let [pipe1Height, pipe2Height] = generatePipes();

    let pipe1 = Matter.Bodies.rectangle( Constants.MAX_WIDTH - (Constants.PIPE_WIDTH / 2), pipe1Height / 2, Constants.PIPE_WIDTH, pipe1Height, { isStatic: true });
    let pipe2 = Matter.Bodies.rectangle(Constants.MAX_WIDTH - (Constants.PIPE_WIDTH / 2), Constants.MAX_HEIGHT - (pipe2Height / 2), Constants.PIPE_WIDTH, pipe2Height, { isStatic: true });

    let [pipe3Height, pipe4Height] = generatePipes();

    let pipe3 = Matter.Bodies.rectangle( Constants.MAX_WIDTH * 2 - (Constants.PIPE_WIDTH / 2), pipe3Height / 2, Constants.PIPE_WIDTH, pipe3Height, { isStatic: true });
    let pipe4 = Matter.Bodies.rectangle( Constants.MAX_WIDTH * 2 - (Constants.PIPE_WIDTH / 2), Constants.MAX_HEIGHT - (pipe4Height / 2), Constants.PIPE_WIDTH, pipe4Height, { isStatic: true });

    Matter.World.add(world, [bird, floor, ceiling, pipe1, pipe2, pipe3, pipe4]);

    Matter.Events.on(engine, 'collisionStart', (event) => {
      const { pairs } = event;
      this.gameEngine.dispatch({ type: 'game-over' });
    });

    return {
      physics: { engine, world },
      bird: { body: bird, size: [50, 50], color: 'red', renderer: Bird},
      floor: { body: floor, size: [Constants.MAX_WIDTH, 50], color: 'green', renderer: Wall},
      ceiling: { body: ceiling, size: [Constants.MAX_WIDTH, 50], color: 'green', renderer: Wall},
      pipe1: { body: pipe1, size: [Constants.PIPE_WIDTH, pipe1Height], color: "green", renderer: Wall },
      pipe2: { body: pipe2, size: [Constants.PIPE_WIDTH, pipe2Height], color: "green", renderer: Wall },
      pipe3: { body: pipe3, size: [Constants.PIPE_WIDTH, pipe3Height], color: "green", renderer: Wall },
      pipe4: { body: pipe4, size: [Constants.PIPE_WIDTH, pipe4Height], color: "green", renderer: Wall }
    };
  }

  onEvent = (e) => {
    if (e.type === 'game-over') {
      this.setState({
        running: false
      });
    }
  }

  reset = () => {
    this.gameEngine.swap(this.setupWorld());
    this.setState({
      running: true,
    });
  }


  render() {
    const { running } = this.state;
    return (
      <View style={styles.container}>
          <GameEngine 
          // @ts-expect-error
            ref={(ref) => { this.gameEngine = ref}}
            style={styles.gameContainer}
            running={this.state.running}
            systems={[Physics]}
            entities={this.entities}
            onEvent={this.onEvent}
          >
                {!running && <TouchableOpacity style={styles.fullScreenButton} onPress={this.reset}>
                    <View style={styles.fullScreen}>
                        <Text style={styles.gameOverText}>Game Over</Text>
                    </View>
                </TouchableOpacity>}
              <StatusBar hidden={true} />
            </GameEngine>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
  gameContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
  },
  gameOverText: {
      color: 'white',
      fontSize: 48
  },
  fullScreen: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'black',
      opacity: 0.8,
      justifyContent: 'center',
      alignItems: 'center'
  },
  fullScreenButton: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      flex: 1
  }
});

