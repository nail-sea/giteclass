/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconiconWodefabu = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M66.133333 614.08C51.2 624.746667 42.666667 641.813333 42.666667 661.013333V752.746667c0 40.533333 40.533333 68.266667 78.933333 55.466666L499.2 667.413333c12.8-4.266667 27.733333-4.266667 40.533333 0l360.533334 138.666667c38.4 14.933333 78.933333-12.8 78.933333-53.333333v-91.733334c0-17.066667-8.533333-34.133333-21.333333-44.8L554.666667 302.613333c-10.666667-8.533333-23.466667-12.8-36.266667-12.8-12.8 0-23.466667 4.266667-34.133333 10.666667L66.133333 614.08z"
        fill={getIconColor(color, 0, '#FF9384')}
      />
      <Path
        d="M546.133333 987.733333h-72.533333c-72.533333 0-132.266667-59.733333-132.266667-132.266666V196.266667C341.333333 123.733333 401.066667 64 473.6 64h72.533333c72.533333 0 132.266667 59.733333 132.266667 132.266667v659.2c0 72.533333-59.733333 132.266667-132.266667 132.266666zM473.6 128C435.2 128 405.333333 157.866667 405.333333 196.266667v659.2c0 38.4 29.866667 68.266667 68.266667 68.266666h72.533333c38.4 0 68.266667-29.866667 68.266667-68.266666V196.266667c0-38.4-29.866667-68.266667-68.266667-68.266667h-72.533333z"
        fill={getIconColor(color, 1, '#424242')}
      />
    </Svg>
  );
};

IconiconWodefabu.defaultProps = {
  size: 18,
};

export default IconiconWodefabu;
