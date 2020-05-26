/**
 * pages模版快速生成脚本,执行命令 npm run tep `文件名`
 */

const fs = require('fs')

const dirName = process.argv[2]

if (!dirName) {
  console.log('文件夹名称不能为空')
  console.log('示例：npm run tep Home')
  process.exit(0)
}

//页面模板
const indexTep = `import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';

@connect(({${dirName}}) => ({
  ...${dirName},
}))
export default class ${titleCase(dirName)} extends Component {
  config = {
    navigationBarTitleText: '${dirName}',
  };

  componentDidMount = () => {

  };

  render() {
    return (
      <View className="${dirName}-page">
        ${dirName}
      </View>
    )
  }
}`


// scss文件模版
const scssTep = `@import "../../styles/mixins";

.${dirName}-page {
  //@include wh(100%, 100%);
  width:100%;
  min-height: 100vh;
}
`;

// model文件模版
const modelTep = `import * as ${dirName}Api from './service';

export default {
  namespace: '${dirName}',
  state: {

  },

  effects: {},

  reducers: {},

}`;


// service页面模版
const serviceTep = `import Request from '../../utils/request';

export const demo = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};
`;

// config 接口地址配置模板
const configTep = `
export default {
  test: '/wechat/perfect-info', //xxx接口
}`



fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync('index.js', indexTep); // 
fs.writeFileSync('index.scss', scssTep);
fs.writeFileSync('model.js', modelTep);
fs.writeFileSync('service.js', serviceTep);
fs.writeFileSync('config.js', configTep);

console.log(`模版${dirName}已创建,请手动增加models`);

function titleCase(str) {
  const array = str.toLowerCase().split(' ');
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
  }
  const string = array.join(' ');
  return string;
}

process.exit(0);