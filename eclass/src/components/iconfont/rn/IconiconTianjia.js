/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconiconTianjia = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 448h1024v128H0z"
        fill={getIconColor(color, 0, '#EBEBEB')}
      />
      <Path
        d="M448 0h128v1024h-128z"
        fill={getIconColor(color, 1, '#EBEBEB')}
      />
    </Svg>
  );
};

IconiconTianjia.defaultProps = {
  size: 18,
};

export default IconiconTianjia;
