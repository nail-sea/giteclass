/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconiconJia = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
        fill={getIconColor(color, 0, '#F87C6A')}
      />
      <Path
        d="M777.481481 549.925926H246.518519c-15.17037 0-28.444444-13.274074-28.444445-28.444445S231.348148 493.037037 246.518519 493.037037h530.962962c15.17037 0 28.444444 13.274074 28.444445 28.444444S792.651852 549.925926 777.481481 549.925926z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <Path
        d="M512 815.407407c-15.17037 0-28.444444-13.274074-28.444444-28.444444v-530.962963c0-15.17037 13.274074-28.444444 28.444444-28.444444s28.444444 13.274074 28.444444 28.444444v530.962963c0 15.17037-13.274074 28.444444-28.444444 28.444444z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
    </Svg>
  );
};

IconiconJia.defaultProps = {
  size: 18,
};

export default IconiconJia;
