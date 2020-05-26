/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconduihaoSelected = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 512C0 229.2224 229.2224 0 512 0s512 229.2224 512 512-229.2224 512-512 512S0 794.7776 0 512z m419.328 194.6368a35.328 35.328 0 0 0 49.3824 1.28l335.5136-311.936a35.328 35.328 0 0 0-48.0768-51.7376l-309.12 289.536-145.1264-149.632a35.328 35.328 0 1 0-50.688 49.152l168.1152 173.312z"
        fill={getIconColor(color, 0, '#F87C6A')}
      />
    </Svg>
  );
};

IconduihaoSelected.defaultProps = {
  size: 18,
};

export default IconduihaoSelected;
