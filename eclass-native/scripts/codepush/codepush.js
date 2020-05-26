#!/usr/bin/env node

const inquirer = require('inquirer')
const { exec } = require('child_process')
const defaultConfig = require('../../package.json')
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
			message: '请选择本次推送对应的平台类型：',
			choices: [ 'Android', 'iOS' ],
			default: 'Android'
		},
		{
			type: 'input',
			name: 'targetBinaryVersion',
			message: '请输入接受本次更新的目标版本号：',
			default: defaultConfig.version
		},
		{
			type: 'list',
			name: 'deployment',
			message: '请选择本次推送对应的部署方式：',
			choices: [ 'Staging', 'Production' ],
			default: 'Staging'
		},
		{
			type: 'input',
			name: 'description',
			message: '请输入本次更新的说明'
		},
		{
			type: 'list',
			name: 'mandatory',
			message: '是否强制更新？',
			choices: [ 'Yes', 'No' ],
			default: 'No'
		},
		{
			type: 'input',
			name: 'rollout',
			message: '本次推送范围（1-100）',
			default: '100'
		}
	])
	.then((answers) => {
		const {
			description,
			mandatory,
			rollout,
			deployment,
			targetBinaryVersion,
			platform
		} = answers
		const polyfillCommand = 'node scripts/polyfill && node scripts/codepush'
    const mandatoryCommand = mandatory === 'Yes' ? '-m' : ''
    const spinner = ora('正在推送...').start()
		exec(
			`${polyfillCommand} && appcenter codepush release-react -a yefeng-edouqu.com/eClass-${platform} -e rn_temp/index.js -d ${deployment} -t "${targetBinaryVersion}" -r ${rollout} ${mandatoryCommand} --description "${description}"`,
			(err, stdout, stderr) => {
        if (err) {
          spinner.fail('推送失败')
          console.log(`${NOTE_INVALID}退出码： ${err.code}`)
          console.log(`${NOTE_INVALID}错误信息：\n${err.message}`)
          console.log(`${NOTE_INVALID}错误栈：\n${err.stack}`)
				} else {
          spinner.succeed('推送成功')
          console.log(`${NOTE_ALL_RIGHT}推送完成，可以输入 ${titleChalk(`code-push deployment history eClass-${platform} ${deployment}`)} 查看发布信息`)
        }
			}
		)
	})
