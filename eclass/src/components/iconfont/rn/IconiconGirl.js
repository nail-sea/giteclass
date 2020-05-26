/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconiconGirl = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M128 0h768c70.4 0 128 57.6 128 128v768c0 70.4-57.6 128-128 128H128c-70.4 0-128-57.6-128-128V128c0-70.4 57.6-128 128-128z"
        fill={getIconColor(color, 0, '#F9798A')}
      />
      <Path
        d="M512 576c-105.6 0-192-86.4-192-192s86.4-192 192-192 192 86.4 192 192-86.4 192-192 192z m0-326.4c-73.6 0-134.4 60.8-134.4 134.4 0 73.6 60.8 134.4 134.4 134.4 73.6 0 134.4-60.8 134.4-134.4 0-73.6-60.8-134.4-134.4-134.4zM678.4 700.8H352c-16 0-28.8-12.8-28.8-28.8s12.8-28.8 28.8-28.8h326.4c16 0 28.8 12.8 28.8 28.8s-12.8 28.8-28.8 28.8z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <Path
        d="M515.2 864c-16 0-28.8-12.8-28.8-28.8v-294.4c0-16 12.8-28.8 28.8-28.8s28.8 12.8 28.8 28.8v294.4c0 16-12.8 28.8-28.8 28.8z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
    </Svg>
  );
};

IconiconGirl.defaultProps = {
  size: 18,
};

export default IconiconGirl;
