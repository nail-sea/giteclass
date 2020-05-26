const path = require('path')
const fs = require('fs')

const dirs = fs.readdirSync(path.join(__dirname, './'))
dirs.forEach((dir) => {
	const packagePath = path.join(__dirname, './', dir)
	if (fs.statSync(packagePath).isDirectory()) {
		const configs = require(path.join(packagePath, './config.json'))
		configs.forEach(({ source, package, target }) => {
			const sourcePath = path.join(packagePath, source)
			const targetPath = path.join(require.resolve(package), target)
			if (fs.statSync(targetPath).isFile() && fs.statSync(sourcePath).isFile()) {
				const sourceData = fs.readFileSync(sourcePath)
				fs.writeFileSync(targetPath, sourceData)
			}
		})
	}
})
