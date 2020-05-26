import Taro, { Component, PureComponent } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import IconFont from "@/components/iconfont";
import { connect } from "@tarojs/redux";
import utils from "@/utils/utils";
import display from "@/utils/display";
import BASEHOST from "@/config";
import { STATIC_ASSETS } from "../../config";
import storage from "@/utils/storage";
import Tips from "@/utils/tips";
import "./index.scss";
import { stopPropagation } from "@/utils/common";

@connect(({ classModels }) => ({
  ...classModels
}))
class ImgPicker extends PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      files: []
    };
  }
  static defaultProps = {
    files: [],
    imgList: [],
    size: 2,
    max: 9
  };

  static options = {
    addGlobalClass: true
  };

  handleAddImage() {
    const { max, size, imgList } = this.props;
    const count = max - imgList.length;
    utils.chooseImage({ count }).then(res => {
      let uploadFiles = [];
      res.map(item => {
        if (item.size <= size * 1024 * 1024) {
          uploadFiles.push(item.path);
        } else {
          Tips.toast(`请上传小于${size}M的图片`);
        }
        if (res.length > count) {
          uploadFiles = res.slice(0, count);
          Tips.toast(`最多上传${max}张图片`);
        }
      });
      if(uploadFiles.length <= 0){
        Tips.toast(`未选择2M以下的图片`);
        return;
      }
      Tips.loading("正在上传...");
      display.uploadImage({ files: uploadFiles })
        .then(res => {
          let imgIdArr = res.map(item => JSON.parse(item).data.img_id);
          let urlArr = res.map(item => JSON.parse(item).data.url);
          Tips.loaded();
          const { imgList, image_id } = this.props;
          this.props.onChange(
            [...imgList, ...urlArr],
            [...image_id, ...imgIdArr]
          );
        })
        .catch(err => {
          Tips.loaded();
          Tips.toast(`上传图片错误`);
          // console.log(err);
        });
    }).catch(err => {
      // console.log(err);
      Tips.toast(`选择图片错误`);
    });
  }

  handleDelate = (index, e) => {
    stopPropagation(e)

    const { imgList, image_id } = this.props;
    imgList.splice(index, 1);
    image_id.splice(index, 1);
    this.props.onChange(imgList, image_id);
  };

  previewImage() {
    const { imgList } = this.props;
    Taro.previewImage({
      current: imgList[0],
      urls: imgList
    });
  }

  render() {
    const { imgList, max } = this.props;
    return (
      <View className="img-picker">
        <View className="img-picker-list">
          {imgList.map((item, index) => {
            if (index < max) {
              return (
                <View
                  className="img-picker-list__item"
                  key={item}
                  onClick={() => this.previewImage()}
                >
                  <Image
                    mode="aspectFill"
                    src={item}
                    className="img-picker-list__item-img"
                  />
                  <View
                    className="img-picker-list__item-delate"
                    onClick={this.handleDelate.bind(this, index)}
                  >
                    <Image
                      className="img-picker-list__item-delate-img"
                      src={STATIC_ASSETS("images/icon/clear.png")}
                    />
                  </View>
                </View>
              );
            }
          })}
          {imgList.length < max && (
            <View
              className="img-picker-list__add"
              onClick={() => this.handleAddImage()}
            >
              <IconFont name="ic_xiangji" color={"#fff"} size={50} />
            </View>
          )}
        </View>
      </View>
    );
  }
}
export default ImgPicker;