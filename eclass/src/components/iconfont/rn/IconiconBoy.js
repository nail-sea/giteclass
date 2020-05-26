/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconiconBoy = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M128 0h768c70.4 0 128 57.6 128 128v768c0 70.4-57.6 128-128 128H128c-70.4 0-128-57.6-128-128V128c0-70.4 57.6-128 128-128z"
        fill={getIconColor(color, 0, '#25D3D1')}
      />
      <Path
        d="M560 492.8c-6.4 0-16-3.2-19.2-9.6-12.8-12.8-12.8-28.8 0-41.6l192-192c12.8-12.8 28.8-12.8 41.6 0s12.8 28.8 0 41.6l-192 192c-6.4 6.4-16 9.6-22.4 9.6z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <Path
        d="M768 496c-16 0-28.8-12.8-28.8-28.8V313.6c0-16 0-19.2-3.2-19.2 0-3.2-3.2-6.4-6.4-6.4s-6.4-3.2-22.4-3.2H544c-16 0-28.8-12.8-28.8-28.8s12.8-28.8 28.8-28.8h163.2c22.4 0 35.2 3.2 48 9.6 12.8 6.4 22.4 16 28.8 28.8 6.4 12.8 9.6 25.6 9.6 48v153.6c3.2 16-9.6 28.8-25.6 28.8zM448 800c-105.6 0-192-86.4-192-192s86.4-192 192-192 192 86.4 192 192-86.4 192-192 192z m0-326.4c-73.6 0-134.4 60.8-134.4 134.4 0 73.6 60.8 134.4 134.4 134.4 73.6 0 134.4-60.8 134.4-134.4 0-73.6-60.8-134.4-134.4-134.4z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
    </Svg>
  );
};

IconiconBoy.defaultProps = {
  size: 18,
};

export default IconiconBoy;
