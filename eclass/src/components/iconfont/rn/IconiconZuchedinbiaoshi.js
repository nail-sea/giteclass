/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconiconZuchedinbiaoshi = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"
        fill={getIconColor(color, 0, '#C8C8C8')}
      />
    </Svg>
  );
};

IconiconZuchedinbiaoshi.defaultProps = {
  size: 18,
};

export default IconiconZuchedinbiaoshi;
