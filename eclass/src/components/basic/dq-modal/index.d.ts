import {Component} from '@tarojs/taro'
interface AnimationOptions{
  /**
   * animation为slide才有，动画开始位置相对于结束位置的位移，默认300
   */
  offset?: number
  /**
   * animation为slide才有，slide滑动的方向，column - 纵向（默认），row - 横向
   */
  direction?: 'column' | 'row',
   /**
   * （可选）动画持续时间，默认200，单位毫秒
   */
  duration?: number
  /**
   * 动画时间效果，默认'linear'
   */
  easing?:'ease'| 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' 
  /**
   * (可选)动画延迟,默认是0，单位毫秒
   */
  delay?: number
}
interface DqModalProps{
  /**
   * (必传)控制组件显示或隐藏
   */
  show: boolean
  /**
   * （可选）动画类型，默认slide，从下往上滑动
   */
  animation?:'slide' | 'fade' | 'scale' | 'none'
  /**
   * (可选)仅在animation为slide时有用，
   */
  animationOptions?:AnimationOptions
 
  /**
   * （可选）包裹层的样式，主要用来规定内部内容的flex对齐方式
   */
  containerStyle?:object
  /**
   * （可选）遮罩层的背景颜色，默认rgba(0,0,0,0.4),支持HEX、HSL、RGB、RGBA格式
   */
  maskBgColor?:string
  /**
   * (可选)安卓设备下后退键的监听函数，会阻塞默认BackHandler
   * @TODO 除RN端外未实现
   * 
   */
  onClose?:Function
  /**
   * (可选)点击遮罩层的监听函数，一般在这里处理点击遮罩层隐藏Modal
   */
  onMaskClick?:Function
  /**
   * （可选）Modal出现时触发
   */
  onShow?:Function
  /**
   * （可选）Modal隐藏时触发
   */
  onDismiss?:Function
}
export default class DqModal extends Component <DqModalProps> {

}