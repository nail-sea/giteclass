import Taro, { Component, Children, PureComponent } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import IconFont from "@/components/iconfont";
import Notice from "./Notice";

import "./index.scss";

const NAME = "dq-form-continer";

// export class FormItem extends Component {
// 	state = {
// 		isChecked: false
// 	}

// 	static defaultProps = {}

// 	setIsChecked = () => {
// 		this.setState({ isChecked: !this.state.isChecked }, () => {
// 			this.props.onHandleChange(this.state.isChecked)
// 		})
// 	}

// 	renderNotice() {
// 		const { isChecked } = this.state
// 		return (
// 			<View className={`${NAME}__clause`}>
// 				<View>
// 					<Text>发布条款</Text>
// 				</View>
// 				<View className={`${NAME}__clause__check`}>
// 					<View
// 						className={`${NAME}__clause__check__view`}
// 						onClick={this.setIsChecked}
// 					>
// 						<IconFont
// 							name="duihao_selected"
// 							color={isChecked ? '#F87C6A' : '#bbb'}
// 							size={40}
// 						/>
// 						<Text className={`${NAME}__clause__check__view__txt`}>已阅读，并同意</Text>
// 					</View>
// 					<Text
// 						className={`${NAME}__clause__btn`}
// 						onClick={() => {
// 							Dq.navigateTo({
// 								url: '/pages/release/notice/index'
// 							})
// 						}}
// 					>
// 						【发布须知】
// 					</Text>
// 				</View>
// 			</View>
// 		)
// 	}

// 	render() {
// 		const {
// 			label,
// 			wideUnfixed,
// 			describe,
// 			children,
// 			notice,
// 			valid,
// 			error
// 		} = this.props
// 		return !notice ? (
// 			<View
// 				className={!describe ? `${NAME}__item` : `${NAME}__item__top-block`}
// 			>
// 				<Text
// 					className={
// 						wideUnfixed ? `${NAME}__item__label-wide` : `${NAME}__item__label`
// 					}
// 				>
// 					{label}
// 				</Text>
// 				{describe && (
// 					<Text className={`${NAME}__item__label__top-block`}>{describe}</Text>
// 				)}
// 				<View className={`${NAME}__item__content`}>{children}</View>
// 			</View>
// 		) : (
// 			this.renderNotice()
// 		)
// 		/* {!valid && <Text className={`${NAME}__item__error`}>{error}</Text>} */
// 	}
// }

class FormItemR extends PureComponent {
  static defaultProps = {
    type: "default", //default , notice,
    top: false,
    block: false,
    row: false,
    childType: "input", //input, textarea, img, picker
    describe: null,
    label: "",
    justify: "" //start, end, between
  };

  getItemClassName = () => {
    const { top, block, childType } = this.props;
    const base = "dq-form-continer__item";
    if (childType === "textarea") return `${base}__top ${base}__top-textarea`;
    if (top) {
      if (block) return `${base}__top-block`;
      return `${base}__top`;
    }
    return base;
  };

  getLabelClassName = () => {
    const { top, block } = this.props;
    const labelBase = "dq-form-continer__item__label";
    if (top && block) return `${labelBase}__top-block`;
    return labelBase;
  };

  getContentClassName = () => {
    const { childType, row, justify } = this.props;
    const contentBase = "dq-form-continer__item__content";
    if (childType === "img") return `${contentBase} ${contentBase}-img`;
    if (row) return `${contentBase}-flex dq-form-continer-justify--${justify}`;
    return contentBase;
  };

  renderContent = () => {
    const { row, children } = this.props;
    if (row) {
      const children_node = Array.from(children);

      return (
        <View className={this.getContentClassName()}>
          {children_node.map((child, index) => (
            <View key={'form-item-'+index} className="dq-continer__item__content-flex__text">
              {child}
            </View>
          ))}
        </View>
      );
    }
    return <View className={this.getContentClassName()}>{children}</View>;
  };

  renderLabel = () => {
    const { label } = this.props;
    return <Text className={this.getLabelClassName()}>{label}</Text>;
  };

  renderDescribe = () => {
    const { describe } = this.props;
    return (
      describe && <Text className={this.getLabelClassName()}>{describe}</Text>
    );
  };

  render() {
    const { type, accept, onAcceptChange } = this.props;
    if (type === "notice")
      return <Notice accept={accept} onAcceptChange={onAcceptChange} />;
    return (
      <View className={this.getItemClassName()}>
        {this.renderLabel()}
        {this.renderDescribe()}
        {this.renderContent()}
      </View>
    );
  }
}
export default FormItemR;
