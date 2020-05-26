import Taro, { useState, useContext } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import IconFont from "@/components/iconfont";
import * as utils from "./utils";
import display from "@/utils/display";
import FormContext from "../context";
import ImageItem from "./ImageItem";
import { stopPropagation } from "@/utils/common";

import "../index.scss";
const BASE = "dq-form";
const IMAGE = "dq-form__image-picker";

const UploadOneImage = props => {
  const formContext = useContext(FormContext);
  const defaultProps = {
    max: 1,
    sizeLimit: 2,
    label: "添加照片",
    describe: "请上传店铺Logo，建议尺寸为：180PX*130PX。",
    onChange: () => {}
  };
  const _props = Object.assign({}, defaultProps, props);
  const [state, setState] = useState({ imgs: {} });

  const deleteImg = (index,e) => {
    stopPropagation(e);
    const { imgs } = state;

    setState({ imgs: {} });
    _onChange(imgs.file_name);
  };

  const addImg = e => {
    const { sizeLimit } = _props;
    utils
      .chooseImage({ count: 1, sizeLimit, maxHeight:130, maxWidth:180 })
      .then(imgPaths => {
        display.uploadImage({ files: imgPaths }).then(res => {
          let data = JSON.parse(res[0]).data;

          setState({ imgs: data });
          _onChange(data.file_name);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const preview = () => {
    const { imgs } = state;
    Taro.previewImage({
      current: 1,
      urls: [imgs.url]
    });
  };

  const _onChange = imgs => {
    const { onChange, name } = _props;
    if (formContext) {
      formContext.dispatch({
        type: "change",
        payload: { name, value: imgs }
      });
    }
    onChange && onChange(imgs.file_name);
  };

  const { describe } = _props;
  const { imgs } = state;
  const canAddMore = imgs.url ? true : false;
  return (
    <View className={`${BASE} ${IMAGE}`}>
      <View className={`${BASE} ${IMAGE}__header`}></View>
      <View style={{ display: "flex", justifyContent: "space-between", flexDirection:'row' }}>
        <View>
          {!canAddMore ? (
            <View
              className={`${BASE} ${IMAGE}__content__item ${IMAGE}__content__item--camera`}
              style={{ width: 90, height: 65 }}
              onClick={addImg}
            >
              <IconFont name="icon_tianjia" color="#686868" size={30} />
              <Text style={{ fontSize: 12, marginTop: 10 }}>上传店铺logo</Text>
            </View>
          ) : (
            <ImageItem
              path={imgs.url}
              preview={preview}
              deleteImg={deleteImg}
              key={`image-picker-item-${imgs.img_id}`}
              style={{ width: 90, height: 65 }}
            />
          )}
        </View>
        <Text className={`${BASE} ${IMAGE}__header__describe`}>{describe}</Text>
      </View>
    </View>
  );
};

UploadOneImage.options = {
  addGlobalClass: true
};

export default UploadOneImage;
