import Taro from "@tarojs/taro";
import display from "@/utils/display";
const KB = 1024,
      MB = 1024* KB
export const ERROR_CODE = {
  OVER_SIZE:1,
  CANCEL:-1
}
function checkOverSize(files, sizeLimit){
  const overSizeFile = files.find(file => file.size > sizeLimit * MB)
  return !!overSizeFile
}
export function chooseImage({count, sizeLimit = 2, maxWidth = 750, maxHeight = 1334}){
  return display.chooseImage({ count, maxWidth,maxHeight})
  .then(({tempFilePaths, tempFiles}) => {
    if (checkOverSize(tempFiles, sizeLimit)) 
      return Promise.reject({errCode:ERROR_CODE.OVER_SIZE})
     return tempFilePaths
  })
  .catch(err => {
    return Promise.reject({errCode:ERROR_CODE.CANCEL})
  })
}