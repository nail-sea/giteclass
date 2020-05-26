/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconiconTheyuan1 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1642 1024" width={size} height={size} {...rest}>
      <Path
        d="M346.041379 444.910345v247.172414h247.172414v77.682758h-247.172414v247.172414H268.358621v-247.172414h-247.172414v-77.682758h247.172414v-247.172414h77.682758zM787.42069 218.924138L988.689655 589.682759l201.268966-370.758621h112.993103l-229.517241 406.068965h169.489655v56.496552h-201.268966v109.462069h201.268966V847.448276h-201.268966v176.551724h-98.868965v-176.551724h-197.737931v-56.496552h197.737931v-109.462069h-197.737931v-56.496552h165.958621L681.489655 218.924138h105.931035z"
        fill={getIconColor(color, 0, '#424242')}
      />
    </Svg>
  );
};

IconiconTheyuan1.defaultProps = {
  size: 18,
};

export default IconiconTheyuan1;
