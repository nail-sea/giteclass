import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import IconFont from "@/components/iconfont";
import "../index.scss";
const BASE = "dq-form";
const IMAGE = "dq-form__image-picker";
export default function ImageItem(props) {
  const {
    path,
    index,
    preview = () => {},
    deleteImg = () => {},
    style
  } = props;
  return (
    <View
      className={`${BASE} ${IMAGE}__content__item`}
      onClick={preview.bind(this, index)}
      style={style}
    >
      <Image
        src={path}
        className={path}
        mode="aspectFill"
        className={`${BASE} ${IMAGE}__content__item__img`}
        style={style}
      />
      <View
        className={`${BASE} ${IMAGE}__content__item__delete`}
        onClick={deleteImg.bind(this, index)}
      >
        <IconFont name="icon_Shanchumima" size={40} />
      </View>
    </View>
  );
}
ImageItem.options = {
  addGlobalClass: true
};
