/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconiconZhanzhangguanli = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M659.264 677.034667c151.466667 0 275.2-123.733333 275.2-275.2C934.464 250.368 810.730667 126.634667 659.264 126.634667 505.664 126.634667 384.064 250.368 384.064 401.834667 384.064 553.301333 505.664 677.034667 659.264 677.034667z"
        fill={getIconColor(color, 0, '#FF9384')}
      />
      <Path
        d="M520.533333 736.981333c-170.666667 0-307.2-138.666667-307.2-307.2S349.866667 122.581333 520.533333 122.581333s307.2 138.666667 307.2 307.2-138.666667 307.2-307.2 307.2z m0-550.4C386.133333 186.581333 277.333333 295.381333 277.333333 429.781333s108.8 243.2 243.2 243.2S763.733333 564.181333 763.733333 429.781333 652.8 186.581333 520.533333 186.581333z"
        fill={getIconColor(color, 1, '#424242')}
      />
      <Path
        d="M106.666667 920.448h825.6v-87.466667H106.666667z"
        fill={getIconColor(color, 2, '#424242')}
      />
    </Svg>
  );
};

IconiconZhanzhangguanli.defaultProps = {
  size: 18,
};

export default IconiconZhanzhangguanli;
