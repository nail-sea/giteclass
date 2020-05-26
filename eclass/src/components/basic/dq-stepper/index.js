import Taro, { PureComponent } from "@tarojs/taro";
import { View, Input } from "@tarojs/components";
import Tips from "@/utils/tips";
import "./index.scss";
import IconFont from "@/components/iconfont";

export default class DqStepper extends PureComponent {
  static defaultProps = {
    num: 0,
    remainNum: 0
  };

  state = {
    stepValue: 0
  };

  async componentDidMount() {
    await this.setState({
      stepValue: this.props.num
    });
  }

  handleMinus = async () => {
    const { onHandleGetNum } = this.props;
    let stepValue = this.state.stepValue;
    if (stepValue <= 1) {
      Tips.toast("最低购买1张");
      return;
    }
    stepValue--;

    await this.setState({
      stepValue
    });

    onHandleGetNum(stepValue);
  };

  handleManual = async e => {
    const { value } = e.detail;
    const { remainNum } = this.props;
    
    if (parseInt(remainNum) < parseInt(value)) {
      // this.setState({
      //   stepValue: remainNum
      // });
      this.setState({
        stepValue: this.state.stepValue
      });
      Tips.toast(`库存不够，仅剩余${remainNum}张`);
      return;
    }
    await this.setState({
      stepValue: value
    });
    this.props.onHandleGetNum(value);
  };

  handlePlus = async () => {
    const { onHandleGetNum, remainNum } = this.props;
    let stepValue = this.state.stepValue;
    if (parseInt(remainNum) <= parseInt(stepValue)) {
      Tips.toast(`库存不够，仅剩余${remainNum}张`);
      return;
    }
    stepValue++;

    await this.setState({
      stepValue: stepValue
    });

    onHandleGetNum(stepValue);
  };

  render() {
    const { num, remainNum } = this.props;
    const { stepValue } = this.state;
    return (
      <View className="stepper">
        <View onClick={this.handleMinus} className="stepper__minus">
          <IconFont
            name="icon_jian"
            size={40}
            color={num <= 1 ? "#C8C8C8" : "#F87C6A"}
          />
        </View>
        <Input
          className="stepper__text"
          type="number"
          onInput={this.handleManual}
          // value={stepValue}
          value={Number(num) >= remainNum ? remainNum : num}
          disabled={remainNum > 0 ? false : true}
        />
        <View className="stepper__plus" onClick={this.handlePlus}>
          <IconFont name="icon_jia" size={40} />
        </View>
      </View>
    );
  }
}
