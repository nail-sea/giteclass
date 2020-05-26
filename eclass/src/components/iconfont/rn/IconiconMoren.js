/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconiconMoren = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M508.8 39.2c263.2 0 476.8 213.6 476.8 476.8S772 992 508.8 992C245.6 992 32 778.4 32 515.2S245.6 39.2 508.8 39.2"
        fill={getIconColor(color, 0, '#FFE8DF')}
      />
      <Path
        d="M680.8 684c-36 35.2-88.8 57.6-149.6 57.6s-113.6-23.2-149.6-57.6c-88.8 30.4-164.8 86.4-219.2 159.2 66.4 80 219.2 162.4 391.2 146.4 80 2.4 236-61.6 324.8-173.6-52-60-120-105.6-197.6-132"
        fill={getIconColor(color, 1, '#FAC1B1')}
      />
      <Path
        d="M497.6 314.4C452 395.2 372 468 296 419.2c0 8 0.8 15.2 1.6 22.4 16 118.4 116.8 209.6 239.2 209.6 130.4 0 237.6-104 240.8-232.8-63.2 40.8-230.4-16-280-104"
        fill={getIconColor(color, 2, '#F4CDA2')}
      />
      <Path
        d="M488.8 316.8C540 400.8 712 465.6 778.4 427.2c4.8-78.4-32.8-148.8-84-191.2-19.2-16-40.8-28-64-38.4-31.2-13.6-64-19.2-92.8-19.2h-8.8c9.6 28.8-7.2 84.8-40 138.4"
        fill={getIconColor(color, 3, '#81655F')}
      />
      <Path
        d="M496 327.2c32-57.6 47.2-119.2 39.2-148.8H528c-168 11.2-236 148.8-232 260.8 76 48.8 154.4-27.2 200-112"
        fill={getIconColor(color, 4, '#6D524D')}
      />
    </Svg>
  );
};

IconiconMoren.defaultProps = {
  size: 18,
};

export default IconiconMoren;
