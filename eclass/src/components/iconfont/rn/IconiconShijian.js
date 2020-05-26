/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconiconShijian = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M499.2 153.6C294.5024 153.6 128 320.1024 128 524.8S294.5024 896 499.2 896 870.4 729.4976 870.4 524.8 703.8976 153.6 499.2 153.6z m0 689.2288c-175.36 0-318.0288-142.6944-318.0288-318.0288 0-175.36 142.5408-318.0288 318.0288-318.0288S817.2288 349.312 817.2288 524.8 674.5344 842.8288 499.2 842.8288z"
        fill={getIconColor(color, 0, '#A0A0A0')}
      />
      <Path
        d="M614.272 537.4976H486.4v-178.9696c0-14.1824-11.4176-25.728-25.6-25.728-14.1568 0-25.5744 11.5456-25.5744 25.728V563.2c0 14.1568 11.4176 25.5744 25.6 25.5744h153.472C628.48 588.8 640 577.3824 640 563.2a25.856 25.856 0 0 0-25.728-25.7024z"
        fill={getIconColor(color, 1, '#A0A0A0')}
      />
    </Svg>
  );
};

IconiconShijian.defaultProps = {
  size: 18,
};

export default IconiconShijian;
