import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import {DqInput, FormInput} from "@/components";
import IconFont from "@/components/iconfont";
import "./index.scss";

class LRPassword extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      isPass: true
    };
  }
  static defaultProps = {
    password: "",
    errorType: "",
    isShowTips: false,
    isCheck: true,
    tips: "",
    placeholder: "请输入密码",
    onInput: () => {},
    onChangeError: () => {},
    onFormatPassword: () => {}
  };

  check = val => {
    if (val.length > 0) {
      this.props.onFormatPassword(false);
    } else if (val == "") {
      this.props.onFormatPassword(true);
    }
  }

  componentDidMount() {
    this.check(this.props.password)
  }

  handleInput = value => {
    const val = value.replace(/\s*/g, "");
    this.props.onChangeError("");
    this.props.onInput(val);
    this.check(val)
    // if (val.length > 0) {
    //   this.props.onFormatPassword(false);
    // } else if (val == "") {
    //   this.props.onFormatPassword(true);
    // }
  };

  handleBlur = e => {
    if (this.props.isCheck) {
      const value = e.detail.value.replace(/\s*/g, "");
      if (value.length > 0) {
        this.props.onChangeError("");
      } else if (value == "") {
        this.props.onChangeError("密码不能为空");
      }
    }
  };

  handleClear = () => {
    this.props.onFormatPassword(true);
  };

  handleChangePass = () => {
    const isPass = this.state.isPass ? false : true;
    this.setState({ isPass: isPass });
  };

  render() {
    const base_class = "login-register-password";
    const { isPass } = this.state;
    const { password, isShowTips, errorType, tips, placeholder } = this.props;
    const error_class = errorType == "" ? "" : "--error";
    const tip = isShowTips ? tips : "";
    return (
      <View className={`${base_class}`}>
        <View className={`${base_class}__input`}>
          <FormInput
            placeholder={placeholder}
            password={isPass}
            value={password}
            maxLength={12}
            styleType="-style2"
            onInput={this.handleInput.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            onClear={this.handleClear.bind(this)}
          />
          <View
            className={`${base_class}__input__code`}
            onClick={this.handleChangePass.bind(this)}
          >
            {
              isPass ? <IconFont name="icon_kechakan" color={"#D1D1D1"} size={40} /> :
              <IconFont name="icon_liulan" color={"#D1D1D1"} size={40} />
            }
            
          </View>
        </View>
        <Text className={`${base_class}__tips${error_class}`}>
          {errorType ? errorType : tip}
        </Text>
      </View>
    );
  }
}
export default LRPassword;