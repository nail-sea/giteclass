import Taro, { Component, PureComponent } from "@tarojs/taro";
import {DqListView} from '@/components'
class RefreshListView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <DqListView {...this.props}/>
    );
  }
}

export default RefreshListView;