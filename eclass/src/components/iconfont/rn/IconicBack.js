/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconicBack = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M620.6976 165.7088L319.3088 469.9136c-16.128 16.2816-16.128 42.496 0 58.3936L620.8 832.5888c16.128 16.2816 42.1632 16.2816 58.3168 0a41.728 41.728 0 0 0 0-58.7776L406.6304 499.1488 679.0912 224.512a41.728 41.728 0 0 0 0-58.8032A41.7792 41.7792 0 0 0 649.984 153.6a42.112 42.112 0 0 0-29.312 12.1088z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
    </Svg>
  );
};

IconicBack.defaultProps = {
  size: 18,
};

export default IconicBack;
