/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconiconFenxiangerweima = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M610.133333 106.666667l373.333334 373.333333-373.333334 375.466667v-213.333334S238.933333 601.6 21.333333 908.8C21.333333 908.8 89.6 320 610.133333 320V106.666667z"
        fill={getIconColor(color, 0, '#F87C6A')}
      />
    </Svg>
  );
};

IconiconFenxiangerweima.defaultProps = {
  size: 18,
};

export default IconiconFenxiangerweima;
