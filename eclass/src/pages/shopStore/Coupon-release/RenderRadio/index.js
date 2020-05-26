import { View, Text } from "@tarojs/components";
import IconFont from "@/components/iconfont";
import '../index.scss';
function RenderRadio({ num, children }) {
  return (
    <View className="Form-view__content-flex">
      <View className="Form-view__content-flex__view">
        <IconFont
          name="icon_choose"
          color={num > 0 ? "#bbb" : "#F87C6A"}
          size={30}
        />
        <Text className="Form-view__content-flex__text__txt">不限</Text>
      </View>
      <View className="Form-view__content-flex__text">{children}</View>
    </View>
  );
}

export default RenderRadio;
