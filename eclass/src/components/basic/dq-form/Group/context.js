import Taro from '@tarojs/taro'
const GroupContext = Taro.createContext({name:null, setValue:() => {} , defaultValue:null})
export default GroupContext