import React, { Component } from 'react'
import { Alert, View, Text, FlatList } from 'react-native'
import codePush from 'react-native-code-push'
import { checkUpdateOptions } from './config'

const DEBUG_MODE = false
class AppWrapper extends Component {
	constructor(props) {
		super(props)
		this.state = {
			messages: []
		}
		this.debugList = null
	}

	componentWillMount() {
		codePush.disallowRestart()
		this.checkUpdate()
		if (DEBUG_MODE) {
			console.log = console.error = (...args) => {
				const message = args.map(item => typeof item === 'object' ? JSON.stringify(item) : item).join(' ')
				this.addMessage(message)
			}
		} else {
			console.log = () => {}
		}
	}

	componentWillUnmount() {
		codePush.allowRestart()
	}

	addMessage = (message) => {
		this.setState(
			(preState) => ({
				messages: [ ...preState.messages, message ]
			}),
			() => {
				this.debugList && this.debugList.scrollToEnd()
			}
		)
	}

	codePushStatusDidChange(status) {
		switch (status) {
			case codePush.SyncStatus.CHECKING_FOR_UPDATE:
				// Alert.alert('code push', 'checking for update')
				this.addMessage('开始检查更新...')
				console.log('Checking for updates.')
				break
			case codePush.SyncStatus.DOWNLOADING_PACKAGE:
				this.addMessage('开始下载更新包...')
				console.log('Downloading package.')
				break
			case codePush.SyncStatus.INSTALLING_UPDATE:
				this.addMessage('正在安装更新...')
				console.log('Installing update.')
				break
			case codePush.SyncStatus.UP_TO_DATE:
				this.addMessage('已是最新版本')
				console.log('Up-to-date.')
				break
			case codePush.SyncStatus.UPDATE_INSTALLED:
				this.addMessage('更新已安装')
				console.log('Update installed.')
				break
			case codepush.SyncStatus.SYNC_IN_PROGRESS:
				this.addMessage('sync in progress...')
				break
			case codepush.SyncStatus.UPDATE_IGNORED:
				this.addMessage('更新被忽略')
				break
			case codepush.SyncStatus.UNKNOWN_ERROR:
				this.addMessage('更新过程中发生未知错误')
				break
		}
	}

	codePushDownloadDidProgress(progress) {
		this.addMessage(
			progress.receivedBytes + ' of ' + progress.totalBytes + ' received.'
		)
		console.log(
			progress.receivedBytes + ' of ' + progress.totalBytes + ' received.'
		)
	}

	checkUpdate() {
		codePush
			.checkForUpdate()
			.then((remotePackage) => {
				this.addMessage(`检查更新成功，远程更新包为：${JSON.stringify(remotePackage)}`)
				if (remotePackage) {
					return codePush.sync(checkUpdateOptions)
				}
			})
			.catch((err) => {
				this.addMessage(`更新发生错误，err = ${JSON.stringify(err)}`)
				console.error(err)
			})
	}

	renderItem = ({ item, index }) => (
		<Text style={{ paddingVertical: 5, fontSize: 14 }}>{item}</Text>
	)

	render() {
		if (DEBUG_MODE) {
			return (
				<View style={{ flex: 1 }}>
					{this.props.children}
					<FlatList
						style={{
							width: '100%',
							height: '50%',
							backgroundColor: 'rgba(255,255,255,.6)',
							position: 'absolute',
							zIndex: 100000,
							bottom: 0,
							left: 0,
							right: 0
						}}
						ref={(ref) => (this.debugList = ref)}
						data={this.state.messages}
						renderItem={this.renderItem}
						inverted
						pointerEvents="none"
						onStartShouldSetResponder={() =>false}
						onMoveShouldSetResponder={() =>false}
					/>
				</View>
			)
		}
		return (
				this.props.children
		)
	}
}

AppWrapper = codePush(checkUpdateOptions)(AppWrapper)

export default AppWrapper
