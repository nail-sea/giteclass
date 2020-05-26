import Taro, { PureComponent } from "@tarojs/taro";
import { View } from "@tarojs/components";
import BasicPicker from './components/BasicPicker'
import TagPicker from './components/TagPicker'
import MenuPicker from './components/MenuPicker'
import './index.scss'
export default class DqPicker extends PureComponent {
  static options = {
    addGlobalClass: true
  };


  dqPicker()  {
    // const map = {
    //   tag: TagPicker,
    //   manu: MenuPicker,
    //   basic: BasicPicker
    // };
    // if(map[type]){
      // const picker = map[type]
      // return <picker {...this.props} />;
    // }
    // else{
    //   return <view></view>
    // }
    
  };

  render() {
    const { type } = this.props;
    return <View className="dq-picker">
      {type == 'tag' &&  <TagPicker {...this.props}/>}
      {type == 'manu' &&  <MenuPicker {...this.props}/>}
      {type == 'basic' &&  <BasicPicker {...this.props}/>}
      </View>
  }
}
