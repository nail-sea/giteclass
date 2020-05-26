import Taro, { Component, PureComponent } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import IconFont from "@/components/iconfont";
import "./index.scss";
import { STATIC_ASSETS } from "../../config";

export default class Noticebar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      width: 0,
      initLeft: 0,
      time: 0,
      timeTime: 3000
    };
  }

  static defaultProps = {
    isMove: true,
    isMarquee: true,
    speed: 30,
    list: ["免责声明:本平台不对任何人提供任何形式担保!"]
  };

  noticeAnimation() {
    if (this.props.list.length > 0) {
      const time = this.state.width / (this.props.speed || 30);
      const left = -this.state.width;
      this.setState(
        {
          time: time,
          left: left
        },
        () => {
          this.timerNotice = setTimeout(() => {
            this.setState(
              {
                time: 0,
                left: this.state.initLeft
              },
              () => {
                clearTimeout(this.timerNotice);
                setTimeout(() => {
                  this.noticeAnimation();
                }, 100);
              }
            );
          }, this.state.timeTime * 1000);
        }
      );
    }
  }

  // componentDidShow() { console.log('d--------------------------') }

  componentDidMount() {
    // console.log('a----------------------------------')
    if (this.props.isMove == false) {
      return;
    }
    setTimeout(() => {
      this.setWidth(this.refs.noticeBarContiner).then(w1 => {
        this.setWidth(this.refs.noticeBarContent).then(w2 => {
          this.setState(
            {
              initLeft: w1,
              left: w1,
              time: 0,
              width: w2,
              timeTime: w2 / (this.props.speed || 30)
            },
            () => {
              setTimeout(() => {
                this.noticeAnimation();
              }, 100);
            }
          );
        });
      });
    }, 500);
  }

  componentWillUnmount() {
    clearTimeout(this.timerNotice);
  }

  setWidth(obj, type) {
    return new Promise((resolve, reject) => {
      let width = 0;
      if (process.env.TARO_ENV === "weapp") {
        let that = this;
        obj
          .fields(
            {
              id: false, //是否返回节点id
              rect: true, //是否返回节点布局位置
              dataset: true, //返回数据集
              size: true, //返回宽高
              scrollOffset: true, //返回 scrollLeft,scrollTop
              properties: ["scrollX", "scrollY"] //监听属性名
            },
            function(res) {
              resolve(res.width);
            }
          )
          .exec();
      } else if (process.env.TARO_ENV === "h5") {
        if(obj && obj.vnode)resolve(obj.vnode.dom.offsetWidth);
      }
    });
  }

  handleLink = () => {
    // Dq.navigateTo({
    //   url: '/pages/notice/notice'
    // })
  };

  render() {
    const { isMarquee, speed, list, bg } = this.props;
    if(list.length <= 0){
      list.push("免责声明:本平台不对任何人提供任何形式担保!")
    }
    let style;
    if (bg) {
      style = {
        backgroundColor: bg,
        paddingBottom: "15px",
        marginBottom: 0
      };
    }

    return (
      <View className="notice-bar" onClick={this.handleLink} style={style}>
        <Image
          className="notice-bar__img"
          src={STATIC_ASSETS("images/icon/notice.png")}
        />
        <View className="notice-bar__continer" ref="noticeBarContiner">
          <View
            className="notice-bar__content"
            ref="noticeBarContent"
            style={{
              transform: "translate(" + this.state.left + "px, 0)",
              transition: "all " + this.state.time + "s linear 0s"
            }}
          >
            {list.map((item, index) => (
              <View key={'notice-bar-item-'+index} className="notice-bar__item">
                <Text className="notice-bar__item__text">{item}</Text>
              </View>
            ))}
          </View>
        </View>
        {/* <View className='notice-bar__icon'>
          <IconFont className='notice-bar__icon' name="ic_zhankai" color={'#c8c8c8'} size={50} />
        </View> */}
      </View>
    );
  }
}
