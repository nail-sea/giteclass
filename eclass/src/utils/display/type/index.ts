export interface ChooseImageOptions {
  count?: number
  maxWidth?: number
  maxHeight?: number
  success?(result: ChooseImageResult): void
  fail?(): void
  complete?(): void
}
export interface TempFile {
  size: number
  path: string
  width?: number
  height?: number
  mime?: string
}
export interface ChooseImageResult {
  tempFilePaths: string[]
  tempFiles: TempFile[]
}

export interface ActionSheetOptionItem{
  label:string
  icon?: number | string
  onPress?(): void
}

export interface ActionSheetOptions{
  options:ActionSheetOptionItem[]
  cancelIndex:number
}

export interface ShareConfig {
  title: string
  thumbImage: string
  type:'news'|'text'|'imageUrl'|'imageFile'|'imageResource'|'video'|'audio'|'file'
  description: string
  link: string
}