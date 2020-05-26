import Taro, { PureComponent } from "@tarojs/taro";
import { HOST_AGENT } from "@/config/index";
import { WebView } from "@tarojs/components";

class DqWebView extends PureComponent {
  static defaultProps = {
    src: HOST_AGENT,
    onMessage: () => {}
  };

  handleMessage() {}

  render() {
    const { src } = this.props;
    return <WebView src={src} onMessage={this.handleMessage} />;
  }
}

export default DqWebView;
