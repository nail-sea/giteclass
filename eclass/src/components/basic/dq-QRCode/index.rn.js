import QRCode from "react-native-qrcode";
import {View, Dimensions} from 'react-native'
const {width: screenWidth} = Dimensions.get('screen')
export default function DqQRCode(props){
  const {size, text, scale, desinWidth} = props
  const _size = size * screenWidth / desinWidth
  return (
      <QRCode 
        value={text}
        size={_size}
        style={{width:_size, height:_size}}
      />
  )
}
DqQRCode.defaultProps = {
  size:300,
  text:'',
  scale:4,
  typeNumber:2,
  errorCorrectLevel:'M',
  desinWidth:750
}