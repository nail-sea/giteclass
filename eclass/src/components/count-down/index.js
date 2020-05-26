import Taro from "@tarojs/taro";
import { Text } from "@tarojs/components";

export default class CountDown extends Taro.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hour: 0,
      minute: 0,
      second: 0
    };
  }
  componentDidMount() {
    if (this.props.endTime) {
      this.countFun(this.props.endTime);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  countFun = time => {
    let end_time = new Date(time).getTime(),
      sys_second = end_time - new Date().getTime() / 1000;

    this.timer = setInterval(() => {
      if (sys_second > 1000) {
        sys_second -= 1;

        let hour = Math.floor((sys_second / 3600) % 24);
        let minute = Math.floor((sys_second / 60) % 60);
        let second = Math.floor(sys_second % 60);
        this.setState({
          hour: hour < 10 ? "0" + hour : hour,
          minute: minute < 10 ? "0" + minute : minute,
          second: second < 10 ? "0" + second : second
        });
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  };
  render() {
    return (
      <Text>
        {this.state.hour}:{this.state.minute}:{this.state.second}
      </Text>
    );
  }
}
