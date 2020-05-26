import Taro, { Component } from '@tarojs/taro'
import { View, Image, ScrollView ,Text, Icon} from '@tarojs/components'
import { connect } from "@tarojs/redux";
import { TitleBar } from "@/components";
import decorator from "@/config/decorator";
import IconFont from "@/components/iconfont";
import Tips from '@/utils/tips'
import ENUM from '@/config/enum'
import Dq from "@/config/Dq";
import "./index.scss";

@connect(({ shopStore }) => ({
  ...shopStore
}))
@decorator({ needLogin: true })
class StoreList extends Component{
    config = {
        navigationBarTitleText: '选择店铺'
    }

    state = {
        animation: '',
        startX: 0,
        startY: 0,
        currentIndex: -1,
        isEdit: false,
        currentSel: 0
    }

    componentDidMount() {
        const animation = Taro.createAnimation({
            duration:400,
            timingFunction: 'linear',
            delay: 100,
            transformOrigin: 'left top 0',
            success:(res)=>{
                // console.log(res)
            }
        })
        this.setState({
            animation
        })

        this.fetchShopList()

    }

    fetchShopList = () =>{
        const { dispatch } = this.props
        dispatch({
            type: 'shopStore/fetchChangeShopList',
            payload: {}
        }).then(res => {
            if(res && res.length > 0){
                this.setState({ currentSel: res[0].id })
            }
            
        })
    }

    setDefaultShopSel = (shop_id) => {
        this.setState({ currentSel: shop_id })
    }

    setDefaultShop=()=>{
        const shop_id = this.state.currentSel
        const { dispatch } = this.props
        dispatch({
            type:'shopStore/setdefaultshop',
            payload:{
                shop_id
            }
        }).then(res=>{
            if(res){
                this.setState({isEdit: false})
                Tips.toast('设置成功')
                this.fetchShopList()
            }
        })
    }

    applyStore=()=>{
        Dq.navigateTo({
            url:'/pages/shopStore/apply-settled/index'
        })
    }

    editStore = () => {
        this.setState({isEdit: true})
    }

    checkShopDetail = (shop_id) => {
        this.props.dispatch({
            type:'shopStore/shopStatistics',
            payload:{
                shop_id
            }
        }).then(res=>{
            Taro.navigateBack({ delta: 1 });
        })
    }

    // touchStart(e){
    //     const { clientX, clientY } = e.changedTouches[0]
    //     this.setState({
    //         startX: clientX,
    //         startY: clientY
    //     })
    // }

    // touchMove(index,e) {
    //     const { startX, startY } = this.state //开始X,Y坐标
    //     const { clientX:touchMoveX, clientY:touchMoveY } = e.changedTouches[0] // 滑动变化的坐标
        
    //     let angle = this.angle({X: startX, Y: startY}, { X: touchMoveX, Y: touchMoveY})//滑动角度
    //     if(Math.abs(angle) > 30) return;

    //     console.log(index)
    //     let currentIndex = index

    //     let _animation = Taro.createAnimation({
    //         duration: 400,
    //         timingFunction: 'linear',
    //         delay: 100,
    //         transformOrigin: 'left top 0',
    //         success:(res)=>{
    //             console.log(res)
    //         }
    //     })
    //     if( touchMoveX > startX){ //右滑
    //         _animation.translateX(0).step()
    //     }else if(touchMoveX - startX < -10){ //左滑
    //         _animation.translateX(-80).step()
    //     }
    //     this.setState({
    //         currentIndex,
    //         animation: _animation.export()
    //     })

    // }

    // angle(start, end) {
    //     let _X = end.X - start.X,
    //     _Y = end.Y - start.Y
        
    //     return 360*Math.atan(_Y/_X)/(2*Math.PI)
    // }

    render(){
        const { changeshoplist:data } = this.props
        const { animation, currentIndex, isEdit, currentSel } = this.state
        return(
            <View >
                <TitleBar
                title='选择店铺'
                // customBack={true}
                // handleBack={this.handleBack.bind(this)}
                />
                <ScrollView className="shopstore">
                    <View className='shopstore__top'>
                        {/* <Text className="shopstore__top__default"></Text> */}
                        <Text className="shopstore__top__new" onClick={this.applyStore}>新店铺入驻</Text>
                        {!isEdit ? <Text className="shopstore__top__edit" onClick={this.editStore}>编辑</Text> : null}
                        {isEdit ? <Text className="shopstore__top__edit__complete" onClick={this.setDefaultShop}>完成</Text> : null}
                    </View>
                    <View>
                    {data && data.map((item, index)=>{
                        return(
                            <View className='shopstore__item' key={item.id}>
                                {/* <View className='shopstore__item__default'>设为默认</View> */}
                                <View 
                                    // onTouchStart={this.touchStart.bind(this)} 
                                    // onTouchEnd={this.touchMove.bind(this,index)} 
                                    // animation={index===currentIndex?animation:''}
                                    >
                                    {item.is_default == 1 ? <View className='shopstore__item__default-word'>
                                        <Text className='shopstore__item__default-word__text'>默认店铺</Text>
                                    </View> : null}
                                    <View className='shopstore__item__view' onClick={()=>this.checkShopDetail(item.id)}>
                                        <Image
                                        mode="aspectFill"
                                        className="shopstore__item__view__img"
                                        src={item.logo}
                                        />
                                        <View className="shopstore__item__view__content">
                                            <View className="shopstore__item__view__content__view">
                                                <Text className="shopstore__item__view__content__title">
                                                   {item.name}
                                                </Text>
                                                <Text 
                                                    className="shopstore__item__view__content__default">
                                                   {ENUM.AUDITSTATUS[item.audit_status]}
                                                </Text>
                                            </View>
                                           <View className="shopstore__item__view__content__address">
                                                <IconFont name="icon_dingwei" size={36} />
                                                <Text className="shopstore__item__view__content__text">{item.address&&item.address.split(',').join('')}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    {isEdit ? <View  className='shopstore__item__bottom'
                                        onClick={()=>this.setDefaultShopSel(item.id)}
                                    >
                                        <IconFont name='duihao_selected' color={item.id == currentSel ? "#F87C6A" : "#bbb"} size='34'/>
                                        <Text className='shopstore__item__bottom__text' 
                                            style={{color:item.id == currentSel ? '#FF693E' : '#424242'}}
                                            >设为默认</Text>
                                    </View> : null}
                                      
                                </View>
                            </View>
                        )
                    })}
                    </View>
                </ScrollView>
                
            </View>
        )
    }

}

export default StoreList;