/* eslint-disable */

import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconiconShuaxin = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M486.4 921.6c-52.096 0-102.3744-10.2144-149.4272-30.2336a381.1072 381.1072 0 0 1-122.0096-82.2784 383.8976 383.8976 0 0 1-82.2272-122.0608A380.5696 380.5696 0 0 1 102.4 537.4464c0-52.1216 10.2144-102.4 30.2336-149.504a381.2864 381.2864 0 0 1 82.2528-122.0352 383.744 383.744 0 0 1 121.984-82.2784A380.16 380.16 0 0 1 486.4 153.2928c65.9968 0 131.2512 17.024 188.5952 49.3056 23.552 13.312 45.7984 29.184 65.92 47.0784l8.064 7.168V162.048c0-18.7904 15.2576-34.048 34.048-34.048 18.7392 0 33.9968 15.2576 33.9968 34.048v188.5696c0 11.3664-5.5296 21.888-14.848 28.2112h-3.5328v2.048c-4.864 2.6112-10.2912 3.968-15.8464 3.968-0.9472 0-1.92 0-2.8928-0.1024h-185.6a34.048 34.048 0 0 1 0-68.0704h118.528l-8.7552-8.3712A315.8016 315.8016 0 0 0 486.4 221.3632a313.6 313.6 0 0 0-223.4112 92.5952 313.856 313.856 0 0 0-92.544 223.488 313.856 313.856 0 0 0 92.544 223.488A314.1888 314.1888 0 0 0 486.4 853.5296a313.6 313.6 0 0 0 223.4112-92.5952 314.4448 314.4448 0 0 0 92.544-223.488c0-18.7648 15.2576-34.048 34.0224-34.048S870.4 518.6816 870.4 537.4464c0 52.1216-10.2144 102.4-30.2336 149.4784a381.2864 381.2864 0 0 1-82.2528 122.0608 383.744 383.744 0 0 1-121.984 82.2784A380.16 380.16 0 0 1 486.4 921.6z"
        fill={getIconColor(color, 0, '#A0A0A0')}
      />
    </Svg>
  );
};

IconiconShuaxin.defaultProps = {
  size: 18,
};

export default IconiconShuaxin;
