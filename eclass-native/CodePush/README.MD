# CodePush 封装使用说明 —— BY 叶枫

## Getting Start
### 安装环境

首先，安装微软的appcenter

```shell
npm i -g appcenter-cli
```
### 账号管理

```shell
appcenter login
```
会自动打开微软appcenter登陆页面，选择登录方式或者注册新账号，登录成功后页面上会出现一个token，复制到命令行，并回车

### 应用管理

新建应用命令格式如下:

```shell
appcenter apps create -d <appDisplayName> -o <operatingSystem>  -p <platform> 
```
例如:

```shell
appcenter apps create -d MyApp-Android -o Android -p React-Native
```
注意安卓程序和iOS程序是分开管理的，需要分别添加两次

分别添加测试和发布分支
```shell
appcenter codepush deployment add -a <ownerName>/<appName> Staging
appcenter codepush deployment add -a <ownerName>/<appName> Production
```

添加成功后就可以查看对应的deployment key了
```shell
appcenter codepush deployment list --displayKeys
```
记住这两个key

注：更多appcenter相关命令可以参考[微软官方文档](https://docs.microsoft.com/en-us/appcenter/distribution/codepush/cli)

### 项目中整合code-push

在项目中引入codepush组件
```shell
yarn add react-native-code-push@5.6.1
```
注：RN版本0.55.4可使用的最高版本就是5.6.1了，再高就会因为gradle版本过低无法编译了

因为需要导入原生代码，运行
```shell
react-native link react-native-code-push
```
关联期间会要求输入deploymentKey，直接回车跳过，我们选择在其他地方添加

#### 安卓
编辑./android/app/build.gradle
```ruby
buildTypes {
         debug{
            //省略了其他配置
            buildConfigField "String", "CODEPUSH_KEY", '""'
        }
        releaseStaging {
            buildConfigField "String", "CODEPUSH_KEY", '"此处填入你的Staging deploymentKey，注意两端的双引号不可省略"'
        }
        release {
            //省略了其他配置
            buildConfigField "String", "CODEPUSH_KEY", '"此处填入你的Production deploymentKey，注意两端的双引号不可省略"'
            minifyEnabled enableProguardInReleaseBuilds
            signingConfig signingConfigs.release
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
```
编辑MainApplication.java
```java
@Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new CodePush(BuildConfig.CODEPUSH_KEY, MainApplication.this, BuildConfig.DEBUG)  // <---修改此行
      );
    }
```
重新构建安卓程序
```shell
react-native run-android
```
#### js层使用封装好的组件
组件包含两个部分文件：

config.js    -- 配置文件
AppWrapper.js -- 封装的主组件

##### 配置config.js
 ```javascript
const checkUpdateOptions = {
  /**
   * 检查更新频率
   * Specifies when you would like to synchronize updates with the codePush server.
   * Defaults to codePush.CheckFrequency.ON_APP_START.
   * options:
   * codePush.CheckFrequency.ON_APP_START -
   * codePush.CheckFrequency.ON_APP_RESUME
   * codePush.CheckFrequency.MANUAL
   */

  checkFrequency: codePush.CheckFrequency.ON_APP_START,

  /**
   * 部署key 可以覆盖原生代码中的设置
   * Specifies the deployment key you want to query for an update against.
   * By default, this value is derived from the Info.plist file (iOS) and MainActivity.java file (Android),
   * but this option allows you to override it from the script-side if you need to dynamically use a different deployment for a specific call to sync.
   */

  deploymentKey: Platform.select({
    android: __DEV__
      ? 'Staging 测试环境的key'    //在这里填入对应的deploymentKey
      : 'Production 生产环境的key',
    ios: __DEV__ 
      ? 'Staging 测试环境的key' 
      : 'Production 生产环境的key'
  })
}
```

##### 改造入口App.js
```javascript
import React, { Component } from 'react';
import AppWrapper from "./CodePush/AppWrapper";  //<--引入组件
export default class App extends Component{
  render() {
    return (
      <AppWrapper>
        {/* 这里是你原来的render代码 */}
      </AppWrapper>
    );
  }
}
```
### 发布更新
使用命令
```shell
appcenter codepush release-react -a <ownerName>/<appName> -d <deploymentName> -t <targetBinaryVersion>

[-t|--target-binary-version <targetBinaryVersion>]
[-o|--output-dir]
[-s|--sourcemap-output]
[--plist-file-prefix]
[-p|--plist-file]
[-g|--gradle-file]
[-e|--entry-file]
[--development]
[-b|--bundle-name <bundleName>]
[-r|--rollout <rolloutPercentage>]
[--disable-duplicate-release-error]
[-k|--private-key-path <privateKeyPath>]
[-m|--mandatory]
[-x|--disabled]
[--description <description>]
[-d|--deployment-name <deploymentName>]
[-a|--app <ownerName>/<appName>]
[--disable-telemetry]
[-v|--version]
```
常用的参数：
```
-m | 带上这个参数表示是强制更新
-t | 规定接收更新的目标版本
--description | 更新描述，需要用双引号包裹
```
可以绑定在package.json中方便调用
## 注意事项
1、发布更新的-t参数决定了安装了哪些版本的软件的用户会接收到更新提示，如果忽略，则从开发者的./android/app/build.gradle的defaultConfig.versionName读取，该版本以外的用户都不会进行更新，所以如果使用该方式推送更新，请指定-t参数，或者在热更新的时候，不要更改build.gradle中设置的对应版本号。
具体的更新版本规则，参看[微软官方文档]([https://docs.microsoft.com/en-us/appcenter/distribution/codepush/cli#target-binary-version-parameter](https://docs.microsoft.com/en-us/appcenter/distribution/codepush/cli#target-binary-version-parameter)
)
