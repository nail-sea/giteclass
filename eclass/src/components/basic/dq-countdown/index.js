import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class DqCountdown extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      time: 0
    }
  }

  static defaultProps = {
    day: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isShowDay: false,
    isShowHours: false,
    isShowMinutes: false,
    isShowSeconds: true,
    format: { day: '天', hours: ':', minutes: ':', seconds: 's' },
    type: 1,
    timeType: '',
    onTimeChange: () => {},
  }

  handleInput = (e) => {
    this.props.onInput(e.detail.value)
  }

  countdown () {
    this.setState(prevState => ({
      time: prevState.time - 1
    }),() => {
      const t = this.state.time
      this.props.onTimeChange(t)
      if (t <= 0) {
        clearInterval(this.timerID)
        this.props.onTimeEnd()
      }
    })
  }

  componentDidMount () {
    const time = this.props.day * 24 * 60 * 60 + this.props.hours * 60 * 60 + this.props.minutes * 60 + this.props.seconds
    this.setState({time: time}, () => {
      this.timerID = setInterval(
        () => this.countdown(), 1000
      )
    })
  }

  componentWillUnmount () {
    clearInterval(this.timerID)
  }


  render () {
    // 2*24*60*60+5*60*60+30*60+20            192620
    const { day, hours, minutes, seconds, isShowDay, isShowHours, isShowMinutes, isShowSeconds, format, type, timeType , textStyle } = this.props
    const { time } = this.state
    let d = Math.floor(time/60/60/24)
    let h = Math.floor((time - d*24*60*60)/60/60)
    let m = Math.floor((time - d*24*60*60 - h*60*60)/60)
    let s = time - d*24*60*60 - h*60*60 - m*60
    if (timeType == 'seconds'){
      s = time
    }
    return (
      <Text className='dq-countdown'>
        {isShowDay && <Text style={textStyle}>{ d }{format.day}</Text>}
        {isShowHours && <Text style={textStyle}>{ h }{format.hours}</Text>}
        {isShowMinutes && <Text style={textStyle}>{ m }{format.minutes}</Text>}
        {isShowSeconds && <Text style={textStyle}>{ s }{format.seconds}</Text>}
      </Text>
    )
  }
}
