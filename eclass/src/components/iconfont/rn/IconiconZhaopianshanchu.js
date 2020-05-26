/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconiconZhaopianshanchu = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 32c265.6 0 480 214.4 480 480s-214.4 480-480 480S32 777.6 32 512 246.4 32 512 32z"
        fill={getIconColor(color, 0, '#A0A0A0')}
        opacity=".6"
      />
      <Path
        d="M528 480l-179.2-182.4c-9.6-9.6-22.4-12.8-35.2-9.6s-22.4 12.8-25.6 25.6 0 25.6 9.6 35.2l182.4 179.2-179.2 179.2c-12.8 9.6-16 22.4-12.8 35.2 3.2 12.8 12.8 22.4 25.6 25.6 12.8 3.2 25.6 0 35.2-9.6l179.2-182.4 179.2 179.2c9.6 9.6 22.4 12.8 35.2 9.6 12.8-3.2 22.4-12.8 25.6-25.6 3.2-12.8 0-25.6-9.6-35.2L576 528l179.2-179.2c12.8-9.6 16-22.4 12.8-35.2-3.2-12.8-12.8-22.4-25.6-25.6-12.8-3.2-25.6 0-35.2 9.6L528 480z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </Svg>
  );
};

IconiconZhaopianshanchu.defaultProps = {
  size: 18,
};

export default IconiconZhaopianshanchu;
