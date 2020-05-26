/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconiconJian = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 1024C229.451852 1024 0 794.548148 0 512S229.451852 0 512 0s512 229.451852 512 512-229.451852 512-512 512z m0-986.074074C250.311111 37.925926 37.925926 250.311111 37.925926 512s212.385185 474.074074 474.074074 474.074074 474.074074-212.385185 474.074074-474.074074S773.688889 37.925926 512 37.925926z"
        fill={getIconColor(color, 0, '#C8C8C8')}
      />
      <Path
        d="M777.481481 549.925926H246.518519c-15.17037 0-28.444444-13.274074-28.444445-28.444445S231.348148 493.037037 246.518519 493.037037h530.962962c15.17037 0 28.444444 13.274074 28.444445 28.444444S792.651852 549.925926 777.481481 549.925926z"
        fill={getIconColor(color, 1, '#C8C8C8')}
      />
    </Svg>
  );
};

IconiconJian.defaultProps = {
  size: 18,
};

export default IconiconJian;
