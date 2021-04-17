import React, { LegacyRef } from 'react';
import SpriteSheet from 'rn-sprite-sheet';
import { View } from 'react-native';
import { GameObject } from './types';


type MummyProps = {
  size: [number, number];
  body: Matter.Body;
  color: string;
};

let hasRun = false;


const animations = {
  walk: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  appear: Array.from({ length: 15 }, (v, i) => i + 18),
  die: Array.from({ length: 21 }, (v, i) => i + 33)
};

export default class Example extends React.Component<GameObject> {
  state = {
    loop: true,
    resetAfterFinish: false,
    fps: '16'
  };
  private mummy: SpriteSheet

  start = () => {
    console.log(this.props.type);
    if (!hasRun && this.mummy) {
      hasRun = true;
      console.log('walking');
      this.mummy.play('walk');
    }
  }

  render() {
    const { fps, loop, resetAfterFinish } = this.state;
    const { size, body, color } = this.props;

    const [width, height] = size;
    const x = body.position.x - width / 2;
    const y = body.position.y - height;




    return (
      <View style={{
        position: 'absolute',
        left: x,
        top: y,
      }}>
        <SpriteSheet
          // @ts-expect-error
          ref={ref => (this.mummy = ref)}
          source={require('./assets/mummy.png')}
          columns={9}
          rows={6}
          height={height} // set either, none, but not both
          width={width}
          imageStyle={{ marginTop: -1 }}
          animations={animations}
          onLoad={() => this.play('walk')}
        />
      </View>

    );
  }

  play = type => {
    const { fps, loop, resetAfterFinish } = this.state;

    this.mummy.play({
      type,
      fps: Number(fps),
      loop: loop,
      resetAfterFinish: resetAfterFinish,
      onFinish: () => console.log('hi')
    });
  };

  stop = () => {
    this.mummy.stop(() => console.log('stopped'));
  };
}