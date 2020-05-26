import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import IconFont from "@/components/iconfont";
import { connect } from "@tarojs/redux";
import stdArray, { setArrayObject, stdConfig } from "@/utils/common";
import utils from "@/utils/utils";
import ENUM from "@/config/enum";
import CarpoolingCarDetail from "../components/carpooling";
import DatingDetail from "../components/dating";
import LocalMeetDetail from '../components/localMeet'
import BuyRentHouseDetail from '../components/buyRentHouse'
import className from "classnames";
import { Tag } from "@/components";
import times from "@/utils/times";
import Dq from "@/config/Dq";

import "./index.scss";

@connect(({ classModels }) => ({
  ...classModels
}))
class Index extends PureComponent {
  config = {
    navigationBarTitleText: "详情"
  };
  static defaultProps = {
    data: null
  };

  handleToPersonalPage = uid => {
    //去个人主页
    Dq.navigateTo({
      url: `/pages/user/personal-page/index?uid=${uid}`
    });
  };

  getPriceText = data => {
    if (data.extend.price === 0) {
      return '面议'
    }
    if (data.primary_category === 'buyRentHouse') {
      if (data.second_category === '1' || data.second_category === '3') {
        return `¥ ${data.extend.price}万`
      }
      return `¥ ${data.extend.price}/月`
    }else if (data.primary_category === 'localMeet') {
      return `¥ ${data.extend.price || 0}/人`
    }
    return `¥ ${data.extend.price || 0}`
  }

  render() {
    const { data, from } = this.props;
    if (!data) return;
    const arr_label = stdArray.splitString(
      data.extend ? data.extend.label : ""
    );
    const arr_position = stdArray.splitString(
      data.extend ? data.extend.position : ""
    );
    const arr_advantage = stdArray.splitString(
      data.extend ? data.extend.advantage : ""
    );
    var strSecondTitle = null;
    if (data.primary_category == "dating") {
      strSecondTitle = `${times.getFormaAges(data.extend.birth)}岁 | 身高${
        data.extend.height
        } | ${stdConfig.getData(
          data.primary_category,
          "education",
          data.extend.education.length ? data.extend.education : 1
        )}`;
    }

    const isCarPooling = data.primary_category == "carpoolingCar"; // 拼车租车 不同
    const isLocalMeet = data.primary_category === 'localMeet'
    const describeTitleMap = {
      dating: '自我介绍',
      localMeet:'活动描述'
    }
    const describe_title = describeTitleMap[data.primary_category] || '';
    
    let time = times.friendlyDate(data.create_time == 0 ? "" : data.create_time+'');
    return (
      <View className="com-detail">
        {/* <TitleBar title='详情' /> */}
        <View className="com-detail__info">
          <View className="com-detail__info__titlename">
            {data.title ? <Text className="com-detail__info__titlename__text">
              {data.title || ""}
            </Text> : null}
            {/* {isCarPooling && data.contact_name ? (
              <Text className="com-detail__info__titlename__text">
                {data.contact_name || ""}
              </Text>
            ) : null} */}
            {data.second_category && data.second_category != 0 ? (
              <Tag text={stdConfig.getData(data.primary_category, "second_category", data.second_category)} type={data.primary_category} />
            ) : <Tag text={stdConfig.getData(data.primary_category, "title")} type={data.primary_category} />}
          </View>
          <View className="com-detail__info__content">
            <View
              className="com-detail__info__content__img"
              onClick={this.handleToPersonalPage.bind(this, data.uid)}
            >
              {data && data.avatar_url && data.avatar_url != "" ? (
                <Image
                  mode="aspectFill"
                  className="com-detail__info__content__img__img"
                  src={data.avatar_url}
                />
              ) : (
                  <View className="com-detail__info__content__img__img">
                    <IconFont name="icon_moren" size="85" />
                  </View>
                )}
            </View>
            <View className="com-detail__info__content__info">
              <View className="com-detail__info__content__info__t">
                <View className="com-detail__info__content__info__tview">
                  {data.top_status && data.top_status >= ENUM.TOPSTATUS && (
                    <Tag text='顶' type='top' />
                  )}
                  {data.is_recommend && data.is_recommend == ENUM.RECOMMEND_STATUS && (
                    <Tag text='荐' type='recommend' />
                  )}
                </View>
                {data.uname ? <Text className="com-detail__info__content__info__t1">
                  {data.uname}
                </Text> : null}
              </View>
              <View className="com-detail__info__content__info__t">
                <Text className="com-detail__info__content__info__t2">
                  {time}
                </Text>
              </View>
            </View>
            {data.extend && data.extend.price >= 0 ? (<View>
              <View className="com-detail__info__content__call">
                <Text className="com-detail__info__content__call__text">
                  {this.getPriceText(data)}
                </Text>
              </View>
            </View>) : null}

            {data.extend && data.extend.salary ? (
              <View>
                <View className="com-detail__info__content__call">
                  <Text className="com-detail__info__content__call__text">
                    {data.extend.salary === '99' ? '面议' : `¥${stdConfig.getData(
                      data.primary_category,
                      "salary",
                      data.extend.salary
                    )}/月`}
                  </Text>
                </View>
              </View>
            ) : null}

          </View>
          {arr_label.length > 0 ? (
            <View className="com-detail__info__tit">
              {arr_label.map((item, index) => {
                return (
                  <Text key={'detail-master-tit-'+index} className="com-detail__info__tit_t2">
                    {stdConfig.getData(data.primary_category, "label", item)}
                  </Text>
                );
              })}
            </View>
          ) : null}
          {arr_advantage.length > 0 && data.primary_category != "dating" ? (
            <View className="com-detail__info__tit">
              {arr_advantage.map((item, index) => {
                const advantage_type =
                  data.primary_category == "carpoolingCar"
                    ? data.second_category == 1
                      ? "someone_for_car_advantage"
                      : "car_for_someone_advantage"
                    : "advantage";
                return (
                  <Text key={'detail-master-advantage-'+index} className="com-detail__info__tit_t2">
                    {stdConfig.getData(
                      data.primary_category,
                      advantage_type,
                      item
                    )}
                  </Text>
                );
              })}
            </View>
          ) : null}
        </View>
        {arr_position.length > 0 ||
          (data.extend && data.extend.specification) ? (
            <View className="com-detail__info__tit">
              {arr_position.map((item, index) => {
                return (
                  <Text key={'detail-master-position-'+index} className="com-detail__info__tit__t1">
                    {stdConfig.getData(data.primary_category, "position", item)}
                    {index + 1 === arr_position.length ? "" : <Text>;</Text>}
                  </Text>
                );
              })}
              {data.extend && ENUM.SPECIFICATION[data.extend.specification] ? (
                <Tag text={ENUM.SPECIFICATION[data.extend.specification]["name"]} type={data.primary_category} />
              ) : null}
            </View>
          )
          : null}

        {strSecondTitle ? (
          <View className="com-detail__secondtitle">
            <Text className="com-detail__secondtitle__text">
              {strSecondTitle}
            </Text>
          </View>
        ) : null}

        {isCarPooling ? <CarpoolingCarDetail data={data} /> : null}
        {isLocalMeet && <LocalMeetDetail data={data} />}
        {describe_title ? (
          <View>
            <Text className="com-detail__describe_title__text">
              {describe_title}
            </Text>
          </View>
        ) : null}

        <View className="com-detail__describe">
          <Text className="com-detail__describe__text">{data.describe}</Text>
        </View>

        {data.primary_category == "dating" ? (
          <DatingDetail data={data} />
        ) : null}
        <View className="com-detail__describe">
          <Text className="com-detail__describe__text">联系时，请告之从【E网生活】看到的信息。</Text>
        </View>
        <View className="com-detail__img-list">
          {data.image_url
            ? setArrayObject(data.image_url).map((item, index) => (
              <View key={'detail-master-image-'+index} className="com-detail__img-list__item">
                <Image
                  className="com-detail__img-list__item__img"
                  mode="widthFix"
                  src={item.name}
                />
              </View>
            ))
            : null}
        </View>
        {data.primary_category === 'buyRentHouse' && <BuyRentHouseDetail data={data} />}
        <View className="com-detail__info__content__bottom">
          <View className="com-detail__info__content__info__t3">
            <IconFont name="icon_dingwei" size={34} />
            <Text className="p-l-10">{data.area_name}</Text>
          </View>
          <View className="com-detail__info__content__view">
            <View className="com-detail__info__content__view">
              <IconFont name="icon_liulan" size={30} color='#A0A0A0'/>
              <Text className="com-detail__info__content__info__t4">
                  {data.visit_num}
              </Text>
            </View>
            {/* <View className="com-detail__info__content__view">
              <IconFont name="icon_fengxiang1" size={24} color='#A0A0A0'/>
              <Text className="com-detail__info__content__info__t4">
                {data.share_num}
              </Text>
            </View> */}
          </View>
        </View>
        <View className="com-detail__info__connectname">
            <Text className="com-detail__info__connectname__text">
              联系人：{data.contact_name || ""}
            </Text>
        </View>
      </View>
    );
  }
}
export default Index;