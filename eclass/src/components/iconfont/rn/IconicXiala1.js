/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconicXiala1 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M757.2224 369.9968c-8.0896-8.704-18.8672-11.5968-29.6448-11.5968l-404.224 2.8928c-10.752 0-21.5552 2.8928-29.6192 11.5968a44.2368 44.2368 0 0 0 0 60.8512l202.0864 217.3696c2.7136 2.8928 8.0896 5.7856 10.7776 8.704l2.7136 2.8928c13.4656 5.7856 32.3328 2.8928 43.1104-8.704l202.112-220.2624c18.8672-20.2752 16.1536-46.336 2.688-63.744z"
        fill={getIconColor(color, 0, '#747474')}
      />
    </Svg>
  );
};

IconicXiala1.defaultProps = {
  size: 18,
};

export default IconicXiala1;
