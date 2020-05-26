/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconiconShanchumima = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 512m-416 0a416 416 0 1 0 832 0 416 416 0 1 0-832 0Z"
        fill={getIconColor(color, 0, '#D1D1D1')}
      />
      <Path
        d="M512 473.6L368 329.6c-6.4-9.6-19.2-12.8-28.8-9.6s-16 9.6-19.2 19.2c0 9.6 0 22.4 9.6 28.8l144 144-144 144c-9.6 6.4-12.8 19.2-9.6 28.8 3.2 9.6 9.6 16 19.2 19.2s19.2 0 25.6-6.4l144-144 144 144c6.4 6.4 16 9.6 25.6 6.4 9.6-3.2 16-9.6 19.2-19.2 3.2-9.6 0-19.2-6.4-25.6L550.4 512l144-144c9.6-6.4 12.8-19.2 9.6-28.8-3.2-9.6-9.6-16-19.2-19.2-9.6-3.2-19.2 0-25.6 6.4L512 473.6z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </Svg>
  );
};

IconiconShanchumima.defaultProps = {
  size: 18,
};

export default IconiconShanchumima;
