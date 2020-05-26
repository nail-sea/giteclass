import Taro, { useState, useEffect } from '@tarojs/taro'
import { Image } from '@tarojs/components'
import PropTypes from 'prop-types'
import { createQrCodeImg } from 'wx-base64-qrcode'

const QRCode = ({text, size, scale, typeNumber, errorCorrectLevel})=>{
    const [image, setImage] = useState('')

    useEffect(()=>{
        if(text){
            const options = { errorCorrectLevel, typeNumber, size: size*scale}
            var gif = createQrCodeImg(text, options)
            console.log("gif",gif);

            let image1 = new window.Image()
            image1.src = gif
            image1.onload = function (e) {
              let imageWidth = image1.width,
                imageHeight = image1.height
                let canvas = document.createElement('canvas'),
                    context = canvas.getContext('2d')
                canvas.width = imageWidth
                canvas.height = imageHeight
                context.drawImage(image1, 0, 0, imageWidth, imageHeight)
                canvas.toBlob(blob => {
                    let a = new FileReader();
                    a.onload = function (e) { setImage(e.target.result) }
                    a.readAsDataURL(blob);
                    // let path = URL.createObjectURL(blob)
                    // console.log("path",path);
                }, 'image/png')
            }
        }else{
            setImage('')
        }
    },[text, scale, size, errorCorrectLevel, typeNumber])

    const style = { width:size+'px', height:size+'px'}
    console.log("image",image);


   
    return <Image style={style} src={image} />
}

QRCode.defaultProps = {
    text: '',
    size: 100,
    scale: 4,
    errorCorrectLevel: 'M',
    typeNumber: 2,
}
  
QRCode.propTypes = {
    size: PropTypes.number,
    scale: PropTypes.number,
    text: PropTypes.string,
    errorCorrectLevel: PropTypes.string,
    typeNumber: PropTypes.number,
}

export default QRCode

