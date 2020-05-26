## polyfill使用说明
###  1、创建文件夹
```bash
mkdir <你想修改的module名>
```
### 2、创建polyfill/config.json文件，内容格式如下：
```json
[
  {
    "source":"你提供的新文件的路径，例如：./api/request/index.js",
    "package":"你要替换的module的路径，例如：@tarojs/taro-rn",
    "target":"你要替换掉的文件相对于module入口文件的路径，例如：../dist/api/request/index.js"
  }
]
```
同一个config.json内可以包含多个待替换文件的配置信息

### 3、建立替换文件
根据config.json中配置的source属性，建立对应路径下的文件，例如
```
polyfill/taro-rn/api/request/index.js
```
文件内容为你想要替换掉的文件对应的全部内容
### 4、修改package.json
在package.json中的scripts中进行脚本的绑定，例如：
```json
...other code
"scripts": {
  "dev:rn": "node scripts/polyfill/index.js && npm run build:rn -- --watch",
},
...other code
```