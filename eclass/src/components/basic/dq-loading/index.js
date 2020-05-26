import Taro ,{PureComponent}from "@tarojs/taro";
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';
import './index.scss'

export default class DqLoading extends PureComponent {
  constructor() {
    super(...arguments);
    if (process.env.NODE_ENV === 'test') {
      Taro.initPxTransform({ designWidth: 750 });
    }
  }

  render() {
    const { color, size } = this.props;
    const sizeStyle = {
      width: size ? `${Taro.pxTransform(parseInt(size))}` : '',
      height: size ? `${Taro.pxTransform(parseInt(size))}` : ''
    };
    const colorStyle = {
      'border': color ? `1px solid ${color}` : '',
      'border-color': color ? `${color} transparent transparent transparent` : ''
    };
    const ringStyle = Object.assign({}, colorStyle, sizeStyle);

    return <View className="at-loading" style={sizeStyle}>
        <View className="at-loading__ring" style={ringStyle}></View>
        <View className="at-loading__ring" style={ringStyle}></View>
        <View className="at-loading__ring" style={ringStyle}></View>
      </View>;
  }
}

DqLoading.defaultProps = {
  size: 0,
  color: ''
};

DqLoading.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};