import Taro from "@tarojs/taro";
import { ChooseImageOptions, ChooseImageResult, TempFile, ActionSheetOptions } from './type'
import BASEHOST , {HOST} from '@/config'
import { requestConfig } from "@/config/requestConfig";
import Storage from "@/utils/storage";

const host = HOST ;//process.env.NODE_ENV === 'development' && process.env.TARO_ENV === 'h5' ? '/api' : HOST;

var display = {};

async function compressImage(image: ImageData, { maxWidth = 9999, maxHeight = 9999 }: ChooseImageOptions): Promise<TempFile> {
  let callback
  const promise = new Promise(resolve => callback = resolve)
  let imageWidth = image.width,
    imageHeight = image.height
  if (imageWidth > maxWidth) {
    imageHeight = Math.round(imageHeight * maxWidth / imageWidth)
    imageWidth = maxWidth
  }
  if (imageHeight > maxHeight) {
    imageWidth = Math.round(imageWidth * maxHeight / imageHeight)
    imageHeight = maxHeight
  }
  if (imageHeight === image.height && imageWidth === image.width) {
    callback(image)
  } else {
    const quality = Math.ceil((imageWidth * imageHeight) * 100 / (image.width * image.height))
    wx.compressImage({
      src:image.path,
      quality,
      async success({tempFilePath}){
        const tempFile = await getImageInfo({...image,path:tempFilePath})
        callback(tempFile)
      }
    })
  }
  return promise
}

async function getImageInfo(image:TempFile):Promise<TempFile>{
  const {path, size} = image
  return Taro.getImageInfo({
    src:path
  })
  .then(({width,type,height}) => ({width,size,mime:type,height,path}))
}

display.chooseImage = function(options: ChooseImageOptions):Promise<ChooseImageResult> {
  const {count = 1, success, fail, complete} = options
  return Taro.chooseImage({
    count,
  })
  .then(res => {
    return Promise.all(res.tempFiles.map(getImageInfo))
  })
  .then(imageInfos => {
    return Promise.all(imageInfos.map(imageInfo => compressImage(imageInfo,options)))
  })
  .then(tempFiles => {
    const res = {
      tempFiles,
      tempFilePaths: tempFiles.map(file => file.path)
    }
    typeof success === 'function' && success(res)
    return res
  })
  .catch(err => {
    typeof fail === 'function' && fail(err)
    typeof complete === 'function' && complete(err)
  })
}


/**
 * 上传图片
 * @param {arr}     files         图片url集合
 * @param {String}  url           图片上传接口地址
 * @param {String}  dir           上传目录地址
 * @param {String}  name          文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
 * @param {Object}  header        HTTP 请求 Header, header 中不能设置 Referer
 * @param {Object}  formData      HTTP 请求中其他额外的 form data
 */
display.uploadImage = ({
  files = [],
  name = "file",
  formData = {
    token: Storage.getInstance().getToken()
  },
  header = {
    // Authorization: Storage.getInstance().getToken()
  },
  dir = "",
  url = `${host}${requestConfig.uploadImageUrl}`
}) => {
  return new Promise((resolve, reject) => {
    if (files && files instanceof Array && files.length > 0) {
      var promiseList = [];
      for (var i = 0; i < files.length; i++) {
        promiseList[i] = new Promise((resolve, reject) => {
          Taro.uploadFile({
            url: url + dir,
            filePath: files[i],
            name: name,
            formData: formData,
            header: header,
            success: res => {
              resolve(res.data);
            },
            fail: error => {
              reject(error);
            }
          });
        });
      }
      Promise.all(promiseList)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    } else {
      reject("传参有误，请传数组格式");
    }
  });
};

display.showActionSheet = function showActionSheet(setting:ActionSheetOptions){
  const {options, cancelIndex} = setting;
  const buttons = options.filter((option, index) => index !== cancelIndex)
  const itemList = buttons.map((button) => button.label)
  Taro.showActionSheet({
    itemList,
    itemColor:'#424242',
    success({tapIndex}){
      buttons[tapIndex].onPress && buttons[tapIndex].onPress()
    }
  })
}

export default display;
