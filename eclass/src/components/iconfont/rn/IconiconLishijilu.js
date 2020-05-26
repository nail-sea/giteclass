/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconiconLishijilu = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M505.856 456.533333c0 23.466667 17.066667 40.533333 40.533333 42.666667L928.256 512C928.256 281.6 742.656 96 512.256 96L505.856 456.533333z"
        fill={getIconColor(color, 0, '#FF9384')}
      />
      <Path
        d="M512 960C264.533333 960 64 759.466667 64 512S264.533333 64 512 64s448 200.533333 448 448-200.533333 448-448 448z m0-832C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128z"
        fill={getIconColor(color, 1, '#424242')}
      />
    </Svg>
  );
};

IconiconLishijilu.defaultProps = {
  size: 18,
};

export default IconiconLishijilu;
