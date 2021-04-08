import { Dimensions } from 'react-native';
const Constants = {
  MAX_WIDTH: Dimensions.get("screen").width,
  MAX_HEIGHT: Dimensions.get("screen").height,
  GAP_SIZE: 200, // gap between the two parts of the pipe
  PIPE_WIDTH: 100 // width of the pipe
}
export default Constants;