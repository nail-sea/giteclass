/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconiconDianpuguanli = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M388.266667 448C362.666667 448 341.333333 465.066667 341.333333 486.4v347.733333c0 21.333333 21.333333 38.4 46.933334 38.4h247.466666c25.6 0 46.933333-17.066667 46.933334-38.4V486.4c0-21.333333-21.333333-38.4-46.933334-38.4H388.266667z"
        fill={getIconColor(color, 0, '#FF8D8D')}
      />
      <Path
        d="M793.6 932.266667H215.466667c-66.133333 0-119.466667-53.333333-119.466667-119.466667V362.666667c0-42.666667 23.466667-83.2 59.733333-104.533334l288-166.4c36.266667-21.333333 83.2-21.333333 119.466667 0L853.333333 258.133333c36.266667 21.333333 59.733333 61.866667 59.733334 104.533334v450.133333c0 66.133333-53.333333 119.466667-119.466667 119.466667zM503.466667 138.666667c-10.666667 0-19.2 2.133333-27.733334 8.533333L187.733333 313.6C170.666667 324.266667 160 341.333333 160 362.666667v450.133333c0 29.866667 25.6 55.466667 55.466667 55.466667h578.133333c29.866667 0 55.466667-25.6 55.466667-55.466667V362.666667c0-19.2-10.666667-38.4-27.733334-49.066667L533.333333 147.2c-8.533333-6.4-19.2-8.533333-29.866666-8.533333z"
        fill={getIconColor(color, 1, '#424242')}
      />
    </Svg>
  );
};

IconiconDianpuguanli.defaultProps = {
  size: 18,
};

export default IconiconDianpuguanli;
