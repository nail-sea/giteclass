/**
 * 图片预加载组件
 *
 * @author HuiminLiu
 */

class ImgLoader {
  /**
   * 初始化方法，在页面的 onLoad 方法中调用，传入 Page 对象及图片加载完成的默认回调
   */
  constructor() {
    this.instance = null

    this.imgLoadList = [];//下载列表
    this.imgCacheList = [];//缓存图片
  }
  static Instance() {
    if (!this.instance) {
      this.instance = new ImgLoader();
    }
    return this.instance;
  }
  getUrl(url){
    this.imgCacheList.map(item=>{
      if(item == url){
        return ''
      }
    })
    this.imgLoadList.push(url)
    return url
  }
  saveUrl(url){
    const index = this.imgLoadList.indexOf(url)
    if(index != -1){
      this.imgLoadList.splice(index, 1)
    }
    this.imgCacheList.push(url)
  }
}

module.exports = ImgLoader