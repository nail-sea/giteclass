import Taro, { Component} from '@tarojs/taro'
const FormContext = Taro.createContext({state:{}, dispatch:() => {}, submit:()=>{}})
export default FormContext