/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconicZhankai = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M658.9184 534.7072l-197.2224 197.2224a32.1024 32.1024 0 1 1-45.4144-45.44L590.7712 512l-174.4896-174.4896a32.128 32.128 0 0 1 45.4144-45.44l197.2224 197.2224a32.0256 32.0256 0 0 1 0 45.4144z"
        fill={getIconColor(color, 0, '#C8C8C8')}
      />
    </Svg>
  );
};

IconicZhankai.defaultProps = {
  size: 18,
};

export default IconicZhankai;
