import Taro from "@tarojs/taro";

const NAVIGATOR_HEIGHT = 44;
const TAB_BAR_HEIGHT = 50;
const BACK_BAR_HEIGHT = 44;

/**
 * 返回屏幕可用高度
 * // NOTE 各端返回的 windowHeight 不一定是最终可用高度（例如可能没减去 statusBar 的高度），需二次计算
 * @param {boolean} showTabBar
 * @param {boolean} showBackBar
 * @param {number} handleHeight
 */
export function getWindowHeight(showTabBar = false, showBackBar = true, handleHeight = 0) {
  const info = Taro.getSystemInfoSync();
  const { windowHeight, statusBarHeight, titleBarHeight } = info;
  const tabBarHeight = showTabBar ? TAB_BAR_HEIGHT : 0;
  const backBarHeight = showBackBar ? BACK_BAR_HEIGHT : 0;

  if (process.env.TARO_ENV === "rn") {
    return windowHeight  - backBarHeight   - handleHeight;
  }

  if (process.env.TARO_ENV === "h5") {
    return `${windowHeight - tabBarHeight - backBarHeight - handleHeight}px`;
  }

  if (process.env.TARO_ENV === "weapp") {
    return `${windowHeight - tabBarHeight - 0 - handleHeight}px`;
  }

  if (process.env.TARO_ENV === "alipay") {
    // NOTE 支付宝比较迷，windowHeight 似乎是去掉了 tabBar 高度，但无 tab 页跟 tab 页返回高度是一样的
    return `${windowHeight -
      statusBarHeight -
      titleBarHeight +
      (showTabBar ? 0 : TAB_BAR_HEIGHT)}px`;
  }

  return `${windowHeight}px`;
}

/**
 * // NOTE 样式在编译时会通过 postcss 进行处理，但 js 中的 style 可能需要运行时处理
 * 例如加 prefix，或者对 RN 样式的兼容，又或是在此处统一处理 Taro.pxTransform
 * 此处只做演示，若需要做完善点，可以考虑借助 https://github.com/postcss/postcss-js
 */
export function postcss(style) {
  if (!style) {
    return style;
  }
  const { background, ...restStyle } = style;
  const newStyle = {};
  if (background) {
    // NOTE 如 RN 不支持 background，只支持 backgroundColor
    newStyle.backgroundColor = background;
  }
  return { ...restStyle, ...newStyle };
}

function toCamelKey(key){
  if (!key || typeof key !== 'string') return key
  const arr = key.split('-')
  // if (arr.length <= 1) return key
  return arr.map((ch, i) =>i && ch.replace(/.?/, ch.charAt(0).toUpperCase()) || ch).join('')
}

export function pxToPt(px, isFontSize = false){
  if(Taro.getEnv() === Taro.ENV_TYPE.WEAPP){
    return parseInt(px) + 'rpx'
  }
  const UIWidth = 750
  const {fontSizeSetting = 1, windowWidth} = Taro.getSystemInfoSync()
  if (isFontSize) return parseInt(px) * windowWidth / UIWidth * fontSizeSetting 
  return parseInt(px) * windowWidth / UIWidth
}

function isFontSizeRelated(camelKey){
  const fontSizeRelatedList = ['fontSize', 'lineHeight']
  return fontSizeRelatedList.includes(camelKey)
}

/**
 * 格式化样式对象
 * @param {Object} style 
 */
export function formatStyle(style){
  // const isRN = Taro.getEnv() === Taro.ENV_TYPE.RN
  if (!style || typeof style !== 'object') return style
  const newStyle = {}
  for (const key in style) {
    if (style.hasOwnProperty(key)) {
      let prop = style[key];
      const camelKey = toCamelKey(key)
      if (typeof prop === 'string' && prop.includes('px')) {
        prop = pxToPt(prop, isFontSizeRelated(camelKey))  
      }
      newStyle[camelKey] = prop
    }
  }
  return newStyle
}

export function calcSize(size) {
  if (typeof size === 'string') {
    return size
  }
  if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
    return `${size}rpx`
  }
  const DESIGN_WIDTH = 750
  const {screenWidth} = Taro.getSystemInfoSync()
  return size * screenWidth / DESIGN_WIDTH
}

// 解决IOS失去焦点页面不下落问题
export function scrollTop() {
  let u = navigator.userAgent
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isIOS && process.env.TARO_ENV === 'h5') {
    setTimeout(() => {
      const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
      window.scrollTo(0, Math.max(scrollHeight - 1))
    }, 100)
  }
}