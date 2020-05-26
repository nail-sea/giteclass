import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { DqButton , TitleBar} from "@/components";
import { connect } from "@tarojs/redux";
import decorator from "@/config/decorator";
import "./index.scss";
import Dq from "@/config/Dq";
import { STATIC_ASSETS } from "@/config";
import ENUM from "@/config/enum";

@connect(({ classModels, user }) => ({
  ...classModels,
  ...user
}))
@decorator({ needLogin: true })
class Index extends Component {
  state = {
    userInfo:{},
    total_money: '',
    pay_method: ''
  };

  async componentDidMount () {
    await this.props.dispatch({
      type: "user/fetchMyInfo",
      payload: {
        isRefresh: true
      }
    }).then(data => {
      this.setState({ userInfo: data });
    });

    const { total_money, pay_method } = this.$router.params
    this.setState({total_money, pay_method})
  }

  gotoClassMainPage() {
    Dq.navigateTo({
      url: "/pages/release/release"
    });
  }

  gotoMePage() {
    Dq.navigateTo({
      url: "/pages/user/user"
    });
  }

  render() {
    console.log(this.props.user)
   const { e_coin, integral } = this.state.userInfo
   const { total_money, pay_method } = this.state
    return (
      <View className="success-wrap">
        <TitleBar title="支付成功" customBack
          handleBack={() => this.gotoClassMainPage()}/>
        <View className="success-wrap__view">
          <Image
            className="success-wrap__view__img"
            src={STATIC_ASSETS("images/icon/success.png")}
          ></Image>
          <View className="success-wrap__view__view">
            <Text className="success-wrap__view__view__title">
              <Text>发布成功！</Text>
            </Text>
            <Text className="success-wrap__view__view__consume">
              本次消耗
              <Text className="success-wrap__view__view__consume__text"> {pay_method == 'integral' ? total_money * 10 : total_money}{ENUM.PAY_METHOD[pay_method]}</Text>
              ，审核需要1分钟左右，请耐心等待
            </Text>
            {/* <Text
              className="success-wrap__view__view__info"
              onClick={this.gotoMePage.bind(this)}
            >
              查看我的信息
            </Text> */}
            <View className="success-wrap__view__view__desc">
              <Text className="success-wrap__view__view__desc" style={{marginRight:20}}>剩余积分：{integral} </Text>
              <Text className="success-wrap__view__view__desc">剩余E币：{e_coin}</Text>
            </View>
          </View>
          <View className="success-wrap__view__btn">
            <View className="success-wrap__view__btn-item">
              <DqButton
                styleType="-border"
                label="查看信息"
                onClick={this.gotoMePage.bind(this)}
              />
            </View>
            <View className="success-wrap__view__btn-item">
              <DqButton
                label="继续发布"
                onClick={this.gotoClassMainPage.bind(this)}
              />
            </View>
            
          </View>
          
        </View>
      </View>
    );
  }
}
export default Index;