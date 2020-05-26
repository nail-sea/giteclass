/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconicShare = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M793.6 260.8128L444.3648 608.3328a38.4 38.4 0 0 1-54.1696-54.4256L741.0176 204.8h-145.1776a38.4 38.4 0 0 1 0-76.8H762.88A107.52 107.52 0 0 1 870.4 235.52v167.04a38.4 38.4 0 0 1-76.8 0v-141.7472z m0 326.3232a38.4 38.4 0 1 1 76.8 0V788.48a107.52 107.52 0 0 1-107.52 107.52H209.92A107.52 107.52 0 0 1 102.4 788.48V235.52A107.52 107.52 0 0 1 209.92 128h201.344a38.4 38.4 0 0 1 0 76.8H209.92A30.72 30.72 0 0 0 179.2 235.52v552.96A30.72 30.72 0 0 0 209.92 819.2h552.96a30.72 30.72 0 0 0 30.72-30.72v-201.344z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
    </Svg>
  );
};

IconicShare.defaultProps = {
  size: 18,
};

export default IconicShare;
