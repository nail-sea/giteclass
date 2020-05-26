export function isNil(value) {
	if (typeof value === 'number') return false
	return !value || Object.keys(value).length === 0
}
export function notEmail(value) {
	return !/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
		value
	)
}
export function notPhone(value) {
	return !/^[1]([3-9])[0-9]{9}$/.test(value)
}
export function validate(rules, value, name) {
	const defaultMsg = `${name} 不正确`
	for (let index = 0; index < rules.length; index++) {
		const rule = rules[index]
		if (
			(rule.required && isNil(value)) ||
			(rule.type === 'email' && notEmail(value)) ||
			(rule.type === 'phone' && notPhone(value)) ||
			(typeof rule.rule === 'function' && !rule.rule(value))
		) {
			return rule.message || defaultMsg
		}
	}
	return null
}

export function taroValuesToItems(data, taroValues) {
	let items = []
	let temp = data
	for (let index = 0; index < taroValues.length; index++) {
		const valueIndex = taroValues[index] === -1 ? 0 : taroValues[index]
		items.push(temp[valueIndex] || {})
		if (temp[valueIndex] && temp[valueIndex].children) {
			temp = temp[valueIndex].children
		} else break
	}
	return items
}

export function taroValueToItem(data, taroValue) {
	taroValue = taroValue === -1 ? 0 : taroValue
	return data[taroValue] || {}
}

export function taroValuesToTaroRange(data, col, taroValues) {
	const arr = []
	let temp = data
	for (let index = 0; index < col; index++) {
		const childrenIndex = taroValues[index] === -1 ? 0 : taroValues[index]
		arr.push(temp.map(({ label, value }) => ({ label, value })))
		if (temp[childrenIndex] && temp[childrenIndex].children) {
			temp = temp[childrenIndex].children
		} else break
	}
	return arr
}

export function valuesToTaroValues(data, col, values = []) {
	let temp = data
	let taroValues = []
	if (values.length) {
		for (let index = 0; index < values.length; index++) {
			const childValue = values[index]
			const childrenIndex = temp.findIndex((item) => item.value === childValue)
			taroValues.push(childrenIndex === -1 ? 0 : childrenIndex)
			if (temp[childrenIndex] && temp[childrenIndex].children) {
				temp = temp[childrenIndex].children
			} else break
		}
	} else {
		taroValues.length = col
		taroValues.fill(0)
	}
	return taroValues
}
export function valuesToLabels(data, values = []) {
	let temp = data
	let labels = []
	for (let index = 0; index < values.length; index++) {
		const value = values[index]
		const item = temp.find((item) => item.value === value)
		labels.push(item ? item.label : '')
		if (item && item.children) {
			temp = item.children
		} else break
	}
	return labels
}

export function valueToLabel(data, value) {
	const item = data.find((item) => item.value === value)
	return item ? item.label : ''
}

export function valueToTaroValue(data, value) {
	return data.findIndex((item) => item.value === value)
}

export function initPickerValueIndexes(col) {
	return new Array(col).fill(0)
}

export function isTaroValuesEqual(taroValue_1, taroValue_2) {
	if (taroValue_1.length !== taroValue_2.length) return false
	for (let index = 0; index < taroValue_1.length; index++) {
		const value_1 = taroValue_1[index]
		const value_2 = taroValue_2[index]
		if (value_1 !== value_2) return false
	}
	return true
}

export function isEqual(obj1, obj2) {
	if (typeof obj1 !== "object" || typeof obj2 !== "object") {
		return obj1 === obj2
	}
	if (!obj1 || !obj2) {
		return obj1 === obj2
	}
	if (Object.keys(obj1).length !== Object.keys(obj2).length) return false
	return (function iterate(o1, o2) {
		for (const key in o1) {
			if (o1.hasOwnProperty(key) && o2.hasOwnProperty(key)) {
				const value1 = o1[key];
				const value2 = o2[key];
				if (value1 === value2) continue;
				if(typeof value1 === 'object' && typeof value2 === 'object'){
					return iterate(value1, value2)
				}
				if (typeof value1 === 'function' && typeof value2 === 'function' && value1.toString() === value2.toString()) continue
				return false
			} else return false
		}
		return true
	})(obj1, obj2)
}