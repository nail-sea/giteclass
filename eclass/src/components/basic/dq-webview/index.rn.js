import Taro, { PureComponent } from "@tarojs/taro";
import { WebView , View, Text} from 'react-native';
import {TitleBar} from '@/components'
class RNWebview extends PureComponent {

  static defaultProps = {
    onMessage:() => {},
    src:'',
    style:null,
    onLoad:() => {},
    onError:() => {},
  }
  constructor(props) {
    super(props);
    this.state = {  
      title:'',
    }
    this.canBack = false
  }

  _onMesssage = (evt) => {
    const {onMessage} = this.props
    onMessage && onMessage({
      detail:{
        data:[evt.nativeEvent.data]
      }
    })
  }

  _onBack = () => {
    if (this.canBack) {
      this.webview.goBack()
    } else {
      Taro.navigateBack({ delta: 1 });
    }
  }

  _onLoad = (evt) => {
    const {src, onLoad} = this.props
    onLoad && onLoad({detail:{src}})
  }

  _onError = (err) =>{
    console.log(err)
    const {src, onError} = this.props
    onError && onError({detail:{src}})
  }

  _onNavigationStateChange = ({canGoBack, title}) => {
    this.canBack = canGoBack
    this.setState({title})
  }

  render() {
    const {style, src} = this.props
    const {title} = this.state
    return (
      <View style={{flex: 1}}>
        <TitleBar title={title} handleBack={this._onBack} customBack/>
        <WebView 
          style={[{flex: 1}, style]}
          source={{uri:src}}
          onMessage={this._onMesssage}
          onLoad={this._onLoad}
          onError={this._onError}
          onNavigationStateChange={this._onNavigationStateChange}
          javaScriptEnabled
          thirdPartyCookiesEnabled
          useWebKit
          ref={ref => this.webview = ref}
        />

      </View>
    );
  }
}

export default RNWebview;