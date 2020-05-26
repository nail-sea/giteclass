import Taro, { Component } from "@tarojs/taro";
import { View, Text , Image} from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { TitleBar, BasicButton } from "@/components";
import decorator from "@/config/decorator";
import Platform from "@/platfrom";
import Tips from "@/utils/tips";
import { STATIC_ASSETS } from "@/config";
import Dq from "@/config/Dq";
import utils from "@/utils/utils";
import ENUM from '@/config/enum'
import "./index.scss";

const className = "recharge-view";

@connect(({ user,Auth }) => ({
  ...user,
  ...Auth
}))
@decorator({ needLogin: true })
class Recharge extends Component {
  state = {
    currentItem: {}
  };

  async componentDidMount() {
    const {recharge_table} = await this.props.dispatch({
      type: "Auth/fetchRechargePage"
    });
    if(recharge_table && recharge_table[1]){
      this.setState({currentItem:recharge_table[1]})
      
    }
    
  }

  handleCurrentActive(data) {
    this.setState({
      currentItem: data,
    });
  }

  submitRecharge = async () => {
  
    const { currentItem:{ recharge_id, rmb} } = this.state;
    const {...params } = this.$router.params
    const { dispatch } = this.props
  
      dispatch({
        type: "user/fetchMyInfo"
      }).then(res=>{
       
        const { wx_openid, mini_openid } = res
        const openid = process.env.TARO_ENV == 'h5'? wx_openid : mini_openid
        Platform.sendPay(
          "Auth/submitSendPay" , 
          { amount: rmb , recharge_id} , 
          function (urlParams) {
            const {  from, ...params } = urlParams
            dispatch({
              type: "Auth/fetchRechargePage" //刷新E币
            }).then(res=>{
              Tips.toast("支付成功");
              const paramsStr = utils.getUrlParams(params)
              const url = `${ENUM.FROMURL[from]}${paramsStr}`
				    	Dq.redirectTo({url})
            })
          },
          'recharge',
          openid,
          params
        );
       
      })
    return 
  };

  renderBottom() {
    return (
      <View className={`${className}__bottom`}>
        <Text className={`${className}__bottom__text`}>温馨提示</Text>
        <Text className={`${className}__bottom__text`}>
          1、E币可用于平台内发布信息、砍价活动等，不可用于商品购买、店铺入驻、提现。
        </Text>
        <Text className={`${className}__bottom__text`}>
          2、一旦充值不可退款，本页面显示的赠送E币，为相应充值方最高赠送数量。
        </Text>
        <Text className={`${className}__bottom__text`}>
          3、点击充值，代表您已同意《用户协议》。
        </Text>
        <Text className={`${className}__bottom__text`}>
          4、此页为您的专属充值页面，请不要将本页面分享给好友，好友无法通过此页面充值。
        </Text>
        <Text className={`${className}__bottom__text`}>
          5、本次充值仅限于在E网上消费，无法跨地区跨站点使用。
        </Text>
        <Text className={`${className}__bottom__text`}>
          6、若遇到充值未到账，请联系站点管理员。
        </Text>
      </View>
    );
  }

  render() {
    const {
      rechargePage: { user_info, recharge_table, is_first }
    } = this.props;
    const { currentItem } = this.state;
    const e_coin = user_info ? user_info.e_coin : 0;
    const rechargeTable = recharge_table ? recharge_table : [];

    return (
      <View className={`${className}`}>
        <TitleBar title="E币充值" />
        <View className={`${className}__top`}>
          <Text className={`${className}__top__title`}>账户可用E币</Text>
          <Text className={`${className}__top__number`}>{e_coin}</Text>
          <Text className={`${className}__top__tips`}>
            （1元=1E币，E币可用来发布信息和置顶等）
          </Text>
        </View>

        <View className={`${className}__middle`}>
          <View className={`${className}__middle__title`}>
            <View className={`${className}__middle__title__line`}></View>
            <Text className={`${className}__middle__text`}>请选择充值金额</Text>
            <View className={`${className}__middle__title__line`}></View>
          </View>
          <View className={`${className}__middle__view`}>
            {rechargeTable.map((item, index) => {
              const current =
                currentItem.recharge_id === item.recharge_id ? "item-active" : "item";
              return (
                <View
                  className={`${className}__middle__${current}`}
                  onClick={() => {
                    this.handleCurrentActive(item);
                  }}
                  key={item.recharge_id}
                >
                  {is_first === 1 ? (
                    <View
                      className={`${className}__middle__item-bg`}
                      // style={{
                      //   backgroundImage: `url(${STATIC_ASSETS(
                      //     "images/bg/recharge_bg.png"
                      //   )})`
                      // }}
                    >
                      <Image 
                        src={STATIC_ASSETS(
                          "images/bg/recharge_bg.png"
                        )}
                        className={`${className}__middle__item-bg__img`}
                      />
                      <Text className={`${className}__middle__item-bg__text`}>
                        首充
                      </Text>
                    </View>
                  ) : null}

                  <Text className={`${className}__middle__${current}__text`}>
                    {item.rmb}元
                  </Text>
                  <View className={`${className}__middle__${current}__view`}>
                    <Text
                      className={`${className}__middle__${current}__view__text`}
                    >
                      赠{item.integral}积分
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
            <BasicButton 
              disabled={!currentItem.recharge_id}
              label="立即充值" 
              size="large" 
              onClick={this.submitRecharge} />
        </View>
        {this.renderBottom()}
      </View>
    );
  }
}
export default Recharge;
