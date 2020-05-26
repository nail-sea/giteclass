import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text, Checkbox, Label, CheckboxGroup } from "@tarojs/components";
import iconClose from "@/assets/icon/clear.png";
import "./index.scss";

export default class DqCheckbox extends PureComponent {
  static defaultProps = {
    checkList: []
  };

  handleChange = e => {
    this.props.onChange(e.detail.value);
  };

  render() {
    const { checkList, disabled } = this.props;
    return (
      <View className="dq-checkbox" onChange={this.handleChange}>
        <CheckboxGroup className="dq-checkbox__content">
          {checkList.map((item, i) => {
            return (
              <Label className={"dq-checkbox__content__label"} for={i} key={i}>
                <Checkbox
                  disabled={disabled}
                  className={
                    item.checked
                      ? `${process.env.TARO_ENV}-dq-checkbox__content__checkbox--active`
                      : `${process.env.TARO_ENV}-dq-checkbox__content__checkbox`
                  }
                  value={item.value}
                  checked={item.checked}
                ></Checkbox>
                <Text>{item.text}</Text>
              </Label>
            );
          })}
        </CheckboxGroup>
      </View>
    );
  }
}
