import { View, Text, Image } from "@tarojs/components";
import IconFont from "@/components/iconfont";
import Dq from '@/config/Dq'
import '../../user.scss'
export default function UserHeader(props){
  const {isLogin, gotoAccountManager, onItemClick, userInfo, gotoLogin} = props
  return (
    <View className="user__header">
      {/* <Image
        className="user__header__bg"
        src={STATIC_ASSETS("images/bg/user.png")}
      /> */}
      <View className="user__header__info">
        {isLogin && (
          <View
            className="user__header__info__admin"
            onClick={gotoAccountManager}
          >
            <IconFont name="icon_shezhi" color="#424242" size={34} />
            <Text className="user__header__info__admin__text">账户管理</Text>
          </View>
        )}
        <View className="user__header__info__name">
          <View
            className="user__header__info__name__img"
            onClick={onItemClick}
          >
            {isLogin &&
              userInfo &&
              userInfo.avatar_url &&
              userInfo.avatar_url != "" ? (
                <Image
                  mode="aspectFill"
                  className="user__header__info__name__img__img"
                  src={userInfo.avatar_url}
                />
              ) : (
                <View className="user__header__info__name__img__img">
                  <IconFont name="icon_moren" size="110" />
                </View>
              )}
          </View>
          <View className="user__header__info__name__text">
            {isLogin && (
              <View className="user__header__info__name__text">
                <View>
                  <Text className="user__header__info__name__text1">
                    {userInfo.uname}
                  </Text>
                </View>
                <View>
                  <Text className="user__header__info__name__text3">
                    E网ID: {userInfo.uuid}
                  </Text>
                </View>
              </View>
            )}

            {!isLogin ? (
              <Text
                className="user__header__info__name__text2"
                onClick={gotoLogin}
              >
                点击登录
              </Text>
            ) : null}
          </View>
        </View>
        <View className="user__header__info__account">
          <View className="user__header__info__account__item" 
          onClick={()=>{
            if(isLogin){
              Dq.navigateTo({
                url: `/pages/release/recharge/index?form=user`
              })
            }
        }}>
            <View >
              <Text>我的E币</Text>
            </View>
            <View>
              <Text className="user__header__info__account__item__num">
                {isLogin ? userInfo.e_coin : " --"}
              </Text>
            </View>
          </View>
          <View className="user__header__info__account__line" />
          <View className="user__header__info__account__item">
            <View>
              <Text>我的积分</Text>
            </View>
            <View>
              <Text className="user__header__info__account__item__num">
                {isLogin ? userInfo.integral : " --"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
UserHeader.options = {
  addGlobalClass:true
}