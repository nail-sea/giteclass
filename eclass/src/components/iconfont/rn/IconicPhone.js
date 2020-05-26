/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconicPhone = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M704.387879 598.884848c-43.442424 0-77.575758 40.339394-114.812121 40.339394-37.236364 0-211.006061-170.666667-211.006061-214.10909 0-43.442424 37.236364-62.060606 37.236364-108.606061 0-31.030303-114.812121-223.418182-161.357576-223.418182S93.090909 179.975758 93.090909 257.551515C93.090909 490.278788 508.89697 930.909091 769.551515 930.909091c71.369697 0 161.357576-77.575758 161.357576-164.460606 0-31.030303-186.181818-167.563636-226.521212-167.563637z"
        fill={getIconColor(color, 0, '#FF8256')}
      />
    </Svg>
  );
};

IconicPhone.defaultProps = {
  size: 18,
};

export default IconicPhone;
