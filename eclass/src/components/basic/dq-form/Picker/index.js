import Taro, { Component, useContext } from "@tarojs/taro";
import { View, Text, Picker } from "@tarojs/components";
import FormContext from "../context";
import "../index.scss";
import * as utils from "../utils";

const BASE = "dq-form";
const PICKER = "dq-form__picker";
export default class FormPicker extends Component {
  static contextType = FormContext
  static defaultProps = {
    col: 1,
    value: [],
    defaultValue: [],
    range: [],
    multiple: false,
    defaultLabel: '请选择',
    onChange: () => { },
    onCancel: () => { }
  }
  static options = {
    addGlobalClass: true
  }

  state = { taroRange: [],taroValue:[0] };

  componentDidMount() {
    this._initTaroRange()
    this._initValue()
  }

  componentWillReceiveProps(nextProps) {
    if (
      !utils.isEqual(this.props.range, nextProps.range) 
      // || !utils.isEqual(this.props.value, nextProps.value)
    ) {
      const taroValue = this._getTaroValue(
        nextProps.range,
        nextProps.col,
        utils.isNil(nextProps.value) ? nextProps.defaultValue : nextProps.value
      );
      const taroRange = this._getTaroRange(
        nextProps.range,
        nextProps.col,
        taroValue
      );
      this.setState({ taroRange });
      this._initValue(nextProps)
    }
  }

  _initTaroRange = () => {
    const { range, col } = this.props
    const trueValue = this._getValue()
    const taroValue = this._getTaroValue(range, col, trueValue)
    const taroRange = this._getTaroRange(range, col, taroValue)
    this.setState({ taroRange })
  }

  _initValue = (props = this.props) => {
    const { onChange, name, defaultValue } = props;
    const trueValue = this._getValue(props)
    let _value = !utils.isNil(trueValue)
    ? trueValue
    : !utils.isNil(defaultValue)
    ? defaultValue
    : null;
    if (!utils.isNil(_value) && _value !== trueValue) {
      if (this.context && this.context.dispatch && name) {
        this.context.dispatch({
          type: "change",
          payload: { name, value: _value }
        });
      }
      onChange && onChange(_value);
    }
  }

  _getTaroValue(range, col, value) {
    return this.props.multiple
      ? utils.valuesToTaroValues(range, col, value)
      : utils.valueToTaroValue(range, value);
  }

  _getTaroRange(range, col, taroValue) {
    return this.props.multiple
      ? utils.taroValuesToTaroRange(range, col, taroValue)
      : range;
  }

  _onChange = ({ detail: { value: taroValue } }) => {
    const { multiple, range, onChange, name } = this.props;
    const items = multiple
      ? utils.taroValuesToItems(range, taroValue)
      : utils.taroValueToItem(range, taroValue);
    const newValue = multiple ? items.map(({ value }) => value) : items.value;
    if (this.context && this.context.dispatch && name) {
      this.context.dispatch({
        type: "change",
        payload: { name, value: newValue }
      });
    }
    onChange && onChange(newValue);
  };

  _onColumnChange = ({ detail: { value, column } }) => {
    const { range, col } = this.props;
    const {taroValue} = this.state
    taroValue[column] = value;
    const taroRange = this._getTaroRange(range, col, taroValue);
    this.setState({ taroRange, taroValue });
  };

  _getValue = (props = this.props) => {
    const { value, name } = props;
    let trueValue = value;
    if (this.context && this.context.state && name) {
      trueValue = this.context.state[name];
    }
    return trueValue;
  };

  _getValueClassName = () => {
    const trueValue = this._getValue();
    return utils.isNil(trueValue)
      ? `${BASE} ${PICKER}__content__text ${PICKER}__content__text--default`
      : `${BASE} ${PICKER}__content__text`;
  };

  _getValueLabel = () => {
    const { defaultLabel, multiple, range } = this.props;
    const trueValue = this._getValue();
    return utils.isNil(trueValue)
      ? defaultLabel
      : multiple
        ? utils.valuesToLabels(range, trueValue).join("; ")
        : utils.valueToLabel(range, trueValue);
  };

  render() {
    const {
      name,
      onCancel,
      disabled,
      multiple,
      range,
      col,
      value,
      defaultValue
    } = this.props;
    const mode = multiple ? "multiSelector" : "selector";
    const { taroRange } = this.state;
    const trueValue = this._getValue();
    const taroValue = this._getTaroValue(range, col, trueValue);
    return (
      <View className={`${BASE} ${PICKER}-container`}>
        <Picker
          name={name}
          mode={mode}
          range={taroRange}
          rangeKey="label"
          value={taroValue}
          onCancel={onCancel}
          disabled={disabled}
          onColumnChange={this._onColumnChange}
          onChange={this._onChange}
        >
          <View className={`${BASE} ${PICKER}__content`}>
            <Text className={this._getValueClassName()}>
              {this._getValueLabel()}
            </Text>
          </View>
        </Picker>
      </View>
    );
  }
}
