/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconicDian = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M454.693547 0c122.88 0 233.472 43.008 325.632 129.024 86.016 86.016 135.168 196.608 135.168 331.776 0 122.88-49.152 233.472-135.168 325.632-92.16 79.872-202.752 122.88-325.632 122.88-135.168 0-239.616-43.008-319.488-122.88A445.781333 445.781333 0 0 1 0.037547 460.8C0.037547 325.632 43.045547 215.04 135.205547 129.024 215.077547 43.008 319.525547 0 454.693547 0z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
    </Svg>
  );
};

IconicDian.defaultProps = {
  size: 18,
};

export default IconicDian;
