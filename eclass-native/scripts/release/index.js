#!/usr/bin/env node

const inquirer = require('inquirer')
const { exec } = require('child_process')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')

const NOTE_ALL_RIGHT = chalk.green('[✓] ')
const NOTE_VALID = chalk.yellow('[!] ')
const NOTE_INVALID = chalk.red('[✗] ')

const titleChalk = chalk.hex('#aaa')

inquirer
	.prompt([
		{
			type: 'list',
			name: 'platform',
			message: '选择打包的平台',
			choices: [ 'Android', 'iOS' ],
			default: 'Android'
		},
		{
			type: 'list',
			name: 'deployment',
			message: '选择对应的部署方式',
			choices: [ 'Staging', 'Production' ],
			default: 'Staging'
		}
	])
	.then(({ platform, deployment }) => {
		if (platform === 'iOS') {
			const spinner = ora('正在打包bundle...').start()
			exec('yarn polyfill && react-native bundle --entry-file rn_temp/index.js --bundle-output ./ios/bundle/main.jsbundle --platform ios --assets-dest ./ios/bundle --dev false', (err, stdout, stderr) => {
				if (err) {
					spinner.fail('打包bundle失败')
					console.log(`${NOTE_INVALID}退出码：${err.code}`)
					console.log(`${NOTE_INVALID}错误信息：\n${err.message}`)
					console.log(`${NOTE_INVALID}错误堆栈：\n${err.stack}`)
				} else {
					spinner.succeed('打包bundle成功')
					console.log(`${NOTE_ALL_RIGHT}打包完成，请前往XCode进行Archive`)
				}
			})
		} else {
			const releaseCommand =
				deployment === 'Production'
					? 'assembleRelease'
					: 'assembleReleaseStaging'
			const baseReleasePath = path.join(
				__dirname,
				'../../android/app/build/outputs'
			)
			const releasePath =
				deployment === 'Production'
					? path.join(baseReleasePath, './release/app-release.apk')
					: path.join(
							baseReleasePath,
							'./releaseStaging/app-releaseStaging.apk'
						)
			const spinner = ora('开始build Android APK...').start()
			exec(
				`yarn polyfill && cd ./android && ./gradlew ${releaseCommand}`,
				(err, stdout, stderr) => {
					if (err) {
						spinner.fail('打包失败')
						console.log(`${NOTE_INVALID}退出码：${err.code}`)
						console.log(`${NOTE_INVALID}错误信息：\n${err.message}`)
						console.log(`${NOTE_INVALID}错误堆栈：\n${err.stack}`)
					} else {
						spinner.succeed('打包成功')
						console.log(`${NOTE_ALL_RIGHT}打包完成，保存路径:${releasePath}`)
					}
				}
			)
		}
	})
