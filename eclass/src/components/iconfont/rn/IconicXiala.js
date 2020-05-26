/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconicXiala = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M690.5856 448.3584l-188.5696 221.9008a20.48 20.48 0 0 1-31.232 0l-188.5696-221.9008a20.48 20.48 0 0 1 15.616-33.7408h377.1392a20.48 20.48 0 0 1 15.616 33.7408z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
    </Svg>
  );
};

IconicXiala.defaultProps = {
  size: 18,
};

export default IconicXiala;
