import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, ScrollView} from "@tarojs/components";
import { TitleBar } from "@/components";
import {getPlatform} from "@/utils/common"
import "./index.scss";
import { getWindowHeight } from "@/utils/style";
import classNames from "classnames";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "E网生活隐私政策",
    disableScroll:getPlatform().isRN
  };

  render() {
    return (
      <View className="login-notice-wrap">
        <TitleBar title="E网生活隐私政策" />
        <ScrollView className="login-notice-wrap__view" scrollY style={{height:getWindowHeight(false, true)}}>
          <Text className="login-notice-wrap__view__text">
          【特别提示】请您仔细阅读我们的《E网生活隐私政策》（尤其是加粗划线的内容）并确定了解我们对您个人信息的处理规则。阅读过程中，如您有任何疑问，可及时与我们联系（联系方式以隐私政策里约定的为准）。如您不同意协议中的任何条款，您应立即停止访问E网生活。
          </Text>
          <Text className={classNames("login-notice-wrap__view__text", "login-notice-wrap__view__text-center")}>
          E网生活隐私政策
          </Text>
          <Text className="login-notice-wrap__view__text">
          引言
          </Text>
          <Text className="login-notice-wrap__view__text">《E网生活隐私政策》将帮助您了解以下内容：</Text>
          <Text className="login-notice-wrap__view__text">
          1、我们如何收集和使用您的个人信息 
          </Text>
          <Text className="login-notice-wrap__view__text">
          2、我们如何使用 Cookie 和同类技术 
          </Text>
          <Text className="login-notice-wrap__view__text">
          3、我们如何共享、转让、公开披露您的个人信息 
          </Text>
          <Text className="login-notice-wrap__view__text">
          4、我们如何保护您的个人信息
          </Text>
          <Text className="login-notice-wrap__view__text">
          5、您的权利 
          </Text>
          <Text className="login-notice-wrap__view__text">
          6、我们如何处理未成年人的个人信息
          </Text>
          <Text className="login-notice-wrap__view__text">
          7、本隐私政策如何更新
          </Text>
          <Text className="login-notice-wrap__view__text">
          8、如何联系我们 
          </Text>
          <Text className="login-notice-wrap__view__text">
          E网生活（以下亦称“我们”）深知个人信息对您的重要性，我们尊重并保护所有使用E网生活平台服务的用户的个人信息，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等。同时，我们承诺，我们将按业界成熟的安全标准，采取相应的安全保护措施来保护您的个人信息。 请在使用我们的产品（或服务）前，仔细阅读并了解本《E网生活隐私政策》（下称“本隐私政策”）。
          </Text>
          <Text className="login-notice-wrap__view__text">
          如您对本隐私政策有任何疑问或您在使用我们提供的服务时个人信息受到了侵扰，您可以发送邮件至XX咨询，我们设立了个人信息保护专职部门，将尽快给予您答复；您亦可以通过E网生活网站（www.ecome.com）首页下方的违法信息举报方式与我们及时取得联系，以便我们能够及时解决您的困惑。
          </Text>
          <Text className="login-notice-wrap__view__text">目录：</Text>
          <Text className="login-notice-wrap__view__text">
          一、我们处理个人信息的法律依据
          </Text>
          <Text className="login-notice-wrap__view__text">
          二、本隐私政策的适用范围
          </Text>
          <Text className="login-notice-wrap__view__text">
          三、我们如何收集和使用您的个人信息 
          </Text>
          <Text className="login-notice-wrap__view__text">
          四、我们如何使用 Cookie 和同类技术 
          </Text>
          <Text className="login-notice-wrap__view__text">
          五、我们如何共享、转让、公开披露您的个人信息 
          </Text>
          <Text className="login-notice-wrap__view__text">
          六、我们如何存储及保护您的个人信息 
          </Text>
          <Text className="login-notice-wrap__view__text">
          七、您管理个人信息的权利 
          </Text>
          <Text className="login-notice-wrap__view__text">
          八、我们如何处理未成年人的个人信息 
          </Text>
          <Text className="login-notice-wrap__view__text">
          九、本隐私政策的更新和通知
          </Text>
          <Text className="login-notice-wrap__view__text">
          十、如何联系我们
          </Text>
          <Text className="login-notice-wrap__view__text">
          十一、争议解决
          </Text>
          <Text className="login-notice-wrap__view__text">
          一、我们处理个人信息的法律依据
          </Text>
          <Text className="login-notice-wrap__view__text">
          本隐私政策制定的法律依据为《中华人民共和国消费者权益保护法》、《中华人民共和国网络安全法》、《中华人民共和国电子商务法》、《信息安全技术个人信息安全规范》以及其他涉及公民个人信息的相关法律法规。通常，我们会基于本隐私政策提示的功能收集您的个人信息。某些情况下，如果涉及其他信息的收集我们会单独向您出示个人信息保护说明条款。
          </Text>
          <Text className="login-notice-wrap__view__text">二、本隐私政策的适用范围</Text>
          <Text className="login-notice-wrap__view__text">
          本隐私政策适用于您使用E网生活平台（包括E网生活网站www.ecome.com、E网生活移动应用软件E网生活APP）的产品或服务时使用。E网生活平台的运营主体为北京壹网生活技术有限公司。
          </Text>
          <Text className="login-notice-wrap__view__text">
          三、我们如何收集和使用您的个人信息
          </Text>
          <Text className="login-notice-wrap__view__text">
          个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。
          </Text>
          <Text className="login-notice-wrap__view__text">
          个人敏感信息是指一旦泄露、非法提供或滥用可能危害人身和财产安全，极易导致个人名誉、身心健康受到损害或歧视性待遇等的个人信息。本隐私政策涉及到的个人敏感信息我们将加粗并加下划线的方式提示您注意阅读。在您向E网生活提供任何属于敏感信息的个人信息前，请您清楚考虑该等提供是恰当的并且同意您的个人敏感信息可按本隐私政策所述的目的和方式进行处理。我们会在得到您的同意后收集和使用您的敏感信息以实现与E网生活业务相关的功能，并允许您对这些敏感信息的收集与使用做出不同意的选择，但是拒绝使用这些信息会影响您使用相关功能。
          </Text>
          <Text className="login-notice-wrap__view__text">
          原则上，E网生活仅会出于本隐私政策所述的以下目的，收集和使用您的个人信息。E网生活是综合类的信息发布平台，所涉场景较多，如果超过以下目的收集和使用您的个人信息时我们会单独向您提示并征得您的同意。
          </Text>
          <Text className="login-notice-wrap__view__text">
          （一）帮助您成为我们的注册\登录用户
          </Text>
          <Text className="login-notice-wrap__view__text">
          1、您自行注册成为E网生活的用户
          </Text>
          <Text className="login-notice-wrap__view__text">
          您在使用E网生活提供的服务时，首先需要成为我们的注册\登录用户。当您注册E网生活账户时，您需要向我们提供您准备使用的用户名及您本人的手机号码，我们将通过发送短信验证码的方式来验证您的身份是否有效。您登录后可以继续完善您的账户信息，您可以修改补充您的昵称、所在地、家乡、职业、职位、兴趣爱好。您补充的账户信息将有助于我们为您提供个性化的服务推荐和更优的服务体验，但如果您不提供这些补充信息，不会影响您使用E网生活的基本功能。
          </Text>
          <Text className="login-notice-wrap__view__text">
          2、您通过第三方授权登录为E网生活的用户
          </Text>
          <Text className="login-notice-wrap__view__text">
          您使用第三方帐号（微信、微博、QQ）登录E网生活时，可选择授权E网生活在符合相关法律法规要求的前提下读取并获得您在该第三方平台上登记、公布、记录的公开信息（包括昵称、头像）。
          </Text>
          <Text className="login-notice-wrap__view__text">
          E网生活需要您授权从第三方获取上述信息是为了记住您作为E网生活用户的登录身份，以向您提供更优质的产品和/或服务。我们仅会在您的授权同意的范围内收集并使用您的个人信息。
          </Text>
          <Text className="login-notice-wrap__view__text">
          您提供的上述信息，将在您使用E网生活服务期间持续授权我们使用。在您注销账号时，我们将停止使用并删除上述信息。
          </Text>
          <Text className="login-notice-wrap__view__text">
          上述信息将存储于中华人民共和国境内。如需跨境传输，我们将会单独征得您的授权同意。
          </Text>
          <Text className="login-notice-wrap__view__text">
          （二）向您提供我们的产品或服务
          </Text>
          <Text className="login-notice-wrap__view__text">
          1、信息发布功能
          </Text>
          <Text className="login-notice-wrap__view__text">
          E网生活平台最主要的功能就是信息发布功能，您可以根据您的需要选择发布信息的种类（招聘、黄页、房产、二手车、二手物品）。当您使用发布功能时，我们会收集您的个人信息（信息品类不同，收集的信息不一样），包括姓名、联系方式、个人信息资料、地理位置、用户相册、邮箱、地址信息。此类信息为您自己主动填写的信息，收集是为了方便您能成功发布信息，可以更快捷的与您发布的内容进行匹配。
          </Text>
          <Text className="login-notice-wrap__view__text">
          1）您发布招聘信息时，除了提交您的拟招聘岗位的信息还需要提交您的联系方式、邮箱，以便求职者能够联系到您；您亦可以通过E网生活平台发布简历信息进行找工作； 2）您在发布即生活服务类信息时，需提供您的联系方式、地址信息，以便商家能够准确为您提供服务。3）您在发布房源信息时，需提供您的联系方式、房屋信息、价格信息、房源权属资质证明文件、实名认证信息（包括但不限于微信认证、银行卡认证、人脸认证和身份证认证等，具体以您认证时页面显示的为准），如您选择的房源图片来源与您的相册，我们用到您的相册，收集上述信息仅为了您能更清晰快捷的展示您的推广信息。4）发布二手车信息时，需要提交您的联系方式、车辆基本信息、看车地点、牌照信息。5）发布二手物品时，需要提交您的二手物品基本信息、联系方式、位置信息。
          </Text>
          <Text className="login-notice-wrap__view__text">
          2、搜索/订阅功能
          </Text>
          <Text className="login-notice-wrap__view__text">
          当使用E网生活提供的搜索功能时，我们会收集您查询的关键字信息以及您在使用E网生活服务时所浏览或要求的其他信息和内容详情。为了给您带来更便捷的搜索服务并不断完善E网生活产品和/或服务。该等关键词信息通常无法单独识别您的个人身份，不属于您的个人信息，不在本隐私政策的限制范围内。只有当您的搜索关键词信息与您的其他信息有联结并可识别您的个人身份时，则在结合使用期间，我们会将您的搜索关键词信息作为您的个人信息，与您的搜索历史记录一同按照本隐私政策对其进行处理与保护。
          </Text>
          <Text className="login-notice-wrap__view__text">
          3、身份认证服务
          </Text>
          <Text className="login-notice-wrap__view__text">
          E网生活提供身份认证服务，在对您个人信息的真实性进行审核后，会为您标记认证标识。 因此，当您申请E网生活为您进行身份认证时，我们需要收集您的姓名、身份证号、银行卡、有关身份证明的信息，以证实您的个人身份相关信息，具体验证的方式以“个人信息”—“我的认证”显示的为准，您可以根据需要自行选择认证的方式。我们还可能需要收集您的生物识别信息，用于人脸验证。例如，您提交个人认证，需要提供您的身份证信息，以便我们进行核实。
          </Text>
          <Text className="login-notice-wrap__view__text">
          4、客户服务
          </Text>
          <Text className="login-notice-wrap__view__text">
          当您向E网生活发布信息、申诉或进行咨询时，为了方便与您联系或帮助您解决问题，我们可能需要您提供姓名、手机号码、电子邮件信息。如您拒绝提供上述信息，可能部分功能无法使用，同时无法向您及时反馈申诉或咨询结果。
          </Text>
          <Text className="login-notice-wrap__view__text">
          5、定向推送
          </Text>
          <Text className="login-notice-wrap__view__text">
          我们会基于收集的信息，对您的偏好、习惯、位置作特征分析和用户画像，以便为您提供更适合的定制化服务，例如向您展现或推荐相关程度更高（而非普遍推送）的订阅信息、信息流或者广告/推广信息结果。为此，我们需要收集的信息包括您的设备信息、日志信息、浏览记录。如您不希望获得我们的定向推送服务，E网生活APP端，您可以通过“我的”-“更多”—“消息管理”中进行设置。
          </Text>
          <Text className="login-notice-wrap__view__text">
          6、营销活动
          </Text>
          <Text className="login-notice-wrap__view__text">
          我们将会不时举办线上或线下的营销活动，包括邀请用户奖励红包、赠送实体物品等活动。在此类营销活动中，我们可能需要用户提供个人信息（如手机号、邮编、地址信息），以便我们能够给用户发放奖励或寄送礼品。在涉及E网生活向您支付费用的情况下，我们可能需要收集您的身份信息（姓名、身份证号）用于代缴税款。
          </Text>
          <Text className="login-notice-wrap__view__text">
          7、支付功能
          </Text>
          <Text className="login-notice-wrap__view__text">
          您可在E网生活进行部分服务支付购买。在您使用该服务的过程中可能会需要进行支付，在支付过程中， 我们可能会收集您的第三方支付帐号(例如支付宝帐号、Apple Pay 帐号或其他形式的银行卡信息)。
          </Text>
          <Text className="login-notice-wrap__view__text">
          8、简历投递服务
          </Text>
          <Text className="login-notice-wrap__view__text">
          如您在使用E网生活招聘服务时，可以自行创建简历信息，您创建完毕简历后，可以对简历进行“隐私设置”。如果您选择向“仅我投递的招聘方” 或“仅投递企业可见”投递，则您的简历仅您投递的招聘方可见。如您选择向“所有招聘方”可见，则您授权E网生活平台上相应服务的招聘企业或人员可以通过我们的简历数据库找到您的简历。为了能够更好的为您提供求职服务，建议您如实填写简历信息，如因您自身填写的简历虚假等问题引起的任何争议，您应自行承担。我们亦会对使用简历的招聘方进行资质审核，但请您知悉，我们仅能进行形式上的审核，对于招聘企业与您线下发生的任何法律纠纷（包括但不限于招聘企业或人员错误或非法使用前述简历信息等），E网生活不承担法律责任。
          </Text>
          <Text className="login-notice-wrap__view__text">
          9、为您提供更个性化的服务
          </Text>
          <Text className="login-notice-wrap__view__text">
          1）基于位置信息的个性化推荐功能：我们会收集您的位置信息（我们仅收集您当时所处的地理位置，但不会将您各时段的位置信息进行结合以判断您的行踪轨迹）来判断您所处的地点。如房产频道，会自动为您推荐您所在区域的房源或楼盘信息。
          </Text>
          <Text className="login-notice-wrap__view__text">
          2）基于摄像头（相机）的服务功能：您可以使用这个功能完成视频拍摄、拍照、推广信息的编辑发布，或通过该功能完成推广信息的查阅。
          </Text>
          <Text className="login-notice-wrap__view__text">
          3）基于图片上传的功能：您可以在E网生活上传您的照片来实现您想要发布的推广信息的编辑发布。
          </Text>
          <Text className="login-notice-wrap__view__text">
          4）基于语音技术的附加功能：您可以直接使用麦克风来发布信息或与E网生活的其他用户进行非实时的互动。
          </Text>
          <Text className="login-notice-wrap__view__text">
          上述附加功能可能需要您在您的设备中向我们开启您的地理位置（位置信息）、相机（摄像头）、相册（图片库）、麦克风，以实现这些功能所涉及的信息的收集和使用。请您注意，您开启这些权限即代表您授权我们可以收集和使用这些个人信息来实现上述的功能，您关闭权限即代表您取消了这些授权，则我们将不再继续收集和使用您的这些个人信息，也无法为您提供上述与这些授权所对应的功能。您关闭权限的决定不会影响此前基于您的授权所进行的个人信息的处理。
          </Text>
          <Text className="login-notice-wrap__view__text">
          10、其他服务
          </Text>
          <Text className="login-notice-wrap__view__text">
          1）除上述E网生活向您提供的产品和服务外，我们还可能为了提供服务及改进服务质量的合理需要而收集您的其他信息，包括您与我们的客户服务团队联系时所提供的相关信息，您参与问卷调查时向我们发送的问卷答复信息。与此同时，为提高您使用E网生活平台提供的服务的安全性，更准确地预防钓鱼网站欺诈和木马病毒，我们可能会通过了解一些您的网络使用习惯、您常用的软件信息等手段来判断您账户的风险，并可能会记录一些我们认为有风险的URL。
          </Text>
          <Text className="login-notice-wrap__view__text">
          2）在不透露单个用户隐私资料的前提下，E网生活有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。E网生活可能会对网络服务使用情况进行统计。同时，E网生活可能会与公众分享这些统计信息，以展示我们服务的整体使用趋势。这些统计信息不包含您的任何身份识别信息。
          </Text>
          <Text className="login-notice-wrap__view__text">
          （三）征得授权同意的例外
          </Text>
          <Text className="login-notice-wrap__view__text">
          根据相关法律法规的规定，在以下情形中，我们可以在不征得您的授权同意的情况下收集、使用一些必要的个人信息：
          </Text>
          <Text className="login-notice-wrap__view__text">
          1、与国家安全、国防安全直接相关的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          2、与公共安全、公共卫生、重大公共利益直接相关的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          3、与犯罪侦查、起诉、审判和判决执行等直接相关的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          4、出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          5、所收集的个人信息是您自行向社会公众公开的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          6、从合法公开披露的信息中收集到您的个人信息，如从合法的新闻报道、政府信息公开等渠道；
          </Text>
          <Text className="login-notice-wrap__view__text">
          7、根据您的要求签订和履行合同所必需的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          8、法律法规规定的其他情形。
          </Text>
          <Text className="login-notice-wrap__view__text">
          您知悉并认可：E网生活通过广告或其他方式向您提供链接，使您可以接入第三方服务或网站。您使用该等第三方的服务时，须受该第三方的服务条款及隐私政策约束，E网生活提示您需要仔细阅读其政策。本协议仅适用于E网生活提供的服务器所收集的信息，并不适用于第三方提供的服务或第三方的信息使用的规则，E网生活对第三方使用由您自行提供的信息不承担责任。
          </Text>
          <Text className="login-notice-wrap__view__text">
          四、我们如何使用 Cookie 和同类技术 
          </Text>
          <Text className="login-notice-wrap__view__text">
          为使您获得更轻松的访问体验，您访问E网生活平台相关网站或使用E网生活平台提供的服务时，我们可能会通过小型数据文件识别您的身份，这么做是帮您省去重复输入注册信息的步骤，或者帮助判断您的账户安全。这些数据文件可能是Cookie，Flash Cookie，或您的浏览器提供的其他本地存储（统称“Cookie”）。
          </Text>
          <Text className="login-notice-wrap__view__text">
          网页上常会包含一些电子图象（称为“单像素” GIF 文件或 “网络 beacon”），使用网络beacon可以帮助网站计算浏览网页的用户或访问某些cookie，我们会通过网络beacon收集您浏览网页活动的信息，例如您访问的页面地址、您先前访问的援引页面的位址、您停留在页面的时间、您的浏览环境以及显示设定等。
          </Text>
          <Text className="login-notice-wrap__view__text">
          E网生活可能使用您在E网生活网站浏览的行为数据，根据您的兴趣喜好，在您浏览网站时有可能展现与您兴趣相关的信息或内容，这个过程包括以下几个方面：
          </Text>
          <Text className="login-notice-wrap__view__text">
          1)兴趣数据的收集：我们通过您在E网生活浏览过的内容，使用Cookie收集并保存您的行为数据。
          </Text>
          <Text className="login-notice-wrap__view__text">
          2)根据您的浏览行为数据，获取您的兴趣分类。例如您最近两天寻找北京搬家公司信息，我们会了解您的兴趣是北京的搬家公司。
          </Text>
          <Text className="login-notice-wrap__view__text">
          我们不会将上述技术收集的信息用于本隐私政策所述目的之外的任何用途。请您理解，我们的某些服务只能通过使用“Cookie”才可得到实现。如果您的浏览器或浏览器附加服务允许，您可以在相关的页面修改对Cookie的接受程度，但这一举动在某些情况下可能会影响您安全访问E网生活相关网站和使用E网生活平台提供的服务。
          </Text>
          <Text className="login-notice-wrap__view__text">
          五、我们如何共享、转让、公开披露您的个人信息 
          </Text>
          <Text className="login-notice-wrap__view__text">
          （一）共享
          </Text>
          <Text className="login-notice-wrap__view__text">
          我们不会与E网生活以外的任何公司、组织和个人分享您的个人信息，但以下情况除外：
          </Text>
          <Text className="login-notice-wrap__view__text">
          1、在获得明确同意的情况下共享：获得您的明确同意后，我们会与其他方共享您的个人信息。
          </Text>
          <Text className="login-notice-wrap__view__text">
          2、根据法律法规的规定和行政、司法机构的要求：我们可能会根据法律法规规定，或按政府主管部门的强制性要求，向上述监管部门共享您的个人信息。
          </Text>
          <Text className="login-notice-wrap__view__text">
          3、与我们的关联公司共享：您的个人信息可能会与E网生活的关联公司共享。我们只会共享必要的个人信息，且受本隐私政策中所声明目的的约束。关联公司如要改变个人信息的处理目的，将再次征求您的授权同意。
          </Text>
          <Text className="login-notice-wrap__view__text">
          关联公司指E网生活平台运营主体直接或间接控制的法人实体及其分支机构，与E网生活平台运营主体直接或间接共同受控于同一实际控制人的法人实体及其分支机构；控制、受控指：通过协议或股权控制或受控。
          </Text>
          <Text className="login-notice-wrap__view__text">
          4、与授权合作伙伴共享：仅为实现本隐私政策中声明的目的，我们的某些服务将由授权合作伙伴提供。我们可能会与合作伙伴共享您的某些个人信息，以提供更好的客户服务和用户体验。例如，您在使用我们招聘频道服务创建简历后，您主动将简历投递给招聘方时，我们必须与该招聘方共享您的简历信息才能让招聘方看到您的简历信息与您沟通面试。我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息，并且只会共享提供服务所必要的个人信息。我们的合作伙伴无权将共享的个人信息用于任何其他用途。
          </Text>
          <Text className="login-notice-wrap__view__text">
          目前，我们的授权合作伙伴包括以下2大类型：
          </Text>
          <Text className="login-notice-wrap__view__text">
          1）广告、分析服务类的授权合作伙伴。我们不会将您的个人信息与提供广告、咨询类服务商与关联公司共享，除非您主动授权我们提供。但我们可能会将经处理无法识别您的身份且接收方无法复原的信息，例如经匿名化处理的用户画像，与广告或咨询类服务商或广告主共享，以帮助其在不识别您个人的前提下，提升广告有效触达率，以及分析我们的产品和服务使用情况等。
          </Text>
          <Text className="login-notice-wrap__view__text">
          2）服务提供商和其他合作伙伴。您在使用我们的具体服务时，您自主填写的信息，我们将您填写的信息发送给您想要联系的服务提供商。例如，您在“二手车”频道，想要了解某款车型的底价时，您自主填写并提交的联系方式，我们会在您提交后，提供给您想咨询的车主或车商。
          </Text>
          <Text className="login-notice-wrap__view__text">
          对我们与之共享个人信息的公司、组织和个人，我们会与其签署严格的保密协定，要求他们按照我们的说明、本隐私政策以及其他任何相关的保密和安全措施来处理个人信息。
          </Text>
          <Text className="login-notice-wrap__view__text">
          5、以学术研究或公共利益为目的，且无害于您的重大利益；
          </Text>
          <Text className="login-notice-wrap__view__text">
          6、如您是适格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；
          </Text>
          <Text className="login-notice-wrap__view__text">
          7、只有共享您的信息，才能提供您需要的服务或处理您与他人的纠纷或争议。例如您在E网生活上创建的某一交易中，如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，E网生活会视情况向该用户提供其交易对方的联络方式等必要信息，以促成交易的完成或纠纷的解决；
          </Text>
          <Text className="login-notice-wrap__view__text">
          8、您通过点击相关产品的相应按键同意向第三方提交个人信息（包括但不限于 “帮我申请”、“帮我提交”等按键）。
          </Text>
          <Text className="login-notice-wrap__view__text">
          （二）转让
          </Text>
          <Text className="login-notice-wrap__view__text">
          我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：
          </Text>
          <Text className="login-notice-wrap__view__text">
          1、在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的个人信息；
          </Text>
          <Text className="login-notice-wrap__view__text">
          2、在涉及合并、收购或破产清算时，如涉及到个人信息转让，我们会在要求新的持有您个人信息的公司、组织继续受此隐私政策的约束，否则我们将要求该公司、组织重新向您征求授权同意。
          </Text>
          <Text className="login-notice-wrap__view__text">
          （三）公开披露
          </Text>
          <Text className="login-notice-wrap__view__text">
          我们仅会在以下情况下，公开披露您的个人信息：
          </Text>
          <Text className="login-notice-wrap__view__text">
          1、获得您明确同意后；
          </Text>
          <Text className="login-notice-wrap__view__text">
          2、基于法律的披露：在法律、法律程序、诉讼或政府主管部门强制性要求的情况下，我们可能会对上述监管部门披露您的个人信息。
          </Text>
          <Text className="login-notice-wrap__view__text">
          因此，请您谨慎考虑通过我们的服务上传、发布和交流的信息内容。在一些情况下，您可通过我们某些服务的隐私设定来控制有权浏览您共享信息的用户范围。如要求从我们的服务中删除您的相关信息，请通过本隐私政策文首处提供的联系方式操作。
          </Text>
          <Text className="login-notice-wrap__view__text">
          六、我们如何存储及保护您的个人信息 
          </Text>
          <Text className="login-notice-wrap__view__text">
          （一）信息存储
          </Text>
          <Text className="login-notice-wrap__view__text">
          E网生活收集的有关您的信息和资料将保存在E网生活及（或）其关联公司的服务器上，这些信息和资料全部储存在中国境内。目前，E网生活的产品和服务不会涉及到数据的跨境传输，如果我们的产品\服务发生变更，涉及数据的跨境传输，我们会单独向您以弹窗或邮件的方式告知您数据出境的目的、接收方等，并征得您的授权同意，我们会确保数据接收方有充足的数据保护能力来保护您的个人信息。
          </Text>
          <Text className="login-notice-wrap__view__text">
          我们仅在您使用我们的服务期间和法律法规要求的最短时限内保留您的个人信息，在仅浏览功能下所收集的个人信息如浏览记录、IP 信息，我们的存储期限不会超过1个月。对于超出期限的个人信息，我们会立即删除或做匿名化处理。
          </Text>
          <Text className="login-notice-wrap__view__text">
          （二）信息保护
          </Text>
          <Text className="login-notice-wrap__view__text">
          为保障您的信息安全，我们努力采取各种合理的物理、电子和管理方面的安全措施来保护您的信息，使您的信息不会被泄漏、毁损或者丢失，包括但不限于SSL、信息加密存储、数据中心的访问控制。
          </Text>
          <Text className="login-notice-wrap__view__text">
          1、数据加密：我们对于用户的用户名、手机号、注册邮箱、qq号进行加密存储，保证用户基本信息不会被恶意获取；
          </Text>
          <Text className="login-notice-wrap__view__text">
          2、身份鉴别：我们通过校验账号密码或者账号绑定手机验证码，进行用户身份合法性鉴别，防止非经授权的介入；
          </Text>
          <Text className="login-notice-wrap__view__text">
          3、访问控制：我们对可能接触到您的信息的员工或外包人员也采取了严格管理，包括但不限于根据岗位的不同采取不同的权限控制，与他们签署保密协议，监控他们的操作情况等措施。E网生活用户在进行身份鉴别后，才能查询并管理用户信息和资源，未经过身份鉴别，不能管理用户资源；
          </Text>
          <Text className="login-notice-wrap__view__text">
          4、安全审计：我们有时会接入风控平台或认证平台，对一些场景或行为进行监测。如通过流量分析，完成账号异常登陆、注册等异常行为的监控。
          </Text>
          <Text className="login-notice-wrap__view__text">
          E网生活会按现有技术提供相应的安全措施来保护您的信息，提供合理的安全保障，E网生活将尽力做到使您的信息不被泄漏、毁损或丢失。
          </Text>
          <Text className="login-notice-wrap__view__text">
          5、账号保护：您的账户均有安全保护功能，请妥善保管您的账户及密码信息。E网生活将通过向其它服务器备份、对用户密码进行加密等安全措施确保您的信息不丢失，不被滥用和变造。尽管有前述安全措施，但同时也请您理解，由于技术的限制以及可能存在的各种恶意手段，即便竭尽所能加强安全措施，在信息网络上也不存在“完善的安全措施”。如因您自己的原因导致账户及密码信息泄露而造成的任何法律后果需由您本人负责。
          </Text>
          <Text className="login-notice-wrap__view__text">
          在使用E网生活平台服务进行网上交易时，如您不可避免地要向交易对方或潜在的交易对方披露自己的个人信息（例如联系人、联络方式等），请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息已经被泄露或者存在被泄露的可能，且有可能会危及您注册获得的E网生活账户安全，或者给您造成其他的损失的，请您务必在第一时间根据本隐私政策提到的联系方式与我们取得联系，以便我们采取相应措施维护您的E网生活账户安全，防止损失的发生或者进一步扩大。
          </Text>
          <Text className="login-notice-wrap__view__text">
          6、互联网环境并非百分之百安全，我们将尽力确保或担保您发送给我们的任何信息的安全性。在不幸发生个人信息安全事件后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。
          </Text>
          <Text className="login-notice-wrap__view__text">
          七、您管理个人信息的权利
          </Text>
          <Text className="login-notice-wrap__view__text">
          E网生活非常重视您对个人信息的关注，并尽全力保护您对于自己个人信息访问、更正、删除以及撤回同意的权利，以使您拥有充分的能力保障您的隐私和安全。
          </Text>
          <Text className="login-notice-wrap__view__text">
          您的权利包括： 
          </Text>
          <Text className="login-notice-wrap__view__text">
          （一）个人信息的查询、更正
          </Text>
          <Text className="login-notice-wrap__view__text">
          您有权访问您的个人信息，法律法规规定的例外情况除外。如果您想行使数据访问权，可以通过以下方式自行访问：
          </Text>
          <Text className="login-notice-wrap__view__text">
          PC端：
          </Text>
          <Text className="login-notice-wrap__view__text">
          1、您的个人资料信息：您可以通过E网生活首页上方“个人中心”—“个人资料”，访问、更正您的账户信息；
          </Text>
          <Text className="login-notice-wrap__view__text">
          2、您的账号安全信息：您可以通过E网生活首页上方“个人中心”—“账号绑定”，访问、更正您的认证手机、认证邮箱、登录密码、QQ账号、微博、微信账号的信息；
          </Text>
          <Text className="login-notice-wrap__view__text">
          3、您的简历：您可以通过E网生活首页上方“个人中心”——“我的求职”——“我的简历”进行查询、更正、删除。
          </Text>
          <Text className="login-notice-wrap__view__text">
          APP端：
          </Text>
          <Text className="login-notice-wrap__view__text">
          1、您可以通过首页下方“我的”—点击左上角的头像—“个人信息”访问、更改您的个人资料信息、账号信息、认证信息。
          </Text>
          <Text className="login-notice-wrap__view__text">
          2、您的简历：您可以通过E网生活APP首页-“全职招聘”—“我的”-“我的简历”进行查询、更正、删除。
          </Text>
          <Text className="login-notice-wrap__view__text">
          （二）个人信息的删除
          </Text>
          <Text className="login-notice-wrap__view__text">
          除了您在上述查询、更正信息的页面进行信息删除处理外，您还可以在APP首页下方“我的”—右上角“设置”—选择“清空足迹”或“清空缓存”。在以下情形中，您可以向我们提出删除个人信息的请求：
          </Text>
          <Text className="login-notice-wrap__view__text">
          1）如果我们处理个人信息的行为违反法律法规；
          </Text>
          <Text className="login-notice-wrap__view__text">
          2）如果我们收集、使用您的个人信息，却未征得您的同意；
          </Text>
          <Text className="login-notice-wrap__view__text">
          3）如果我们处理个人信息的行为违反了与您的约定；
          </Text>
          <Text className="login-notice-wrap__view__text">
          4）如果我们终止服务及运营。
          </Text>
          <Text className="login-notice-wrap__view__text">
          （三）改变您授权同意的范围或撤回您的授权
          </Text>
          <Text className="login-notice-wrap__view__text">
          您可以通过删除信息、关闭设备功能、在E网生活网站或软件中进行隐私设置等方式改变您授权我们继续收集个人信息的范围或撤回您的授权。您也可以通过注销账户的方式，撤回我们继续收集您个人信息的全部授权。
          </Text>
          <Text className="login-notice-wrap__view__text">
          （四）共享、转让、公开披露个人信息时事先征得授权同意的例外
          </Text>
          <Text className="login-notice-wrap__view__text">
          根据法律规定，在以下情形中，我们共享、转让、公开披露您的个人信息无需事先征得您的授权同意：
          </Text>
          <Text className="login-notice-wrap__view__text">
          1）与国家安全、国防安全直接相关的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          2）与公共安全、公共卫生、重大公共利益直接相关的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          3）与犯罪侦查、起诉、审判和判决执行等直接相关的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          4）出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          5）个人信息主体自行向社会公众公开的个人信息；
          </Text>
          <Text className="login-notice-wrap__view__text">
          6）从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。
          </Text>
          <Text className="login-notice-wrap__view__text">
          （五）注销账户
          </Text>
          <Text className="login-notice-wrap__view__text">
          您可以在我们的产品或服务中直接申请注销账户。您注销账户后，我们将停止为您提供产品与/或服务，并依据您的要求，除法律法规另有规定外，我们将删除您的个人信息。如果您对注销账号有疑问的，可以发邮件至postmaster@ecome.com，我们会有专门的人员进行回复反馈。 
          </Text>
          <Text className="login-notice-wrap__view__text">
          （六）响应您的上述请求
          </Text>
          <Text className="login-notice-wrap__view__text">
          为保障安全，您可能需要提供书面请求，或以其他方式证明您的身份。我们可能会先要求您验证自己的身份，然后再处理您的请求。
          </Text>
          <Text className="login-notice-wrap__view__text">
          八、我们如何处理未成年人的个人信息
          </Text>
          <Text className="login-notice-wrap__view__text">
          1、E网生活主要为生活服务类平台，我们的服务主要面向成年人（原则上18周岁以上为成年人，16周岁以上且以自己的劳动收入为主要生活来源的我们亦视为成年人）。若您是未成年人，在使用我们的产品和/或服务前，您应在监护人的陪同下阅读本隐私政策，并应确保已征得您的监护人同意后使用我们的服务并向我们提供您的信息。 我们会根据国家相关法律法规的规定着重保护未成年人的个人信息。
          </Text>
          <Text className="login-notice-wrap__view__text">
          2、如您的监护人不同意您按照本隐私政策使用我们的服务或向我们提供信息，请您立即终止使用我们的服务并及时通知我们。
          </Text>
          <Text className="login-notice-wrap__view__text">
          3、对于经父母或法定监护人同意而收集未成年人个人信息的情况，我们只会在受到法律允许、父母或监护人明确同意或者保护未成年人所必要的情况下使用或公开披露此信息。
          </Text>
          <Text className="login-notice-wrap__view__text">
          4、若您是未成年人的监护人，当您对您所监护的未成年人使用我们的服务或其向我们提供的用户信息有任何疑问时，请您及时与我们联系。我们将根据国家相关法律法规及本隐私政策的规定保护未成年人用户信息的保密性及安全性。如果我们发现自己在未事先获得可证实的父母或法定监护人同意的情况下收集了未成年人的个人信息，则会设法尽快删除相关数据。
          </Text>
          <Text className="login-notice-wrap__view__text">
          九、本隐私政策的更新和通知
          </Text>
          <Text className="login-notice-wrap__view__text">
          我们的隐私政策可能变更。未经您明确同意，我们不会削减您按照本隐私政策所应享有的权利。我们会在本页面上发布对本隐私政策所做的任何变更。
          </Text>
          <Text className="login-notice-wrap__view__text">
          对于重大变更，我们还会提供更为显著的通知（包括对于某些服务， 我们会通过电子邮件发送通知，说明隐私政策的具体变更内容）。
          </Text>
          <Text className="login-notice-wrap__view__text">
          本隐私政策所指的重大变更包括但不限于：
          </Text>
          <Text className="login-notice-wrap__view__text">
          1、我们的服务模式发生重大变化。如处理个人信息的目的、处理的个人信息类型、个人信息的使用方式等；
          </Text>
          <Text className="login-notice-wrap__view__text">
          2、我们在所有权结构、组织架构等方面发生重大变化。如业务调整、破产并购等引起的所有者变更等；
          </Text>
          <Text className="login-notice-wrap__view__text">
          3、个人信息共享、转让或公开披露的主要对象发生变化；
          </Text>
          <Text className="login-notice-wrap__view__text">
          4、您参与个人信息处理方面的权利及其行使方式发生重大变化；
          </Text>
          <Text className="login-notice-wrap__view__text">
          5、我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时；
          </Text>
          <Text className="login-notice-wrap__view__text">
          6、个人信息安全影响评估报告表明存在高风险时。
          </Text>
          <Text className="login-notice-wrap__view__text">
          十、如何联系我们
          </Text>
          <Text className="login-notice-wrap__view__text">
          如您对本隐私政策有任何疑问或您在使用我们提供的服务时个人信息受到了侵扰，您可以通过E网生活网站（www.ecome.com）或发送邮件至postmaster@ecome.com咨询，我们设立了个人信息保护专职部门，将尽快给予您答复。一般情况下，我们将在十五天内（国家法定节假日顺延）回复。
          </Text>
          <Text className="login-notice-wrap__view__text">
          十一、争议解决
          </Text>
          <Text className="login-notice-wrap__view__text">
          1、如果您对我们的回复不满意，特别是我们的个人信息处理行为损害了您的合法权益，您还可以向网信办及工商等监管部门进行反馈，具体联系方式可以监管部门官网上显示的为准。
          </Text>
          <Text className="login-notice-wrap__view__text">
          2、因本隐私政策以及我们处理您个人信息事宜引起的任何争议，您可诉至北京市朝阳区人民法院。
          </Text>
        </ScrollView>
      </View>
    );
  }
}
