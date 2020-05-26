import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, ScrollView } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { TitleBar, CountDown, ActionSheet, BasicButton } from "@/components";
import IconFont from "@/components/iconfont";
import { STATIC_ASSETS } from "@/config";
import ENUM from "@/config/enum";
import decorator from "@/config/decorator";
import { stopPropagation } from "@/utils/common";
import { getWindowHeight, formatStyle } from "@/utils/style";
import Dq from "@/config/Dq";
import Platform from "@/platfrom";
import utils from "@/utils/utils";
import classNames from 'classnames'
import "./index.scss";

@connect(({ publish, shopStore, user }) => ({
  ...publish,
  ...shopStore,
  ...user
}))
@decorator({ needLogin: true })
class PayForIndex extends Component {
  config = {
    disableScroll: true
  };
  state = {
    payMethod: [
      {
        key: "wx",
        name: "微信支付",
        iconPath: STATIC_ASSETS("images/icon/pay_3.png"),
        checked: true,
        flag: false
      },
      {
        key: "e_coin",
        name: "E币支付",
        iconPath: STATIC_ASSETS("images/icon/pay_1.png"),
        checked: false,
        flag: false
      },
      {
        key: "integral",
        name: "积分支付",
        iconPath: STATIC_ASSETS("images/icon/pay_2.png"),
        checked: false,
        flag: false
      } // flag=>false 可以支付  true=>不可以
    ],
    selectedPayMethod: true,
    result: {},
    post_type: "",
    selectedKey: "wx",
    payPage: "", //具体从哪调起支付页面
    showActionSheet: false,
    toggle: true
  };

  async componentDidMount() {
    await this.fetchPayByPost();
    const { wx_openid, unionid } = this.props.userInfo;
    if (wx_openid && unionid) this.handleSubmit();
  }

  //请求帖子支付信息
  async fetchPayByPost() {
    const { dispatch, top } = this.props;
    const { post_id, post_type, top_status } = this.$router.params;
    if (post_type && post_type == "releaseManagementTop" && !top.top_day) {
      Dq.redirectTo({
        url: `/pages/release/top/index?post_id=${post_id}&post_type=${post_type}`
      });
    }

    let result = await dispatch({
      type: "publish/orderPayment",
      payload: {
        post_id
      }
    });

    this.setState({
      result,
      post_type
    });

    let statusFlag =
      (result && result.top_status == ENUM.TOPSTATUS) ||
      top_status == ENUM.TOPSTATUS;

    let list = [...this.state.payMethod];
    list[2].flag = statusFlag || false; //判断积分支付是否可用

    await this.setState({
      payMethod: list
    });
  }

  gotoRecharge() {
    const params = this.$router.params
    const paramsStr = utils.getUrlParams(params)
   
    Dq.navigateTo({
      url:`/pages/release/recharge/index${paramsStr}&from=payforPost`
    });
  }

  handleCheckbox(index, e) {
    stopPropagation(e);
    const { payMethod } = this.state;
    let item = payMethod[index];

    let result = payMethod.map((data, i) => {
      if (index === i) {
        data.checked = true;
      } else {
        data.checked = false;
      }
      return data;
    });

    this.setState({
      payMethod: result,
      selectedPayMethod: result.some(item => item.checked === true),
      selectedKey: item.key
    });
  }

   showModal = () =>{
    Taro.showModal({
      title: "",
      content: "当前支付方式余额不足，请前往充值"
    }).then(res => {
      if (res.confirm) {
        this.gotoRecharge();
      }
    })
     
  }

  async handleSubmit() {
    const {
      dispatch,
      top,
      userInfo: { wx_openid, e_coin, integral }
    } = this.props;
    const {
      result: { total_money, amount },
      selectedKey,
      payPage
    } = this.state;
    const { post_id, trade_no } = this.$router.params;
    let trade_type; // 交易模式：1、付款码 2、Native 3、JSAPI 4、APP 5、H5 6、小程序
     const totalMoney =  this.state.post_type == "releaseManagementTop" && top
     ? top.top_total_money
     : this.state.result
     ? total_money
     : 0
     console.log(totalMoney,selectedKey != "wx" && (parseInt(e_coin) < totalMoney),'totalMoneytotalMoneytotalMoneytotalMoney')
    if (selectedKey == "e_coin" && (parseInt(e_coin) < totalMoney) ) {
        this.showModal()
        return
    }
    if(selectedKey == "integral" && (parseInt(integral)*10 < totalMoney)){
      this.showModal()
      return
    }

    

    if (process.env.TARO_ENV === "weapp") {
      trade_type = "6";
    } else if (process.env.TARO_ENV === "h5") {
      trade_type = "5";
    }
    if (payPage == "shopStore") {
      await dispatch({
        type: "publish/couponPay",
        payload: {
          trade_no,
          pay_method: selectedKey,
          amount: amount,
          trade_type
        }
      }).then(res => {
        if (res) {
          Taro.showToast({
            title: "支付成功",
            icon: "success",
            duration: 2000
          });
          setTimeout(() => {
            Dq.redirectTo({
              url: `/pages/user/card-center/index`
            });
          }, 1000);
        }
      });
    } else if (
      this.state.post_type &&
      this.state.post_type == "releaseManagementTop"
    ) {
      if (selectedKey === "wx") {
        const { post_id, post_type, top_status } = this.$router.params;
        Platform.sendPay(
          "publish/payTop",
          {
            post_id,
            pay_method: selectedKey,
            amount: totalMoney,
            trade_type,
            top_day: top.top_day,
            top_total_money: top.top_total_money
          },
          function() {
            Taro.showToast({
              title: "置顶成功",
              icon: "success",
              duration: 2000
            });
            setTimeout(() => {
              Dq.navigateTo({
                url: "/pages/user/release-management/index"
              });
            }, 2000);
          },
          `payfor`,
          wx_openid, // 判断是否需要登录的凭证
          { post_id, post_type, top_status }
        );
      } else {
        dispatch({
          type: "publish/payTop",
          payload: {
            post_id,
            pay_method: selectedKey,
            amount: totalMoney,
            trade_type,
            top_day: top.top_day,
            top_total_money: top.top_total_money
          }
        }).then(res => {
          if (res) {
            Taro.showToast({
              title: "置顶成功",
              icon: "success",
              duration: 2000
            });
            setTimeout(() => {
              Taro.navigateBack({
                delta: 1 // 返回上一级页面。
              });
            }, 2000);
          }
        });
      }
    } else {
      if (selectedKey === "wx") {
        this.weChatPay(post_id, total_money);
      } else {
        dispatch({
          type: "publish/postOrderPay",
          payload: {
            post_id,
            pay_method: selectedKey,
            amount: totalMoney,
            trade_type
          }
        }).then(res => {
          if (res) {
            Dq.navigateTo({
              url: `/pages/release/success/index?total_money=${total_money}&pay_method=${selectedKey}`
            });
          }
        });
      }
    }
  }

  weChatPay = (post_id, total_money) => {
    const {
      userInfo: { wx_openid }
    } = this.props;
    Platform.sendPay(
      "publish/postOrderPay",
      { post_id, amount: total_money },
      function() {
        Dq.navigateTo({
          url: `/pages/release/success/index?total_money=${total_money}&pay_method=wx`
        });
      },
      `payforPost`,
      wx_openid, // 判断是否需要登录的凭证
      { post_id }
    );
  };

  renderPayContent() {
    const { result, post_type } = this.state;
    const { top } = this.props;
    return (
      <View>
        <View className="pay-wrap__view__top">
          <View className="pay-wrap__view__top__view">
            <Text className="pay-wrap__view__top__view__text">
              <Text
                className="pay-wrap__view__top__view__price-1"
              >
                <Text className="pay-wrap__view__top__view__price-1_text">
                  待支付:
                </Text>
                <Text className="pay-wrap__view__top__view__price-1_money"
                >
                  ¥
                </Text>
                <Text className="pay-wrap__view__top__view__price-1_txt">
                  {post_type == "releaseManagementTop" && top
                    ? top.top_total_money
                    : result
                    ? result.total_money
                    : 0}
                </Text>
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderPayMethod() {
    const {
      result,
      payMethod,
      payPage,
      toggle
    } = this.state;
    return (
      <View className="pay-wrap__view__bottom">
        <View className="pay-wrap__view__bottom__view">
          <View
            className="pay-wrap__view__bottom__view__view-1"
          >
            <View>
              <Text className="pay-wrap__view__bottom__view__view__left">
                可用E币:{result && result.e_coin}
              </Text>
              <Text className="pay-wrap__view__bottom__view__view__right">
                可用积分:{result && result.integral}
              </Text>
            </View>

            <Text
              className="pay-wrap__view__bottom__view__title__right"
              onClick={() => this.gotoRecharge()}
            >
              充值
            </Text>
          </View>
          <View className="pay-wrap__view__bottom__view__pay">
            {payMethod &&
              payMethod.map((item, index) => {
                if (index > 0) return;
                return (
                  <View
                    className="pay-wrap__view__bottom__view__pay__view"
                    key={item.key}
                    onClick={
                      !item.flag ? this.handleCheckbox.bind(this, index) : null
                    }
                  >
                    <View className="pay-wrap__view__bottom__view__pay__view__view-box">
                      <Image
                        className="pay-wrap__view__bottom__view__pay__view__view-box__img"
                        src={item.iconPath}
                      />
                      <Text className="pay-wrap__view__bottom__view__pay__view__text">
                        {item.name}
                        {/* {index == 1 && payPage === "" ? (
                          <Text
                            style={formatStyle({
                              color: "rgba(248, 124, 106, 1)",
                              marginLeft: "10px"
                            })}
                          >
                            (积分不可用于信息置顶)
                          </Text>
                        ) : null}
                        {(index === 1 || index === 2) &&
                        payPage === "shopStore" ? (
                          <Text
                            style={formatStyle({
                              color: "rgba(248, 124, 106, 1)",
                              marginLeft: "10px"
                            })}
                          >
                            (当前方式不可用)
                          </Text>
                        ) : null} */}
                      </Text>
                    </View>
                    {!item.flag ? (
                      <View
                        className="pay-wrap__view__bottom__view__pay__view__view"
                        onClick={this.handleCheckbox.bind(this, index)}
                      >
                        <IconFont
                          name="duihao_selected"
                          color={
                            item.checked ? "#F87C6A" : "rgba(160,160,160,1 )"
                          }
                          size={40}
                        />
                      </View>
                    ) : (
                      <View className="pay-wrap__view__bottom__view__pay__view__view">
                        <IconFont
                          name="duihao_selected"
                          color="rgba(160,160,160,.5 )"
                          size={40}
                        />
                      </View>
                    )}
                  </View>
                );
              })}
          </View>

          {!toggle && (
            <View className="pay-wrap__view__bottom__view__pay">
              {payMethod &&
                payMethod.map((item, index) => {
                  if (index === 0 || item.flag) return;
                  return (
                    <View
                      className="pay-wrap__view__bottom__view__pay__view"
                      key={item.key}
                      onClick={
                        !item.flag
                          ? this.handleCheckbox.bind(this, index)
                          : null
                      }
                    >
                      <View className="pay-wrap__view__bottom__view__pay__view__view-box">
                        <Image
                          className="pay-wrap__view__bottom__view__pay__view__view-box__img"
                          src={item.iconPath}
                        />
                        <Text className="pay-wrap__view__bottom__view__pay__view__text">
                          {item.name}
                          {/* {index == 2 && payPage === "" ? (
                            <Text>
                              (积分不可用于信息置顶)
                            </Text>
                          ) : null} */}
                        </Text>
                      </View>
                      {!item.flag ? (
                        <View
                          className="pay-wrap__view__bottom__view__pay__view__view"
                          onClick={this.handleCheckbox.bind(this, index)}
                        >
                          <IconFont
                            name="duihao_selected"
                            color={
                              item.checked ? "#F87C6A" : "rgba(160,160,160,1 )"
                            }
                            size={40}
                          />
                        </View>
                      ) : (
                        <View className="pay-wrap__view__bottom__view__pay__view__view">
                          <IconFont
                            name="duihao_selected"
                            color="rgba(160,160,160,.5 )"
                            size={40}
                          />
                        </View>
                      )}
                    </View>
                  );
                })}
            </View>
          )}

          {toggle && (
            <View
              className="pay-wrap__view-more"
            >
              <Text
                onClick={() => {
                  this.setState({
                    toggle: !toggle
                  });
                }}
                className="pay-wrap__view-more-text"
              >
                展开更多支付方式
              </Text>
              <Text>
                <IconFont name="ic_zhankai" size={40} />
              </Text>
            </View>
          )}
        </View>
        <View
          className="pay-wrap__view__bottom__button1"
        >
          <BasicButton
            size="large"
            label="立即支付"
            onClick={this.handleSubmit.bind(this)}
          >
            立即支付
          </BasicButton>
        </View>
      </View>
    );
  }

  render() {
    const { payPage, showActionSheet } = this.state;
    return (
      <View className="pay-wrap">
        <ScrollView
          className="pay-wrap__view"
          scrollStyle={{ height: getWindowHeight(true, false) }}
        >
          <TitleBar
            title=""
            customBack={true}
            handleBack={() => {
              Dq.navigateTo({
                url: "/pages/release/release"
              });
            }}
          />
          {this.renderPayContent()}
          {this.renderPayMethod()}
        </ScrollView>
      </View>
    );
  }
}
export default PayForIndex;
