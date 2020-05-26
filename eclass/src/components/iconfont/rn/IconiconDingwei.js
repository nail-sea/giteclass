/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconiconDingwei = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M857.6 832c0 51.2-150.4 96-332.8 96S192 886.4 192 832s150.4-96 332.8-96 332.8 44.8 332.8 96"
        fill={getIconColor(color, 0, '#FF9384')}
      />
      <Path
        d="M528 816c-16 0-32-6.4-44.8-16-83.2-73.6-275.2-256-275.2-400 0-176 144-320 320-320s320 144 320 320c0 144-192 329.6-275.2 400-12.8 9.6-28.8 16-44.8 16z m0-640c-124.8 0-224 99.2-224 224 0 76.8 108.8 208 224 310.4 115.2-102.4 224-233.6 224-310.4 0-124.8-99.2-224-224-224z"
        fill={getIconColor(color, 1, '#424242')}
      />
      <Path
        d="M608 400c0 44.8-35.2 80-80 80S448 444.8 448 400s35.2-80 80-80 80 35.2 80 80"
        fill={getIconColor(color, 2, '#424242')}
      />
    </Svg>
  );
};

IconiconDingwei.defaultProps = {
  size: 18,
};

export default IconiconDingwei;
