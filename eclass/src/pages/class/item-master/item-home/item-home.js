import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { DqImage, Tag } from "@/components"
import IconFont from "@/components/iconfont";
import stdArray, { stdConfig, stopPropagation, getPlatform } from "@/utils/common";
import global from "@/utils/global";
import ENUM from "@/config/enum";
import classnames from 'classnames'
import "./item-home.scss";
import times from "@/utils/times";
import display from "@/utils/display";
import Storage from "@/utils/storage";
import utils from '@/utils/utils'
import Dq from '@/config/Dq'

export default class ItemHome extends PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      showAll: false,
      loginState: 2
    };
  }
  static defaultProps = {
    item: null,
    type: "",
    avatar_url: "",
    user_name: "",
    onHandleDetail: () => { },
    handleToPersonalPage: () => { }
  };

  async componentDidMount() {
		const loginState = await Storage.getInstance().getLoginState();
		this.setState({ loginState })
	}

  handleDetail = e => {
    this.props.onHandleDetail();
  };

  handleToPersonalPage = e => {
    stopPropagation(e)
    if (
      this.props.type == "personal-page" ||
      this.props.type == "release-management"
    ) {
      this.props.onHandleDetail();
    } else {
      this.props.onHandleToPersonalPage();
    }
  };

  handlePhoneCall = (phone, e) => {
    stopPropagation(e)
    if(this.state.loginState == ENUM.LOGINSTATUS){
      display.showActionSheet({
        options: [
          {
            icon: 'ic_phone',
            label: `呼叫 ${phone}`,
            onPress: () => {
              Taro.makePhoneCall({
                phoneNumber: phone
              })
            }
          },
          {
            label:'取消'
          }
        ],
        cancelIndex:1
      })
    } else {
      Taro.showModal({
        title: "",
        content: "您还未登录哦",
        confirmText: "去登录",
        confirmColor : '#F87C6A',
        success: msg => {
          if (msg.confirm) {
          Dq.navigateTo({
            url: ENUM.LOGINURL
          });
          }
        }
      });
    }
  };

  handleShowAll = (id, e) => {
    this.setState({ showAll: true });
  };

  render() {
    const { item, type, avatar_url, user_name } = this.props;

    //个人主页，发布管理(名字头像传递进来)
    if (type == "personal-page" || type == "release-management") {
      item.avatar_url = avatar_url;
      item.uname = user_name;
    }
    if (item) {
      let time = times.friendlyDate(!item.create_time || item.create_time == 0 ? "" : item.create_time+'');

      const _type = ENUM.ITEMTYPE[type] || "home";
      let str_show_label = ''
      let str_get_label = ''

      if (item.primary_category == 'jobHunting') {
        str_show_label = item.extend ? item.extend.label : ""
        str_get_label = 'label'
      } else if (item.primary_category == 'buyRentHouse' || item.primary_category == 'secondHand' || item.primary_category == 'dating' || item.primary_category == 'carpoolingCar') {
        str_show_label = item.extend ? item.extend.advantage : ""
        str_get_label = 'advantage'
        if (item.primary_category == 'carpoolingCar') {
          str_get_label = item.second_category == 1 ? 'someone_for_car_advantage' : 'car_for_someone_advantage'
        }
      }
      let arr_show_label = stdArray.splitString(str_show_label).slice(0, 3);


      const isPrice = _type == "jobHunting_1" || _type == "jobHunting_2" || _type=='secondHand' ;
    
      const isPhone = _type == "home";
      const titleCategory =
        item.second_category && item.second_category > 0
          ? stdConfig.getData(
            item.primary_category,
            "second_category",
            item.second_category
          )
          : stdConfig.getData(item.primary_category, "title");
      let primary_title = "";
      if (item.primary_category == "dating") {
        primary_title = stdConfig.getData(item.primary_category, "title");
      }

      const isAllBtn =
        this.state.showAll == false &&
        item.describe &&
        item.describe.length > 90;



      return (
        <View
          key={item.id} className="main-list__item"
          onClick={this.handleDetail}
        >
          <View className="main-list__item-header">
            {/* <View>
              {item.avatar_url && item.avatar_url != '' && <Image mode='aspectFill' className='main-list__item-header__img' src={item.avatar_url} />}
            </View> */}
            <View
              className="main-list__item-header__titles"
            >
              <View className="main-list__item-header__titles__types">
                <View className="main-list__item-header__titles__label">
                  {!!item.top_status && item.top_status >= ENUM.TOPSTATUS && (
                    <Tag text='顶' type='top' />
                  )}
                  {!!item.is_recommend && item.is_recommend == ENUM.RECOMMEND_STATUS && (
                    <Tag text='荐' type='recommend' />
                  )}
                  {!!primary_title && primary_title.length > 0 && (
                    <Tag text={primary_title} type={item.primary_category} />
                  )}
                  {!!titleCategory && titleCategory.length > 0 && item.primary_category != 'dating' && (
                    <Tag text={titleCategory} type={item.primary_category} />
                  )}
                  {!!titleCategory && titleCategory.length > 0 && item.primary_category == 'dating' && (
                    <Tag text={item.second_category == 1 ? '♂' : '♀'} type={`sex-${item.second_category}`} />
                  )}

                  <View className="main-list__item-header__titles__types__item4">
                    <Text className="main-list__item-header__titles__types__item4__text" numberOfLines={1}>
                      {item.title || ""}
                    </Text>
                  </View>
                </View>
                {/* <View className='main-list__item-header__name'>{item.uname}</View> */}
              </View>
              {arr_show_label.length > 0 && (
                <View className="main-list__item-header__titles__tags">
                  {arr_show_label.map((tag, index) => (
                    <Text
                      className="main-list__item-header__titles__tags__item"
                      key={'item-home-show-label-'+index}
                    >
                      {stdConfig.getData(item.primary_category, str_get_label, tag)}
                    </Text>
                  ))}
                </View>
              )}
            </View>

            {/* {isPhone && (
              <View className="main-list__item-header__call">
                <View
                  className="main-list__item-header__call__btn"
                  onClick={this.handlePhoneCall.bind(this, item.contact_phone)}
                >
                  <IconFont name="ic_phone" color={"#FF8256"} size={28} />
                  <Text className="main-list__item-header__call__btn__text">
                    联系Ta
                  </Text>
                </View>
              </View>
            )} */}
            {isPrice && item.extend && _type=='secondHand' &&<View className="main-list__item-header__salary">
                <Text className="main-list__item-header__salary__text">
                  {(!item.extend.price || item.extend.price=='面议')? '面议' : `¥${item.extend.price}`}
                </Text>
              </View>}
            {isPrice && item.extend && item.extend.salary && (_type == "jobHunting_1" || _type == "jobHunting_2") &&(
              <View className="main-list__item-header__salary">
                <Text className="main-list__item-header__salary__text">
                  {item.extend.salary === '99' ? '面议' : `¥ ${stdConfig.getData(
                    item.primary_category,
                    "salary",
                    item.extend.salary
                  )}/月`}
                </Text>
              </View>
            )}
          </View>
          {item.describe ? <View className="main-list__item-content">
            {item.primary_category == 'carpoolingCar' && item.extend ? <View className="main-list__item-content__word">
              <Text className="main-list__item-content__word__text">
                {`${item.extend.start_address}到${item.extend.end_address}`}
              </Text>
            </View> : null}
            <View
              className="main-list__item-content__word"
            >
              <Text className="main-list__item-content__word__text">
                {isAllBtn ? item.describe.substr(0, 80) + "..." : item.describe}
              </Text>
            </View>
            {isAllBtn && (
              <View
                className="main-list__item-content__all"
                onClick={this.handleShowAll.bind(this, item.id)}
              >
                <Text className="main-list__item-content__all__text">展开</Text>
              </View>
            )}
          </View> : <View></View>}
          {item.image_url && item.image_url.length > 0 ? (
            <View
              className="main-list__item-imglist"
            >
              {item.image_url.map((img, index) => (
                <View key={'item-home-img-'+index} 
                className="main-list__item-imglist__item">
                  {index < 4 && (
                    <View 
                    style={index===3?{marginRight:0}:''}
                    className={classnames('main-list__item-imglist__img')}>
                      <DqImage
                        mode="aspectFill"
                        src={img}
                      />
                    </View>
                    // <Image
                    //   mode="aspectFill"
                    //   className="main-list__item-imglist__img"
                    //   src={img}
                    //   resizeMethod="resize"
                    // />
                  )}
                  {item.image_url.length > 4 && index === 3 && (
                    <View className="main-list__item-imglist__mask">
                      <Text className="main-list__item-imglist__mask__text">
                        +{item.image_url.length - 4}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          ) : null}
          {/* {item.avatar_url} */}
          <View className="main-list__item-footer">
            <View
              className="main-list__item-footer__header"
              onClick={this.handleToPersonalPage}
            >
              {item && item.avatar_url && item.avatar_url != "" ? (
                <Image
                  mode="aspectFill"
                  className="main-list__item-footer__header__img"
                  src={item.avatar_url}
                />
              ) : (
                  <View className="main-list__item-footer__header__img">
                    <Text className="main-list__item-footer__header__img__text">{` `}</Text>
                    <IconFont name="icon_moren" size="34" />
                  </View>
                )}
            </View>
            <View className="main-list__item-footer__name">
              <Text className="main-list__item-footer__name__text">
                {item.uname}
              </Text>
            </View>
            <View className="main-list__item-footer__time">
              <Text className="main-list__item-footer__time__text">
                {time}
              </Text>
            </View>
            <View className="main-list__item-footer__num">
              <View className="main-list__item-footer__num-icon">
                <IconFont name="icon_liulan" color={"#A0A0A0"} size={28} />
              </View>
              <Text className="main-list__item-footer__num__text">
                {item.visit_num}
              </Text>
            </View>
            {/* <View className="main-list__item-footer__num-share">
              <View className="main-list__item-footer__num-share-icon">
                <IconFont name="icon_fengxiang1" color={"#A0A0A0"} size={24} />
              </View>
              <Text className="main-list__item-footer__num-share__text">
                {item.share_num}
              </Text>
            </View> */}
          </View>
          <View className="main-list__item-btn-continer">
            {this.props.children}
          </View>
        </View>
      );
    }
  }
}
