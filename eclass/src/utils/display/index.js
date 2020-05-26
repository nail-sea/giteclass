
var display = {};

/**
 * @interface ChooseImageOptions {count:number}
 * @params {ChooseImageOptions} options
 */
display.chooseImage = ({})=>{};


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
  },
  header = {
  },
  dir = "",
  url = ``
}) => {

};

export default display;
