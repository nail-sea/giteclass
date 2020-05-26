import Taro, { Component } from "@tarojs/taro";
import { View, Image, Canvas } from "@tarojs/components";
import { TitleBar,  FormPicker, FormDatePicker } from "@/components";
import UserItem from "../components/set-item";
import { connect } from "@tarojs/redux";
import { POST_SEX } from "@/config/enum";
import decorator from "@/config/decorator";
import IconFont from "@/components/iconfont";
import times from '@/utils/times'
import Dq from "@/config/Dq";
import "./index.scss";
import display from "@/utils/display";



@connect(({ user }) => ({
  ...user
}))
@decorator({ needLogin: true })
class AccountManagement extends Component {
  config = {
    navigationBarTitleText: "个人信息"
  };

  constructor() {
    super(...arguments);
    this.state = {
      canvasWidth: 560,
      canvasHeight: 978,
    };
  }
  static defaultProps = {
    userInfo: {}
  };

  MyInfo() {
    this.props.dispatch({
      type: "user/fetchMyInfo"
    });
  }

  async componentDidMount() {
    await this.MyInfo();
  }

  handleBack = () => {
    //返回user
    Dq.redirectTo({
      url: "/pages/user/account-management/index"
    });
  };

  handleChangeHeader = () => {
    // let msg = display.deepCopy({a:1,b:2});
    // console.log(msg)
    //更换头像
    var that = this;
    // Taro.chooseImage({
    display.chooseImage({
      count: 1,
      maxWidth: 200,
      height: 200,
      cropping:true,
      success: res => {
        if (res.tempFiles[0].size <= 2 * 1024 * 1024) {
          // console.log('====================================');
          // console.log('choose image, images = ', res.tempFilePaths);
          // console.log('====================================');
          display.uploadImage({ files: res.tempFilePaths })
            .then(([resData]) => {
              if (resData && typeof resData === 'string') {
                resData = JSON.parse(resData)
              }
              // console.log('====================================');
              // console.log('get res data = ', resData);
              // console.log('====================================');
              this.props.dispatch({
                type: "user/fetchModifyavatar",
                payload: {
                  avatar: resData.data.file_name
                }
              })
            })
        } else {
          Taro.showToast({
            title: "请上传小于2M的图片",
            icon: "none",
            duration: 2000
          });
        }
      }
    })
      .catch(error => {
        if (error == 1) {
          Taro.showToast({
            title: "选择图片失败，请重新选择。",
            icon: "none",
            duration: 2000
          });
        }
      });
  };

  changeSex = value => {

    const { userInfo } = this.props;
    if (value == (!userInfo.sex || userInfo.sex == 0 ? 2 : userInfo.sex - 1)) {
      return 
    }
    //更改性别
    this.props.dispatch({
      type: "user/fetchModifysex",
      payload: {
        sex: POST_SEX[value].key
      }
    });
  };

  changeBirth = value => {
    const { userInfo } = this.props;
    if(value == userInfo.birth){
      return 
    }
    //更改生日
    this.props.dispatch({
      type: "user/fetchModifybirth",
      payload: {
        birth: value
      }
    });
  };

  handleToNickName = () => {
    //更改昵称
    Dq.navigateTo({
      url: "/pages/user/personal-info/nick-name/index"
    });
  };

  render() {
    const { userInfo } = this.props;
    const { canvasWidth, canvasHeight } = this.state;

    return (
      <View className="acc-mana">
        <TitleBar
          title="个人信息"
          customBack={true}
          handleBack={this.handleBack.bind(this)}
        />
        <View className="bg-con">
          <UserItem
            titlt="头像"
            isBorder={true}
            onhandleClick={this.handleChangeHeader.bind(this)}
          >
            {userInfo && userInfo.avatar_url && userInfo.avatar_url != "" ?
              <Image
                mode="aspectFill"
                className="user-item__img"
                src={userInfo.avatar_url}
              />
              : <IconFont name="icon_moren" size={50} />}
          </UserItem>
          <UserItem
            titlt="昵称"
            content={userInfo.uname}
            isMargin={true}
            onhandleClick={this.handleToNickName.bind(this)}
          />
        </View>
        <View className="bg-con">
          <UserItem
            titlt="E网ID"
            content={userInfo.uuid}
            isIcon={false}
            isBorder={true}
          />
          <UserItem titlt="性别" isBorder={true}>
            <FormPicker
              value={!userInfo.sex || userInfo.sex == 0 ? 2 : userInfo.sex - 1}
              range={POST_SEX.map(({ name, value }, index) => ({ label: name, value: index }))}
              onChange={this.changeSex}
            />
          </UserItem>
          <UserItem titlt="出生于">
            <FormDatePicker
              mode="date"
              start="1900-01-01"
              end={times.getFormatData("yyyy-MM-dd")}
              value={userInfo.birth}
              onChange={this.changeBirth}
              defaultLabel="选择生日"

            />
          </UserItem>
        </View>
      </View>
    );
  }
}
export default AccountManagement;