/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconiconDui = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M380.1344 742.4a33.536 33.536 0 0 1-24.1664-10.3168l-166.9376-169.2416A35.328 35.328 0 0 1 179.2 538.1888c0-9.3952 3.584-18.2528 10.0352-24.8832a33.536 33.536 0 0 1 48.3328 0l142.848 143.872 354.816-365.2608a33.536 33.536 0 0 1 48.3328 0c6.4768 6.6304 10.0352 15.488 10.0352 24.8832 0 9.3696-3.584 18.2272-10.0352 24.8576L404.3008 732.0832a33.536 33.536 0 0 1-24.1664 10.3168z"
        fill={getIconColor(color, 0, '#F87C6A')}
      />
    </Svg>
  );
};

IconiconDui.defaultProps = {
  size: 18,
};

export default IconiconDui;
