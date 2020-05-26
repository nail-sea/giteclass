import Taro, { PureComponent } from '@tarojs/taro'
import { Block, View, Image, Button } from '@tarojs/components'

export default class ImageClip extends PureComponent {
  componentWillMount() {
  }
  //实例
  //{url:img_home_item,reserve:"images/item/ic_zcpc.png",loaded: 0,width:'102px',height:'102px',x:'0px',y:'0px'}
  render() {
    const {className} = this.props
    const { url ,reserve ,loaded,width ,height,x ,y} = this.props.item ? this.props.item : {};
    const strstyle = `background-position:${x} ${y} ;width:${width};height:${height};background-image:url(${url}`
    return (
      <View className = {className||""}>
         { loaded == 1 && <Image src= "" style={strstyle}></Image>}
         {reserve && loaded == 2 && 
           <Image src={reserve} style = {`width:${width};height:${height}`}></Image>
         }
      </View>
    )
  }
}

// background-position-x:0px;
// background-position-y:0px;`