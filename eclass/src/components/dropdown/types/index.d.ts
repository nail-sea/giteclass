export interface DropDownData {
	label: string
	value: any
	multiple?: boolean
	defaultValue?: any
	mode?: 'tag' | 'list'
	children?: DropDownData[]
}
export type DropDownResult = object
