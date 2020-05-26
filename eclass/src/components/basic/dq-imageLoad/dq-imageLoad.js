import Taro, { PureComponent } from '@tarojs/taro'
import { Block, View, Image, Button } from '@tarojs/components'
import ImgLoader from './img-loader'

export default class LoadImage extends PureComponent {
  state = {
    msg: '',
    imgUrl: '',
    imgLoadList: [],
    size:0
  }

  componentWillMount() {
    if(process.env.TARO_ENV === "rn"){
      return;
    }

    const { url } = this.props
    let arr = []
    if (url instanceof Array && url.length > 0) {
      for(let key in url){
        const path = ImgLoader.Instance().getUrl(url[key].url)
        if(path && path.length > 0){
          arr.push(url[key])
        }
      }
    }else{
      const path = ImgLoader.Instance().getUrl(url.url)
      if(path && path.length > 0){
        arr.push(url)
      }
    }

    if(arr.length >0){
      this.setState({
        imgLoadList : arr
      })
    }else{
      this.props.onLoad && this.props.onLoad(src,params)
    }
  }
  componentDidMount() {
    if(process.env.TARO_ENV === "rn"){
      this.imgLoaderError()
    }
  }

  imgLoader = (params,ev)=>{
    let src = process.env.TARO_ENV === 'web' ? ev.currentTarget.src : ev.currentTarget.dataset.src
    
    this.setState(prevState => ({
      size:prevState.size+1
    }))

    ImgLoader.Instance().saveUrl(src);
    

    if(this.state.imgLoadList.length <= (this.state.size +1)){
      this.setState(prevState => ({
        imgLoadList:[]
      }))
    }

    this.props.onLoad && this.props.onLoad(src,params)
  }
  imgLoaderError = ()=>{
    this.props.onError && this.props.onError()
  }

  render() {
    const { imgLoadList } = this.state
    return (
      <Block>
         {process.env.TARO_ENV !== "rn" && imgLoadList.map((item, index) => {
          return (
            <Image
              key={'image-load-'+index}
              src={item.url}
              data-src={item.url}
              onLoad={this.imgLoader.bind(this,item.params)}
              onError={this.imgLoaderError.bind(this,item.params)}
              style='width:0;height:0;opacity:0'
            />
            )
        })}
      </Block>
    )
  }
}