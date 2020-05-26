import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { DqWebView } from "@/components";
class WebViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onMessage = messsage => {};

  onLoad = res => {};

  onError = res => {};

  getSrc = () => this.$router.params.src;

  render() {
    return (
      <DqWebView
        onMessage={this.onMessage}
        src={this.getSrc()}
      />
    );
  }
}

export default WebViewPage;
