import React from 'react';
import { View } from 'react-native';

type WallProps = {
  size: [number, number];
  body: Matter.Body;
  color: string;
}

const Wall = ({ size, body, color }: WallProps)  => {

  const [width, height] = size;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;
  return (
    <View 
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        backgroundColor: color
      }}
    />
  )
}

export default Wall;