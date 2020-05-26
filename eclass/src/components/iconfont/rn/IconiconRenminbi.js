/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconiconRenminbi = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M290.133333 8.533333L512 443.733333 736.711111 5.688889h187.733333l-278.755555 500.622222h190.577778v88.177778h-241.777778v122.311111h241.777778v88.177778h-241.777778V1024h-164.977778v-216.177778H190.577778v-88.177778h238.933333V597.333333H190.577778v-88.177777h187.733333L99.555556 8.533333h190.577777z"
        fill={getIconColor(color, 0, '#424242')}
      />
    </Svg>
  );
};

IconiconRenminbi.defaultProps = {
  size: 18,
};

export default IconiconRenminbi;
