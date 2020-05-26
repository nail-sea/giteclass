import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { DqInput, DqButton ,TitleBar} from "@/components";
import { connect } from "@tarojs/redux";
import decorator from "@/config/decorator";
import "./index.scss";

@connect(({ user }) => ({
  ...user
}))
@decorator({needLogin: true})
class NickName extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      name: ""
    };
  }

  async componentDidMount() {
    await this.MyInfo();
    const { userInfo } = this.props;
    this.setState({ name: userInfo.uname });
  }

  async MyInfo() {
    await this.props.dispatch({
      type: "user/fetchMyInfo"
    });
  }

  handleState = (key, value) => {
    this.setState({ [key]: value });
  };

  async onSave() {
    const { name } = this.state
    
    //更改名称
    let resule = await this.props.dispatch({
      type: "user/fetchModifyuname",
      payload: {
        uname: name
      }
    });
    if (resule) {
      setTimeout(() => {
        Taro.navigateBack({
          delta: 1 // 返回上一级页面。
        });
      }, 1000);
    }
  }

  
  

  render() {
    const base_class = "nick-name";
    const { name } = this.state;
    return (
      <View className={`${base_class}`}>
        <TitleBar title="修改昵称" />
        <View className={`${base_class}__input`}>
          <DqInput
            placeholder="请输入昵称"
            type="text"
            value={name}
            maxLength={8}
            onInput={this.handleState.bind(this, "name")}
            styleType="-style3"
          />
        </View>
        <Text className={`${base_class}__tips`}>好名字更容易让人记住噢～</Text>
        <View className={`${base_class}__btn`}>
          <DqButton
            label="保存"
            disabled={name.length <= 0}
            onClick={this.onSave.bind(this)}
          />
        </View>
      </View>
    );
  }
}
export default NickName;