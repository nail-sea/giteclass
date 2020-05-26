import Taro from "@tarojs/taro";
import { ChooseImageOptions, ChooseImageResult, TempFile, ActionSheetOptions } from './type'
import BASEHOST , {HOST} from '@/config'
import { requestConfig } from "@/config/requestConfig";
import Storage from "@/utils/storage";
import global from "@/utils/global";
import Nerv from 'nervjs';
import ActionSheet from "./components/ActionSheet"

const host = process.env.NODE_ENV === 'development' ? '/proxy' : ""//(global.header == "http" ? HOST.replace('https','http') : HOST);

var display = {};

async function fileCompress(file: File, { maxWidth = 9999, maxHeight = 9999 }: ChooseImageOptions): Promise<TempFile> {
  let reader = new FileReader()
  let callback
  let promise = new Promise(resolve => callback = resolve)
  reader.readAsDataURL(file)
  reader.onload = function (e) {
    let image = new Image()
    image.src = e.target.result
    image.onload = function (e) {
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
      if (imageWidth === image.width && imageHeight === image.height) {
        let blob = new Blob([file], {
          type: file.type
        })
        let path = URL.createObjectURL(blob)
        callback({
          size: file.size,
          path,
          type: file.type,
          width: imageWidth,
          height: imageHeight
        })
      } else {
        let canvas = document.createElement('canvas'),
          context = canvas.getContext('2d')
        canvas.width = imageWidth
        canvas.height = imageHeight
        context.drawImage(image, 0, 0, imageWidth, imageHeight)
        canvas.toBlob(blob => {
          let path = URL.createObjectURL(blob)
          callback({
            size: blob.size,
            path,
            type: file.type,
            width: imageWidth,
            height: imageHeight
          })
        }, file.type)
      }
    }
  }
  return promise
}
display.chooseImage = function (options: ChooseImageOptions): Promise<ChooseImageResult> {
  const { count = 1, success, fail, complete } = options
  const imageId = 'taroChooseImage'
  let taroChooseImage = document.getElementById(imageId)
  if (!taroChooseImage) {
    let inputElem = document.createElement('input')
    inputElem.setAttribute('type', 'file')
    inputElem.setAttribute('id', imageId)
    if (count > 1) {
      inputElem.setAttribute('multiple', 'multiple')
    }
    inputElem.setAttribute('accept', 'image/*')
    inputElem.setAttribute('style', 'position: fixed;top: -4000px; left: -3000px; z-index: -1000;')
    document.body.appendChild(inputElem)
    taroChooseImage = document.getElementById(imageId)
  }
  return new Promise((resolve, reject) => {
    let taroMouseEvents = document.createEvent('MouseEvents')
    taroMouseEvents.initEvent('click', false, true)
    taroChooseImage.dispatchEvent(taroMouseEvents)
    taroChooseImage.onchange = function (e) {
      let arr = [...e.target.files]
      Promise.all(arr.map(file => fileCompress(file, options)))
        .then(tempFiles => {
          const tempFilePaths = tempFiles.map(({ path }) => path)
          const res = { tempFilePaths, tempFiles }
          typeof success === 'function' && success(res)
          typeof complete === 'function' && complete(res)
          resolve(res)
          e.target.value = ''
        })
        .catch(err => {
          reject(err)
        })
    }
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
  url = process.env.NODE_ENV === 'production' && process.env.TARO_ENV === 'h5' && global.realm.length > 0 && window.NETMENT == 2
                    ? url.replace('eclass' , 'eclass' + global.realm) : url;

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

display.showActionSheet = function showActionSheet(
	setting: ActionSheetOptions
) {
	const { options, cancelIndex } = setting
  const Dom = Nerv.createElement(ActionSheet, {buttons:options, onCancel:destroy, cancelIndex, show:true})

  const box = document.createElement('div')
  box.setAttribute('id', 'dq-action-sheet');
  document.body.appendChild(box)
  Nerv.render(Dom, document.getElementById('dq-action-sheet'))
  
  function destroy(){
    document.body.removeChild(box)
  }

}

export default display;
