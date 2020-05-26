/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconiconGuanyuEwang = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 949.333333C270.933333 949.333333 74.666667 753.066667 74.666667 512S270.933333 74.666667 512 74.666667 949.333333 270.933333 949.333333 512 753.066667 949.333333 512 949.333333z m0-810.666666C307.2 138.666667 138.666667 307.2 138.666667 512S307.2 885.333333 512 885.333333 885.333333 716.8 885.333333 512 716.8 138.666667 512 138.666667z"
        fill={getIconColor(color, 0, '#424242')}
      />
      <Path
        d="M819.2 522.666667c0 164.266667-134.4 298.666667-298.666667 298.666666v-597.333333c164.266667 0 298.666667 132.266667 298.666667 298.666667"
        fill={getIconColor(color, 1, '#F87C6A')}
      />
    </Svg>
  );
};

IconiconGuanyuEwang.defaultProps = {
  size: 18,
};

export default IconiconGuanyuEwang;
