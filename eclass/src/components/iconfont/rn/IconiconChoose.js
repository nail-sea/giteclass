/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconiconChoose = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m0-950.857143C270.628571 73.142857 73.142857 270.628571 73.142857 512s197.485714 438.857143 438.857143 438.857143 438.857143-197.485714 438.857143-438.857143S753.371429 73.142857 512 73.142857z"
        fill={getIconColor(color, 0, '#F87C6A')}
      />
      <Path
        d="M512 512m-256 0a256 256 0 1 0 512 0 256 256 0 1 0-512 0Z"
        fill={getIconColor(color, 1, '#F87C6A')}
      />
    </Svg>
  );
};

IconiconChoose.defaultProps = {
  size: 18,
};

export default IconiconChoose;
