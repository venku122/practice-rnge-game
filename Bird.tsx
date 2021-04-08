import React from 'react';
import { View } from 'react-native';

type BirdProps = {
  size: [number, number];
  body: Matter.Body;
  color: string;
}

const Bird = ({ size, body, color }: BirdProps) => {

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
  );
};
export default Bird;
