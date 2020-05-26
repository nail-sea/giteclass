import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text, Input } from "@tarojs/components";
import {
  DqPicker,
  DqInput,
  DqTextarea,
  DqButton,
  DqCheckbox,
  ImgPicker
} from "@/components";
import IconFont from "@/components/iconfont";
import { connect } from "@tarojs/redux";
import { stdConfig } from "@/utils/common";
import ENUM from "@/config/enum";
import "./index.scss";
import { formatStyle } from "../../../../utils/style";
import classNames from "classnames";

@connect(({ publish }) => ({
  ...publish
}))
class HouseContent extends PureComponent {
  state = {
    title: "", // 标题
    rent_house_status_arr: [], //出租方式
    house_status_arr: [], //房源状态
    advantage_arr: [], //房源优势
    finish_status_arr: [], //装修情况
    describe: "", // 房源描述
    imgList: [], // 图片地址list
    image_id: [], // 图片ID list
    price: "", //
    room: 1, //室
    hall: 0, //厅
    bathroom: 0, //卫
    area: "100" //面积
  };

  async componentDidShow() {}

  async componentDidMount() {
    await stdConfig.sendConfig();
    await this.setState({
      rent_house_status_arr: stdConfig.getData(
        "buyRentHouse",
        "rent_house_status"
      ),
      advantage_arr: stdConfig.getData("buyRentHouse", "advantage"),
      finish_status_arr: stdConfig.getData("buyRentHouse", "finish_status"),
      house_status_arr: stdConfig.getData("buyRentHouse", "house_status")
    });
    this.dispatchValue("price", 0); //默认面议
    this.dispatchValue("house_status_value", -1);
    this.dispatchValue("rent_house_status_value", "");
    this.dispatchValue("finish_status_value", -1);
    this.dispatchValue("advantage", "");
  }

  gotoTop() {}

  dispatchValue(key, value) {
    const { dispatch } = this.props;
    dispatch({
      type: "publish/getValue",
      payload: {
        [key]: value
      }
    });
  }

  handleInputForm(key, value) {
    this.setState({ [key]: value });
    this.dispatchValue(key, value);
  }

  handlePrice() {
    this.dispatchValue("price", 0);
  }

  handleForm = (key, data, value) => {
    let values = [];
    if (value instanceof Array && value.length > 0) {
      value.map(item => {
        values.push(data[item].key);
      });
    }
    // basic
    if (typeof value === "number" || typeof value === "string") {
      values.push(data[value].key);
      values = values.toString();
    }
    this.dispatchValue([`${key}_value`], value);
    this.dispatchValue(key, values);
  };

  handleGetImg(urls, ids) {
    this.setState({
      image_id: ids,
      imgList: urls
    });
    this.dispatchValue("image_id", ids);
  }

  render() {
    const {
      rent_house_status_arr,
      house_status_arr,
      imgList,
      image_id,
      describe,
      finish_status_arr,
      advantage_arr
    } = this.state;
    const { currentKey } = this.props;

    const {
      title,
      house_status_value,
      rent_house_status_value,
      area,
      room,
      hall,
      bathroom,
      price,
      finish_status_value,
      advantage_value
    } = this.props.params;
    return (
      <View>
        <View className="dq-form-continer__item">
          <Text className="dq-form-continer__item__label">标题</Text>
          <View className="dq-form-continer__item__content">
            <DqInput
              name="title"
              placeholder="请输入信息标题"
              value={title}
              inputStyleDq={formatStyle({ "padding-right": "34px" })}
              styleType="-style2"
              onInput={this.handleInputForm.bind(this, "title")}
            />
          </View>
        </View>
        {currentKey == 1 || currentKey == 3 ? (
          <View className="dq-form-continer__item">
            <Text className="dq-form-continer__item__label">房源状态</Text>
            <View className="dq-form-continer__item__content">
              <DqPicker
                name="house_status"
                type="basic"
                selector={house_status_arr}
                value={house_status_value}
                mode="selector"
                onChange={this.handleForm.bind(
                  this,
                  "house_status",
                  house_status_arr
                )}
              />
            </View>
          </View>
        ) : (
          <View className="dq-form-continer__item">
            <Text className="dq-form-continer__item__label">出租方式</Text>
            <View className="dq-form-continer__item__content">
              <DqPicker
                name="rent_house_status"
                type="tag"
                selector={rent_house_status_arr}
                value={rent_house_status_value}
                mode="selector"
                onChange={this.handleForm.bind(
                  this,
                  "rent_house_status",
                  rent_house_status_arr
                )}
              />
            </View>
          </View>
        )}
        <View className="dq-form-continer__item-view">
         
          {(
            currentKey ==3 || currentKey==4 ?  
            <Text className="dq-form-continer__item-view__label">期望面积</Text> :
            <Text className="dq-form-continer__item-view__label">房源面积</Text>
          )}
          <View className="dq-form-continer__item-view__content-flex">
            <View className="dq-form-continer__item-view__content-flex__text">
              <View className="dq-form-continer__item-view__content-flex__text__input">
                <DqInput
                  type="number"
                  value={area}
                  placeholder="填写"
                  onInput={this.handleInputForm.bind(this, "area")}
                  // inputStyle={formatStyle({'font-size':'32px'})}
                />
              </View>
              <Text className="dq-form-continer__item-view__content-flex__text-txt">
                /㎡
              </Text>
            </View>
            <View className="dq-form-continer__item-view__content-flex__text">
              <View className="dq-form-continer__item-view__content-flex__text__input">
                <DqInput
                  type="number"
                  name="room"
                  placeholder="填写"
                  value={room}
                  onInput={this.handleInputForm.bind(this, "room")}
                  // inputStyle={formatStyle({ "font-size": "32px" })}
                />
              </View>
              <Text className="dq-form-continer__item-view__content-flex__text-txt">
                室
              </Text>
            </View>
            <View className="dq-form-continer__item-view__content-flex__text">
              <View className="dq-form-continer__item-view__content-flex__text__input">
                <DqInput
                  type="number"
                  name="hall"
                  placeholder="填写"
                  value={hall}
                  onInput={this.handleInputForm.bind(this, "hall")}
                  // inputStyle={formatStyle({ "font-size": "32px" })}
                />
              </View>
              <Text className="dq-form-continer__item-view__content-flex__text-txt">
                厅
              </Text>
            </View>
            <View className="dq-form-continer__item-view__content-flex__text">
              <View className="dq-form-continer__item-view__content-flex__text__input">
                <DqInput
                  type="number"
                  name="bathroom"
                  placeholder="填写"
                  value={bathroom}
                  onInput={this.handleInputForm.bind(this, "bathroom")}
                  // inputStyle={formatStyle({ "font-size": "32px" })}
                />
              </View>
              <Text className="dq-form-continer__item-view__content-flex__text-txt">
                卫
              </Text>
            </View>
          </View>
        </View>
        <View className="dq-form-continer__item">
          <Text className="dq-form-continer__item__label">房源价格</Text>
          <View className="dq-form-continer__item__content-flex">
            <View
              className="dq-form-continer__item__content-flex__text"
              onClick={this.handlePrice.bind(this)}
            >
              <IconFont
                name="icon_choose"
                color={price > 0 ? "#bbb" : "#F87C6A"}
                size={30}
              />
              <Text className="dq-form-continer__item__content-flex__text__txt">
                面议
              </Text>
            </View>
            <View className="dq-form-continer__item__content-flex__text">
              <View className="dq-form-continer__item__content-flex__text__input">
                <DqInput
                  name="price"
                  type="number"
                  placeholder="请输入"
                  value={price > 0 ? price : ""}
                  onInput={this.handleInputForm.bind(this, "price")}
                />
              </View>
              {currentKey == 1 || currentKey == 3 ? (
                <Text className="dq-form-continer__item__content-flex__text__text">
                  万元
                </Text>
              ) : (
                <Text className="dq-form-continer__item__content-flex__text__text">
                  {" "}
                  /月
                </Text>
              )}
            </View>
          </View>
        </View>
        <View className="dq-form-continer__item">
          <Text className="dq-form-continer__item__label">装修情况</Text>
          <View className="dq-form-continer__item__content">
            <DqPicker
              name="装修情况"
              type="basic"
              selector={finish_status_arr}
              value={finish_status_value}
              mode="selector"
              onChange={this.handleForm.bind(
                this,
                "finish_status",
                finish_status_arr
              )}
            />
          </View>
        </View>
        <View className="dq-form-continer__item">
          <Text className="dq-form-continer__item__label">房源优势</Text>
          <View className="dq-form-continer__item__content">
            <DqPicker
              name="advantage"
              type="tag"
              selector={advantage_arr}
              value={advantage_value}
              mode="selector"
              onChange={this.handleForm.bind(this, "advantage", advantage_arr)}
            />
          </View>
        </View>
        <View
          className={classNames(
            "dq-form-continer__item__top",
            "dq-form-continer__item__top-textarea"
          )}
        >
          <Text className="dq-form-continer__item__label">房源描述</Text>
          <View className="dq-form-continer__item__content">
            <DqTextarea
              name="describe"
              placeholder="请输入房源描述"
              maxLength={100}
              value={describe}
              inputStyleDq={formatStyle({ "padding-right": "34px" })}
              styleType="-style2"
              onInput={this.handleInputForm.bind(this, "describe")}
            />
          </View>
        </View>
        <View className="dq-form-continer__item__top-block">
          <Text className="dq-form-continer__item__label__top-block">
            添加照片（选填，最多9张，小于2M）
          </Text>
          <View
            className={classNames(
              "dq-form-continer__item__content",
              "dq-form-continer__item__content-img"
            )}
          >
            <ImgPicker
              imgList={imgList}
              image_id={image_id}
              max={9}
              size={2}
              onChange={this.handleGetImg.bind(this)}
            />
          </View>
        </View>
      </View>
    );
  }
}
export default HouseContent;