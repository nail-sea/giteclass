import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import ENUM from '@/config/enum'
import Dq from '@/config/Dq'

@connect(({ publish, user }) => ({
  ...publish,
  ...user
}))

class Index extends Component {

  state = {
    classification_arr: [],
    post_id: "",
    clauseCheck: true,
  };

  releasePayCommon = async (params, type) => {
    return new Promise(async (resolve, reject) => {
      let post_id = await this.props.dispatch({
        type: "publish/publish",
        payload: { ...params }
      });
      let trade_type // 交易模式：1、付款码 2、Native 3、JSAPI 4、APP 5、H5 6、小程序
      if (process.env.TARO_ENV === 'weapp') {
        trade_type = '6'
      } else if (process.env.TARO_ENV === 'h5') {
        trade_type = '5'
      }
      const payInfo = await this.props.dispatch({
        type: 'publish/orderPayment',
        payload: {
          post_id
        }
      })
      const {top_status, integral, e_coin, total_money} = payInfo
      let content, pay_method, confirmText
      content = '发布的信息将无法修改，请确认填写正确'
      if (top_status == ENUM.TOPSTATUS) { 
        if (parseInt(e_coin) >= total_money) {
            pay_method = 'e_coin'
           // content = `本次发布需消耗${total_money}E币`
            confirmText = '确认发布'
        } else {
          Taro.showModal({
            content,
            confirmColor : '#F87C6A',
            confirmText:'确认发布',
          }).then(res=>{
            if(res.confirm){
              Dq.navigateTo({
                url: `/pages/release/pay-for/post-pay-for?post_id=${post_id}`
              })
            }
          })
        }
      } else {
        if (parseInt(integral) >= (total_money*10)) {
            pay_method = 'integral'
           // content =  `本次发布需消耗${parseInt(total_money*10)}积分`
            confirmText = '确认发布'
        } else {
          if (parseInt(e_coin) >= total_money) {
              pay_method = 'e_coin'
             // content =  `本次发布需消耗${total_money}E币`
              confirmText = '确认发布'
          } else {
            Taro.showModal({
              content,
              confirmColor : '#F87C6A',
              confirmText:'确认发布',
            }).then(res=>{
              if(res.confirm){
                Dq.navigateTo({
                  url: `/pages/release/pay-for/post-pay-for?post_id=${post_id}`
                })
              }
            })
           
          }
        }
      }
      Taro.showModal({
        content,
        confirmColor : '#F87C6A',
        confirmText,
      }).then(res=>{
        if (res.confirm) {
          this.props.dispatch({
            type: 'publish/postOrderPay',
            payload: {
              post_id,
              pay_method,
              amount: total_money,
              trade_type
            }
          }).then((res) => {
            if (res) {
              Dq.navigateTo({
                url: `/pages/release/success/index?total_money=${total_money}&pay_method=${pay_method}`
              })
            }
          })
        }
      });
    })
  }
  render() {
    return (
      <View className="release-continer-common"></View>
    );
  }
}
export default Index;
