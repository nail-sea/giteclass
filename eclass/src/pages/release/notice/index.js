import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { TitleBar } from "@/components";
import "./index.scss";

export default class LoReAgreement extends Component {
  config = {
    navigationBarTitleText: "发布须知"
  };

  render() {
    return (
      <View className="notice-container">
        <TitleBar title="发布须知" />
        <View className="notice-container__view">
          <View className="notice-container__view__text">
            本平台(E网本地化信息发布平台)采用智能识别系统，如违反以下规定，管理员将审核信息后要求用户更改。用户违反以下规定又不进行更改的一切责任何费用由用户自行承担。
            违反以下规则，发布的信息将被管理人员删除，并对信息发布者进行禁言、禁止访问、删除id等相应处理。对于违规及重复内容，平台管理员有权直接屏蔽显示并不退还任何信息发布费用！
            禁止但不限于：政治、五黑类（药品、医疗器械、丰胸、减肥以及增高产品）、集赞、刷单、贷款理财、传销众筹、信用卡养卡等内容发布！
          </View>
          <View className="notice-container__view__text">
            1. 法律法规明令禁止类：
          </View>
          <View className="notice-container__view__text">
            色情、反动，颠覆国家以及其它任何违背法律法规的信息；一切包含政治话题的信息；社会敏感度较高的话题的信息。
          </View>
          <View className="notice-container__view__text">2、图片违规类：</View>
          <View className="notice-container__view__text">
            人体暴露照片及人体艺术图片；侮辱他人的图片；暴力、恐怖、血腥图片；引起人视觉反感的图片。
          </View>
          <View className="notice-container__view__text">3、虚假信息：</View>
          <View className="notice-container__view__text">
            请保证您所发布信息的真实性，不得发布虚假信息，对此类信息造成的损失本站不负任何责任,您必须对您所发布的信息负责，否则后果自负；本站在核实用户举报后将对信息和用户进行处理。
          </View>
          <View className="notice-container__view__text">4、重复信息：</View>
          <View className="notice-container__view__text">
            同样内容或相似的信息，发布多次，霸屏、占屏等，影响平台用户浏览或者发布行为。
          </View>
          <View className="notice-container__view__text">免责声明</View>
          <View className="notice-container__view__text">
            1、平台信息发布为收费发布，平台为用户提供相应的展示，信息推广和特定位置展示等价格以支付页面价格为准。平台发布的所有信息（收费、免费）平台只负责发布、展示。
          </View>
          <View className="notice-container__view__text">
            2、平台里所有信息、资料，平台管理员有责任保证其准确性、完整性、有效性、时效性，但不一定能全部准确。请依据情况自行判断。私下通过本站私信或其他网络、电话等通讯工具，寻求捐助的行为，请大家自行进行判断，若因判断失误造成的损失责任自负。本站不负任何责任。
          </View>
          <View className="notice-container__view__text">
            3、本平台如因系统维护或升级而需暂停服务时，将事先公告。若因线路及非本站控制范围内的硬件故障或其它不可抗力而导致暂停服务，于暂停服务期间造成的一切不便与损失，E网不负任何责任。
          </View>
          <View className="notice-container__view__text">
            4、会员对自己的言论和行为负责，完全承担发表内容的责任，所持立场与E网无关。平台使用者因为任何行为而触犯中华人民共和国法律或相关法规的，一切后果自己负责，平台不承担任何责任。凡以任何方式登录本站或直接、间接使用系统资料者，视为自愿接受本平台声明的约束。
          </View>
          <View className="notice-container__view__text">
            5、平台所有发布信息展示默认时间为 2 个月，2
            个月后系统有权对信息进行下线或者删除操作。
          </View>
          <View className="notice-container__view__text">
            本声明未涉及的问题参见国家有关法律法规，当本声明与国家法律法规冲突时，以国家法律法规为准。
          </View>
        </View>
      </View>
    );
  }
}
