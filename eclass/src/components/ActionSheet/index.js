import Taro, { Component, PureComponent } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { DqModal } from "@/components";
import "./index.scss";

export default class ActionSheet extends PureComponent {
  render() {
    const { children, maxHeight, onMaskClick, show, containerStyle } = this.props;
    return (
      <DqModal
        show={show}
        containerStyle={{ justifyContent: "flex-end" }}
        onMaskClick={onMaskClick}
      >
        
        <View className="action-sheet" style={Object.assign({},{ maxHeight },containerStyle)}>
          {children}
        </View>
      </DqModal>
    );
  }
}

ActionSheet.defaultProps = {
  maxHeight: 300
};
