import React, { Component } from 'react';
import CodePush from 'react-native-code-push';
import { Alert , 
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    NativeModules,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image} from 'react-native';
// import {
//     optionalUpdateOptions,
//     mandatoryUpdateOptions,
//     checkUpdateOptions
//   } from './config'

let codePushOptions = {
    //设置检查更新的频率
    //ON_APP_RESUME APP恢复到前台的时候
    //ON_APP_START APP开启的时候
    //MANUAL 手动检查
    checkFrequency : CodePush.CheckFrequency.ON_APP_START 
  };
  const  deploymentKey = "QpzMOd1mROe1UG7BKy5o9uE4TLlh4ksvOXqog";

  class AppWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
   
     };
    }


    componentWillMount () {
        // 页面加载的禁止重启，在加载完了可以允许重启
        CodePush.disallowRestart();

        this.checkUpdate();
        Alert.alert('1')
    }

    componentWillUnmount () {
        // 在加载完了可以允许重启s
        CodePush.allowRestart();
    }

 
     checkUpdate (){
        
       
       CodePush.checkForUpdate(deploymentKey)
       .then(() => {
        CodePush.sync({
            deploymentKey: deploymentKey,
            // updateDialog: false,
            mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
            
        },
        (SyncStatus) => {
         switch (SyncStatus) {
             case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                 Alert.alert("CodePush服务器正在查询更新。3")
                 break;
             case CodePush.SyncStatus.AWAITING_USER_ACTION:
                 Alert.alert("2")
                 break;
             case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                 Alert.alert("一个可用的更新正在从CodePush服务器下载")
                 break;
             case CodePush.SyncStatus.INSTALLING_UPDATE:
                 Alert.alert("一个可用的更新已下载，并即将安装。")
                 break;
             case CodePush.SyncStatus.UP_TO_DATE:
                 Alert.alert("已经是最新的")
                 break;
             case CodePush.SyncStatus.UPDATE_IGNORED:
                 Alert.alert("6")
                 break;
             case CodePush.SyncStatus.UPDATE_INSTALLED:
                 Alert.alert("7")
                 break;
             case CodePush.SyncStatus.UNKNOWN_ERROR:
                 Alert.alert("发生错误")
                 break;
         }
        },
        (progress) => {
            // alert(progress.receivedBytes + " of " + progress.totalBytes + " received.");
            if(progress.receivedBytes === progress.totalBytes)
            alert("下载资源完成")
        });
       }).catch((error) => {
           alert(error);
       });
   }


  

// styles这里就不写出来
render() {
   return this.props.children
 }  }
AppWrapper = CodePush(codePushOptions)(AppWrapper)

export default AppWrapper
