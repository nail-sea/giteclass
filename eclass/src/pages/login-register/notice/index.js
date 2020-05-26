import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, ScrollView} from "@tarojs/components";
import { TitleBar } from "@/components";
import {getPlatform} from "@/utils/common"
import "./index.scss";
import { getWindowHeight } from "@/utils/style";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "用户协议",
    disableScroll:getPlatform().isRN
  };

  render() {
    return (
      <View className="login-notice-wrap">
        <TitleBar title="用户协议" />
        <ScrollView className="login-notice-wrap__view" scrollY style={{height:getWindowHeight(false, true)}}>
          <Text className="login-notice-wrap__view__text">
            E网本地化信息发布平台（以下简称“E网生活”或“E网”）是北京壹网生活科技有限公司运营管理的互联网、移动信息服务平台，包括E网生活（网址：www.ecome.com）APP和微信公众号；请您注册、登陆E网生活并使用相关服务！          </Text>
          <Text className="login-notice-wrap__view__text">
          本用户服务协议（以下简称“本协议”或“服务协议”）是E网生活与注册登录和使用E网服务的用户（以下简称“用户”或“您”）就双方在E网生活提供和接受服务所订立的通用法律协议。限制、免责条款可能以黑体加粗或加下划线的形式提示您重点注意。您不应当以E网生活未对本协议以合理方式提醒用户注意或未根据用户要求尽到说明义务为由而声称或要求法院或其他任何第三方确认相关条款非法或无效。如果您对本协议任何条款的修改表示异议，您可以选择不进入E网。在您按照注册页面提示填写信息、阅读并同意本协议并完成全部注册程序后或以其他E网允许的方式实际使用E网服务时，您即受本协议的约束。如果您不同意本协议的约定，您应立即停止注册程序或停止使用E网平台服务；如您继续访问和使用E网平台服务，即视为您已确知并完全同意本协议各项内容，并完全服从E网的统一管理。
          </Text>
          <Text className="login-notice-wrap__view__text">
          E网生活有权根据国家法律法规的更新、产品和服务规则的调整需要不时地制订、修改本协议及/或各类规则，并提前以网站公示的方式进行公示。如您继续使用E网生活平台服务的，即表示您接受经修订的协议和规则。如发生有关争议时，以E网生活最新的相关协议和规则为准。
          </Text>
          <Text className="login-notice-wrap__view__text">
          请您仔细阅读以下条款：如果您未满18周岁，请在法定监护人的陪同下阅读本协议：          </Text>
          <Text className="login-notice-wrap__view__text">一、定义</Text>
          <Text className="login-notice-wrap__view__text">
          1.1 本协议：包括本协议正文、《E网生活隐私政策》，且您在使用E网某一特定服务时，该服务可能会另有单独的协议、相关业务规则等（以下统称为“规则”）。所有E网已经发布的或将来可能发布的规则为本协议不可分割的组成部分，与本协议具有同等法律效力。除另行明确声明外，任何E网及其关联公司提供的服务（以下称为“E网生活服务”）均受本协议约束。
          </Text>
          <Text className="login-notice-wrap__view__text">
          1.2 规则：指E网发布并修订的关于E网的用户协议、规则、公告及通知、指引、说明等内容。
          </Text>
          <Text className="login-notice-wrap__view__text">
          1.3用户：指接受E网服务的自然人、法人、其他组织或机构，以下亦称为“您”。包含注册用户和非注册用户；注册用户是指通过E网生活完成全部注册程序后，使用E网服务或网站资料的用户；非注册用户是指未进行注册、直接登录E网生活或通过其他网站进入E网平台直接或间接地使用E网服务或网站资料的用户。
          </Text>
          <Text className="login-notice-wrap__view__text">
          1.4 数据：指您在使用E网服务过程中产生的并存储于服务器的各种数据信息，包括日志、安全日志等。
          </Text>
          <Text className="login-notice-wrap__view__text">
          1.5 E币：您进入并使用本服务时需购买、消耗的币。E币不可在用户间交易，不能与E网的积分相兑换。
          </Text>
          <Text className="login-notice-wrap__view__text">二、注册及账号</Text>
          <Text className="login-notice-wrap__view__text">
          2.1您确认，在您完成注册程序或以其他E网生活允许的方式实际使用E网生活平台服务时，您应当是具备完全民事行为能力的自然人（十六周岁以上的未成年人，以自己的劳动收入为主要生活来源的，视为完全民事行为能力人）、法人或其他组织。若您不具备前述主体资格，E网生活有权拒绝您的注册/使用申请；如您已经注册，则E网生活有权对您的账户进行相应的限制，且您及您的家长或法定监护人（以下统称"监护人"）应承担因此而导致的一切后果；如您的行为给E网生活造成损失的，E网生活保留向您及您的监护人索偿的权利。
          </Text>
          <Text className="login-notice-wrap__view__text">
          2.2 E网生活非常重视对青少年个人信息搜集和使用的安全性的保护。E网生活建议，任何未满18周岁的未成年人参加网上活动应事先取得其监护人可经查证的同意并遵守《全国青少年网络文明公约》。监护人应承担未成年人网络活动风险及保护未成年人相关网络隐私的首要责任。
          </Text>
          <Text className="login-notice-wrap__view__text">
          2.3在您签署本协议，完成注册程序时，E网生活会向您提供唯一编号的E网生活账户。网暂仅能通过手机号登录注册及登录；未来不排斥将引入其他第三方账户体系用于登录E网。您应对您的用户账户、登录密码、支付密码（如有）、验证码的安全，以及对通过您的账户和密码实施的行为负责；因此所衍生的任何损失或损害，E网生活无法也不承担任何责任。除非有法律规定或行政司法机关的指令，且征得E网生活的同意，否则您的用户账户、登录密码、支付密码（如有）和验证码不得以任何方式转让、借用、赠与、继承（与账户相关的财产权益除外）{'<或>'}在第三方平台上进行展示或售卖。否则，由此给您（或E网生活、任何第三方）造成的一切损失，概由您自行承担（或者负责赔偿）。
          </Text>
          <Text className="login-notice-wrap__view__text">
          2.4 E网生活承诺非经法定原因、本协议的约定或您的事先许可，E网生活不会向任何第三方透露您的注册账号、手机号码等非公开信息。如果发现任何人不当使用您的账户或有任何其他可能危及您的账户安全的情形时，您应当立即以有效方式通知E网生活，要求E网生活暂停相关服务。您理解E网生活对您的请求采取行动需要合理时间，E网生活对在采取行动前已经产生的后果（包括但不限于您的任何损失）不承担任何责任。
          </Text>
          <Text className="login-notice-wrap__view__text">
          2.5如果E网在今后自建账号体系，则账户的所有权归E网，您在完成注册申请手续后，仅获得E网账户的使用权。您在注册帐号或使用E网生活平台服务的过程中，应提供合法、真实、准确的个人资料，您填写的个人资料有变动的，应及时进行更新。如果因您提供的个人资料不合法、不真实、不准确的，您需承担因此引起的相应责任及后果，并且E网生活保留终止您使用E网生活各项服务的权利。因黑客行为等第三方因素或用户自身原因导致的账号安全问题，E网对受影响用户不承担任何法律责任。
          </Text>
          <Text className="login-notice-wrap__view__text">
          2.6 您应当通过真实身份信息认证注册账号，且您提交的账号名称、头像和简介等注册信息中不得出现违法和不良信息；经E网审核，如存在上述情况，E网将不予注册；同时，在注册后，如发现您以虚假信息骗取账号名称注册，或账号头像、简介等注册信息存在违法和不良信息的，E网有权不经通知单方采取限期改正、暂停使用、注销登记、收回等措施。
          </Text>
          <Text className="login-notice-wrap__view__text">
          2.7您了解并同意，如您符合并且遵守本协议条款，在通过E网生活平台完成注册程序之后，即可成为E网生活平台注册用户。对于您主动提交的相关信息，您授权E网生活及/或E网生活网站运营者及关联服务提供方委托的第三方通过合法渠道（包括但不限于征信机构等）了解、咨询、审查您的个人市场交易风险的真实情况，并据此判断您的风险状况。
          </Text>
          <Text className="login-notice-wrap__view__text">
          2.8您不得通过任何手段恶意注册E网生活网站帐号，包括但不限于以牟利、炒作、套现等为目的多个账号注册。您亦不得盗用其他用户帐号。
          </Text>
          <Text className="login-notice-wrap__view__text">
          2.9您了解并同意，一经注册用户账号，即视为您同意E网生活及/或其关联公司可以通过拨打电话、发送短信或者电子邮件等方式向您注册时填写的手机号码、电子邮箱等发送、告知相应的产品服务广告信息、促销优惠等营销信息；您如果不同意接收相关信息，您可以通过相应的退订功能或相关提示进行退订。
          </Text>
          <Text className="login-notice-wrap__view__text">
          2.10 如果您长期连续未登录，您在E网内的E网数据可能会由于技术原因被删除，对此E网不承担任何责任。
          </Text>
          <Text className="login-notice-wrap__view__text">三、E网生活服务</Text>
          <Text className="login-notice-wrap__view__text">
          3.1 E网将向您提供本地化生活服务所用，E网严禁一切形式的违法犯罪活动。E网将与您共同打造绿色的休闲服务生活平台。
          </Text>
          <Text className="login-notice-wrap__view__text">
          3.2 在您遵守本协议及相关法律法规的前提下，E网给予您一项不可转让及非排他性的许可，以使用E网业务。您使用E网服务仅可以非商业目的使用，包括：
          </Text>
          <Text className="login-notice-wrap__view__text">
          （1）接收、下载、安装、启动、升级、登录、显示、运行；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （2）创建账号，设置昵称；查阅规则、用户个人资料、使用聊天功能、社交分享功能；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （3）使用E网支持并允许的其他某一项或几项功能。
          </Text>
          <Text className="login-notice-wrap__view__text">
          3.3 您充分理解并同意：享受本服务，需购买并消耗E币；E币可通过线上途径购得；E币使用期限为自您获得E币之日起至E网终止运营（无论何种原因导致运营终止）之日止。一旦本协议终止或者E网终止运营，您将无法继续使用E币；一旦购买E币完成，除非E网同意，您将不得撤销交易或要求将所购E币回兑成相应的现金或其他等价物。
          </Text>
          <Text className="login-notice-wrap__view__text">
          3.4 E网暂不支持任何其他虚拟货币、虚拟物品等。
          </Text>
          <Text className="login-notice-wrap__view__text">
          3.5 您在使用E网的收费功能时，应当按照E网的要求支付相应的费用。该权利属于E网的经营自主权，E网保留随时改变经营模式的权利，即保留变更收费的费率标准、收费的软件功能、收费对象及收费时间等权利。同时，也保留对E网进行升级、改版、增加、删除、修改、变更其功能或者变更其规则的权利。用户如果不接受该等变更的，应当立即停止使用E网；用户继续使用的行为，视为用户接受改变后的经营模式。
          </Text>
          <Text className="login-notice-wrap__view__text">
          3.6 为保障用户的正当利益，E网对盗号及盗号相关行为（包括但不限于盗取账号、E网数据、玩家个人资料、协助盗号者操作等）予以严厉打击和处罚。一经査证属实或应有权机关要求，E网有权视具体情况立即采取封号等处罚措施，情节严重的，E网保留对涉案用户追究法律责任的权利。
          </Text>
          <Text className="login-notice-wrap__view__text">
          3.7 如果E网发现或收到他人举报或投诉用户违反本协议约定的，经査证属实，E网有权不经通知随时对相关内容进行删除，并视行为情节对违规账号处以包括但不限于警告、限制或禁止使用全部或部分功能、封号甚至终止服务的处罚。
          </Text>
          <Text className="login-notice-wrap__view__text">
          3.8 您充分理解并同意，因您违反本协议或相关规则的规定，导致或产生第三方主张的任何索赔、要求或损失，您应当独立承担责任；E网因此遭受损失的，您也应一并赔偿。
          </Text>
          <Text className="login-notice-wrap__view__text">
          3.9 E网可能会通过E网官方网站、E网客服官方网站、客服电话、E网微信公众号、E网管理员或者其他的途径，向用户提供诸如规则说明、BUG、E网账号锁定或解除锁定、E网帐号申诉、E网帐号暂时封停、E网帐号实名注册信息修改和/或查验等客户服务。
          </Text>
          <Text className="login-notice-wrap__view__text">
          3.10 您可根据向E网举报存在的作弊等违规行为，如对处理结果不满意，可申诉一次，申诉的结果为最终判定结果。用户如对最终判定结果不满意，E网有权拒绝用户再次申诉请求
          </Text>
          <Text className="login-notice-wrap__view__text">四、用户行为规范</Text>
          <Text className="login-notice-wrap__view__text">
          4.1 您充分了解并同意，您必须为自己账号下的一切行为负责，包括您所发表的任何内容以及由此产生的任何后果。您应对E网中的内容自行加以判断，并承担因使用E网而引起的所有风险，包括因对E网内容的正确性、完整性或实用性的依赖而产生的风险。E网无法且不会对因前述风险而导致的任何损失或损害承担责任。如您通过E网生活发布信息，您应按照E网的规则发布各种生活信息。但所发布之信息不得含有如下内容：
          </Text>
          <Text className="login-notice-wrap__view__text">
          1) 反对宪法所确定的基本原则，煽动抗拒、破坏宪法和法律、行政法规实施的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          2)煽动危害国家安全、泄露国家秘密、颠覆国家政权，推翻社会主义制度的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          3)煽动分裂国家、破坏国家统一、损害国家荣誉和民族利益的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          4)煽动民族仇恨、民族歧视，破坏民族团结的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          5)捏造或者歪曲事实，散布谣言，扰乱社会秩序的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          6)进行政治宣传或破坏国家宗教政策、宣扬封建迷信、淫秽、色情、赌博、暴力、凶杀、恐怖、教唆犯罪的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          7)公然侮辱他人或者捏造事实诽谤他人的，或者进行其他恶意攻击的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          8)损害国家机关信誉的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          9)其他违反宪法和法律法规的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          4.2 除非法律允许或E网书面许可，您不得（营利或非营利性的）从事下列行为：
          </Text>
          <Text className="login-notice-wrap__view__text">
          （1）通过非E网开发、授权的第三方软件、插件、外挂、系统，使用E网及E网的其他服务；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （2）制作、发布、传播非E网开发、授权的第三方软件、插件、外挂、系统；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （3）建立有关E网的镜像站点，或者进行网页（络）快照或者利用架设服务器等方式，为他人提供与E网服务完全相同或者类似的服务；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （4）对E网软件进行反向工程、反向汇编、反向编译或者以其他方式尝试获取软件的源代码；修改或伪造软件作品运行中的指令、数据、数据包，增加、删减、变动软件 的功能或运行效果，不得将用于上述用途的软件通过信息网络向公众传播或者运营；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （5）进行危害计算机网络安全的行为，包括但不限于：使用未经许可的数据或进入未经许可的服务器/帐号；未经允许进入公众计算机网络或者他人计算机系统并删除、修改、增加存储信息；未经许可，企图探查、扫描、测试本平台系统或网络的弱点或其它实施破坏网络安全的行为；企图干涉、破坏本平台系统或网站的正常运行，故意传播恶意程序或病毒以及其他破坏干扰正常网络信息服务的行为；伪造TCP/IP数据包名称或部分名称；通过各种方式侵入服务器，干扰服务器的正常运行，接触、拷贝、篡改、增加、删除E网数据；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （6）使用E网的名称、商标或其它知识产权；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （7）发表、传送、传播、储存侵害他人知识产权、商业秘密权等合法权利的内容，包含病毒、木马、定时炸弹等可能对E网系统造成伤害或影响其稳定性的内容制造虚假身份以误导、欺骗他人；传送或散布以其他方式实现传送的含有受到知识产权法律保护的图像、相片、软件或其他资料的文件，作为举例（但不限于此）：包括版权或商标法（或隐私权或公开权），除非用户拥有或控制着相应的权利或已得到所有必要的认可；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （8）在未经E网生活书面明确授权前提下，出售、出租、出借、散布、转移或转授权软件和服务或相关的链接或从使用软件和服务或软件和服务的条款中获利，无论以上使用是否为直接经济或金钱收益；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （9） 违背E网生活页面公布之活动规则，包括但不限于发布虚假信息、作弊或通过其他手段进行虚假交易。
          </Text>
          <Text className="login-notice-wrap__view__text">
          （10）其他未经E网明示授权的行为。
          </Text>
          <Text className="login-notice-wrap__view__text">
          4.3 您在使用E网服务过程中有如下行为的，E网将视情节严重程度，依据本协议及相关E网规则的规定，对您暂时或永久性地做出禁言（关闭聊天功能）、强制离线、封号（暂停E网账户）、终止服务等处理措施，情节严重的将移交有关机关给予行政处罚，甚至向公安机关举报、追究您的刑事责任：
          </Text>
          <Text className="login-notice-wrap__view__text">
          （1）假冒E网工作人员或其他客户服务人员；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （2）传播非法言论或不当信息，包括使用非法或不当词语、字符等用于角色命名；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （3）对E网工作人员或其他玩家进行辱骂、人身攻击等； 不断吵闹、重复发言、不断发布广告、恶意刷屏等，以及恶意连续骚扰他人，影响他人E网等其他行为；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （4）以任何方式破坏E网或影响E网服务的正常进行；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （5）各种非法外挂行为；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （6）利用系统的BUG、漏洞为自己及他人牟利；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （7）利用E网进行赌博；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （8）侵犯E网的知识产权，或者进行其他有损于E网或第三方合法权益的行为；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （9）通过各种方式侵入E网服务器，干扰服务器的正常运行， 接触、拷贝、篡改、增加、删除E网数据；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （10）其他在行业内被广泛认可的不当行为，无论是否已经被本协议或E网规则明确列明。
          </Text>
          <Text className="login-notice-wrap__view__text">
          4.4在E网生活平台上使用E网服务过程中，您承诺遵守以下约定：
          </Text>
          <Text className="login-notice-wrap__view__text">
          （1）在使用E网生活平台服务过程中实施的所有行为均遵守国家法律、法规等规范文件及E网生活平台各项规则的规定和要求，不违背社会公共利益或公共道德，不损害他人的合法权益，不违反本协议及相关规则。您如果违反前述承诺，产生任何法律后果的，您应以自己的名义独立承担所有的法律责任，并确保E网生活免于因此产生任何损失或增加费用。
          </Text>
          <Text className="login-notice-wrap__view__text">
          （2）不发布国家禁止发布的信息（除非取得合法且足够的许可），不发布涉嫌侵犯他人知识产权或其它合法权益的信息，不发布违背社会公共利益或公共道德、公序良俗的信息，不发布其它涉嫌违法或违反本协议及各类规则的信息。
          </Text>
          <Text className="login-notice-wrap__view__text">
          （3）不对E网生活平台上的任何数据作商业性利用，包括但不限于在未经E网生活事先书面同意的情况下，以复制、传播等任何方式使用E网生活平台站上展示的资料。
          </Text>
          <Text className="login-notice-wrap__view__text">
          （4）不使用任何装置、软件或例行程序干预或试图干预E网生活平台的正常运作或正在E网生活平台上进行的任何活动。您不得采取任何将导致不合理的庞大数据负载加诸E网生活平台网络设备的行动。
          </Text>
          <Text className="login-notice-wrap__view__text">
          4.5您了解并同意：
          </Text>
          <Text className="login-notice-wrap__view__text">
          （1）您违反上述承诺时，E网生活有权依据本协议的约定，做出相应处理或终止向您提供服务，且无须征得您的同意或提前通知于您。
          </Text>
          <Text className="login-notice-wrap__view__text">八、管辖与法律适用</Text>
          <Text className="login-notice-wrap__view__text">
          （2）根据相关法令的指定或者E网生活服务规则的判断，您的行为涉嫌违反法律法规的规定或违反本协议和/或规则的条款的，E网生活有权采取相应措施，包括但不限于直接屏蔽、删除侵权信息、降低您的信用值或直接停止提供服务。如因此使E网生活遭受损失，或受到任何第三方的索赔，或受到任何行政管理部门的处罚，您应当赔偿E网生活因此造成的损失及（或）发生的费用，包括合理的律师费用。
          </Text>
          <Text className="login-notice-wrap__view__text">
          （3）对于您在E网生活平台上实施的行为，包括您未在E网生活平台上实施但已经对E网生活平台及其用户产生影响的行为，E网生活有权单方认定您行为的性质及是否构成对本协议和/或规则的违反，并据此采取相应的处理措施。您应自行保存与您行为有关的全部证据，并应对无法提供充要证据承担不利后果。
          </Text>
          <Text className="login-notice-wrap__view__text">
          （4）对于您涉嫌违反承诺的行为对任意第三方造成损害的，您均应当以自己的名义独立承担所有的法律责任，并应确保E网生活免于承担因此产生的损失或增加的费用。
          </Text>
          <Text className="login-notice-wrap__view__text">五、免责说明</Text>
          <Text className="login-notice-wrap__view__text">
          5.1鉴于E网生活为互联网信息发布平台性质，商家/用户通过使用E网服务账号和密码登陆E网自行编辑、发布、展示并有权随时更新、修改后重新发布的推广信息（包括但不限于招聘信息、房产信息、二手车信息、二手信息、宠物信息、本地商务信息、本地服务等），由用户自行承担相应的法律责任。E网生活平台服务不作任何明示或暗示的保证，包括但不限于E网生活平台服务的适用性、没有错误或疏漏、持续性、准确性、可靠性、适用于某一特定用途。同时，E网生活也不对E网生活平台服务所涉及的技术及信息的有效性、准确性、正确性、可靠性、稳定性、完整性和及时性作出任何承诺和保证。
          </Text>
          <Text className="login-notice-wrap__view__text">
          5.2 E网生活仅向您提供E网生活平台服务，您了解E网生活平台上的信息系用户自行发布，由于海量信息的存在，且E网生活平台无法杜绝可能存在风险和瑕疵。您应谨慎判断确定相关信息的真实性、合法性和有效性，并注意保留相应的证据以利于维权，如可能，尽量采用网站建议的交易方式进行。本公司对于您由于使用E网生活而造成的任何金钱、商誉、名誉的损失，或任何特殊的、间接的、或结果性的损失都不负任何责任。
          </Text>
          <Text className="login-notice-wrap__view__text">
          5.3 E网生活平台与其他的在线使用的互联网网站一样，也会受到各种不良信息、网络安全和网络故障问题的困扰，包括但不限于：
          </Text>
          <Text className="login-notice-wrap__view__text">
          （1）其他用户可能会发布诈骗或虚假信息，或者发表有谩骂、诅咒、诋毁、攻击内容的，或者含有淫秽、色情、下流、反动、煽动民族仇恨等让人反感、厌恶的内容的非法言论；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （2）其他用户可能会发布一些侵犯您或者其他第三方知识产权、肖像权、姓名权、名誉权、隐私权和/或其他合法权益的图片、照片、文字等资料；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （3）面临着诸如黑客攻击、计算机病毒困扰、系统崩溃、网络掉线、网速缓慢、程序漏洞等问题的困扰和威胁。
          </Text>
          <Text className="login-notice-wrap__view__text">
          您充分了解并同意：上述的各种不良信息、网络安全和网络故障问题，并不是E网生活或者E网生活平台所导致的问题，由此可能会造成您感到反感、恶心、呕吐等精神损害，或者给您造成其他的损失，概由您自行承担，E网生活无须向您承担任何责任。
          </Text>
          <Text className="login-notice-wrap__view__text">
          5.4您同意，在发现本网站任何内容不符合法律规定，或不符合本用户协议规定的，您有义务及时通知E网生活。如果您发现您的个人信息被盗用、您的版权或者其他权利被侵害，请将此情况告知E网生活并同时提供如下信息和材料：
          </Text>
          <Text className="login-notice-wrap__view__text">
          （1）侵犯您权利的信息的网址，编号或其他可以找到该信息的细节；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （2）您是所述的版权或者其他权利的合法拥有者的权利证明；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （3）您的联系方式，包括联系人姓名，地址，电话号码和电子邮件；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （4）您的身份证复印件、营业执照等其他相关资料。
          </Text>
          <Text className="login-notice-wrap__view__text">
          经审查得到证实的，我们将及时删除相关信息。我们仅接受邮寄、电子邮件或传真方式的书面侵权通知。情况紧急的，您可以通过客服电话先行告知，我们会视情况采取相应措施。
          </Text>
          <Text className="login-notice-wrap__view__text">
          5.5您了解并同意，E网生活不对因下述任一情况而导致您的任何损害赔偿承担责任，包括但不限于利润、商誉、使用、数据等方面的损失或其它无形损失的损害赔偿：
          </Text>
          <Text className="login-notice-wrap__view__text">
          （1）使用或未能使用E网生活平台服务；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （2）第三方未经批准地使用您的账户或更改您的数据；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （3） 通过E网生活平台服务购买或获取任何商品、样品、数据、信息等行为或替代行为产生的费用及损失；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （4）您对E网生活平台服务的误解；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （5）任何非因E网生活的原因而引起的与E网生活平台服务有关的其它损失。
          </Text>
          <Text className="login-notice-wrap__view__text">
          5.6您在E网生活上使用第三方提供的产品或服务时，除遵守本协议约定外，还应遵守第三方的用户协议。E网生活和第三方对可能出现的纠纷在法律规定和约定的范围内各自承担责任。
          </Text>
          <Text className="login-notice-wrap__view__text">
          5.7您同意在使用E网生活平台服务过程中显示E网生活自行或由第三方服务商向您发送的推广或宣传信息（包括商业与非商业信息），其方式和范围可不经向您特别通知而变更。除法律法规明确规定外，您应自行对依该推广信息进行的交易负责，对用户因依该推广信息进行的交易或前述第三方服务商提供的内容而遭受的损失或损害，E网生活不承担任何责任。
          </Text>
          <Text className="login-notice-wrap__view__text">
          5.8 E网可能因E网软件BUG、版本更新缺陷、运营BUG、第三方病毒攻击或其他任何因素导致您无法登录账号，或导致您的E网角色、E网数据等账号数据发生异常。在数据异常的原因未得到査明前，E网有权暂时冻结该账号；若査明数据异常为非正常E网行为，您E网账号数据将可能被恢复至异常发生前的原始状态，E网对此免责。E网生活对下列不可抗力行为免责：信息网络正常的设备维护，信息网络连接故障，电脑、通讯或其他系统的故障，电力故障，罢工，劳动争议，暴乱，起义，骚乱，生产力或生产资料不足，火灾，洪水，风暴，爆炸，战争，政府行为，司法行政机关的命令或第三方的不作为而造成的不能服务或延迟服务。
          </Text>
          <Text className="login-notice-wrap__view__text">
          5.9除E网生活注明之服务条款外，其他一切因使用E网生活发布系统而引致之任何意外、疏忽、合约毁坏、诽谤、版权或知识产权侵犯及其所造成损失的（包括因下载而感染电脑病毒），E网生活不承担任何法律责任 任何通过E网生活的网页而链接及得到的资讯、产品或服务均系网站用户自行发布，引起纠纷的，E网生活不承担任何法律责任。
          </Text>
          <Text className="login-notice-wrap__view__text">
          5.10 E网生活保留在中华人民共和国大陆地区法施行之法律允许的范围内独立决定拒绝服务、关闭用户账户、清除或编辑内容或取消订单的权利。
          </Text>
          <Text className="login-notice-wrap__view__text">
          5.11 对于您从未经E网官方授权合作方处购买E币的行为，E网不承担任何责任；E网不对未经授权的第三方交易的行为负责，并且不受理因任何未经授权的第三方交易发生纠纷而带来的申诉。
          </Text>
          <Text className="login-notice-wrap__view__text">
          5.12由于互联网服务的特殊性，E网有权根据法律法规的规定及相关主管部门的要求、第三方权利人的投诉举报、与合作方的合作情况，以及E网业务发展情况，随时变更、中断或终止本服务的部分或全部内容。E网终止运营后，E网将根据E网后台数据，向您退还剩余E币或其他所购物品的费用。
          </Text>
          <Text className="login-notice-wrap__view__text">
          5.13您承诺您对按照E网生活企业冒用投诉页面要求所提供的证明文件之真实性、有效性、合法性、及时性负法律责任，承诺投诉不存在虚假陈述或其他欺诈行为，如您上传证照图片不清晰、证书虚假无效或其他违反本条承诺等原因，造成您所投诉信息未能及时处理，E网不承担任何责任；如给E网造成包括商誉在内任何损失的，我们有权追究您相关法律责任；
          </Text>
          <Text className="login-notice-wrap__view__text">
          六、知识产权
          </Text>
          <Text className="login-notice-wrap__view__text">
          6.1 E网是E网的知识产权权利人。相关的著作权、商标权、专利权、商业秘密等知识产权，以及其他信息内容（包括文字、图片、音频、视频、图表、界面设计、版面框架、有关数据或电子文档等）均受中华人民共和国法律和相应国际条约保护，E网享有上述知识产权，但相关权利人依照法律规定应享有的权利除外。E网生活平台所刊登的资料信息（包括但不限于编码、文字、图表、标识、按钮图标、图像、声音文件片段、数字下载、数据编辑和软件），均是E网生活或其内容提供者的财产，受中国和国际版权法的保护。本平台上所有内容的汇编是E网生活的排他财产，受中国和国际版权法的保护。本平台上所有软件都是E网生活或其关联公司或其软件供应商的财产，受中国和国际版权法的保护。未经E网生活的明确书面许可，任何第三方不得为任何非私人或商业目的获取或使用E网生活网站的任何部分或通过E网生活网站可直接或间接获得的任何内容、服务或资料。任何第三方违反本协议的规定以任何方式，和/或以任何文字对E网生活网站的任何部分进行发表、复制、转载、更改、引用、链接、下载或以其他方式进行使用，或向任何其他第三方提供获取E网生活网站任何内容的渠道，则对E网生活网站的使用权将立即终止，且任何第三方必须按照E网生活的要求，归还或销毁使用E网生活网站任何部分的内容所创建的资料的任何副本。
          </Text>
          <Text className="login-notice-wrap__view__text">
          6.2用户一旦接受本协议，即表明该用户主动将其在任何时间段在本平台发表的任何形式的信息内容（包括但不限于用户评价、用户咨询、各类话题文章等信息内容）的财产性权利等任何可转让的权利，如著作权财产权（包括并不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利），全部独家且不可撤销地转让给E网生活所有，用户同意E网生活有权就任何主体侵权而单独提起诉讼。
          </Text>
          <Text className="login-notice-wrap__view__text">
          6.3本协议已经构成《中华人民共和国著作权法》第二十五条（条文序号依照2010年版著作权法确定）及相关法律规定的著作财产权等权利转让的书面协议，其效力及于用户在E网生活平台上发布的任何受著作权法保护的作品内容，无论该等内容形成于本协议订立前还是本协议订立后。
          </Text>
          <Text className="login-notice-wrap__view__text">
          6.4用户同意并已充分了解本协议的条款，承诺不将已发表于本站的信息，以任何形式发布或授权其它主体以任何方式使用（包括但不限于在各类网站、媒体上使用）。
          </Text>
          <Text className="login-notice-wrap__view__text">
          6.5用户通过E网生活平台发布的信息或内容，并不代表E网生活之意见及观点，也不意味着E网生活赞同其观点或证实其内容的真实性。E网生活有权删除网站内各类不符合法律或本协议规定的信息或内容，而保留不通知用户的权利。
          </Text>
          <Text className="login-notice-wrap__view__text">
          6.6用户通过E网生活平台发布的信息、文字、图片等资料均由E网生活用户提供，其真实性、准确性和合法性由信息发布人负责。E网生活不提供任何保证，并不承担任何法律责任。如果以上资料侵犯了第三方的知识产权或其他权利，责任由信息发布者本人承担，E网生活对此不承担责任。
          </Text>
          <Text className="login-notice-wrap__view__text">
          6.7除法律另有强制性规定外，未经E网生活明确的特别书面许可，任何单位或个人不得以任何方式非法地全部或部分复制、传播、展示、镜像、上载、下载、转载、引用、链接、抓取或以其他方式使用本站的信息内容，否则，E网生活有权追究其法律责任。
          </Text>
          <Text className="login-notice-wrap__view__text">
          6.8 E网生活平台以下内容不可任意转载：
          </Text>
          <Text className="login-notice-wrap__view__text">
          （1）本平台内发布的所有信息；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （2）已作出不得转载或未经许可不得转载声明的内容；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （3）本平台中特有的图形、标志、页面风格、编排方式、程序等；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （4）本平台中必须具有特别授权或具有注册用户资格方可知晓的内容；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （5）其他法律不允许或本平台认为不适合转载的内容。
          </Text>
          <Text className="login-notice-wrap__view__text">
          6.9对于不当引用E网生活网站内容而引起的纷争等或因纠纷等造成的任何损失，E网生活不承担相关法律责任。对不遵守本声明的用户或其他违法、恶意使用E网生活网站内容者，E网生活保留追究其法律责任的权利。
          </Text>
          <Text className="login-notice-wrap__view__text">
          6.10 您在使用E网服务中产生的E网数据的所有权和知识产权归E网所有，E网有权处置该E网数据。E网可能涉及第三方知识产权，而该等第三方对您基于本协议在E网中使用该等知识产权有要求的，您应当一并遵守。
          </Text>
          <Text className="login-notice-wrap__view__text">
          七、用户信息收集、使用及保护
          </Text>
          <Text className="login-notice-wrap__view__text">
          7.1 您同意并授权E网为履行本协议之目的收集您的用户信息，这些信息包括您在实名注册系统中注册的信息、您账号下的E网数据以及其他您在使用E网服务的过程中向E网提供的或E网基于安全、用户体验优化等考虑而需收集的信息，E网对您的用户信息的收集将遵循相关法律的规定。
          </Text>
          <Text className="login-notice-wrap__view__text">
          7.2 您充分理解并同意：为更好地向您提供E网服务，E网可以将您的用户信息提交给关联公司，且E网有权自行或通过第三方对您的用户信息进行整理、统计、分析及利用。
          </Text>
          <Text className="login-notice-wrap__view__text">
          7.3 您充分理解并同意：E网可以根据您的用户信息，通过短信、电话、邮件等各种方式向您提供关于E网的活动信息、推广信息等各类信息。
          </Text>
          <Text className="login-notice-wrap__view__text">
          7.4 E网保证不对外公开或向任何第三方提供您的个人信息，但是存在下列情形之一的除外：
          </Text>
          <Text className="login-notice-wrap__view__text">
          （1）公开或提供相关信息之前获得您许可的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （2）根据法律或政策的规定而公开或提供的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （3）只有公开或提供您的个人信息，才能向您提供您需要的E网服务的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （4）根据国家权力机关要求公开或提供的；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （5）根据本协议其他条款约定而公幵或提供的。
          </Text>
          <Text className="login-notice-wrap__view__text">
          八、协议的变更和生效
          </Text>
          <Text className="login-notice-wrap__view__text">
          8.1 E网有权根据需要修订本协议条款。上述内容一经正式公布即生效。您可以在E网的相关页面查阅最新版本的协议条款。
          </Text>
          <Text className="login-notice-wrap__view__text">
          8.2 本协议条款变更后，如果您继续使用E网服务，即视为您已接受变更后的协议。如果您不接受变更后的协议，应当立即停止使用E网服务。
          </Text>
          <Text className="login-notice-wrap__view__text">
          8.3 除非本协议另有其它明示规定，E网所推出的新产品、新功能、新服务，均受到本协议之规范。
          </Text>
          <Text className="login-notice-wrap__view__text">
          九、协议终止
          </Text>
          <Text className="login-notice-wrap__view__text">
          9.1您同意，E网生活基于平台服务的安全性，有权中止向您提供部分或全部E网生活平台服务，暂时冻结您的账户，待安全问题解决后及时恢复，并对中止、冻结及恢复的事实及时通知。如果网站的安全问题是由于您的违法行为引起，E网生活有权终止向您提供部分或全部E网生活平台服务，永久冻结（注销）您的帐户，并有权向您对损失进行索赔。
          </Text>
          <Text className="login-notice-wrap__view__text">
          9.2如您对本协议的修改有异议，或对E网生活的服务不满，可以行使如下权利：
          </Text>
          <Text className="login-notice-wrap__view__text">
          （1）停止使用E网生活的网络服务；
          </Text>
          <Text className="login-notice-wrap__view__text">
          （2）通过客服等渠道告知E网生活停止对其服务。结束服务后，您使用E网生活服务的权利立即终止。在此情况下，E网生活没有义务传送任何未处理的信息或未完成的服务给您或任何无直接关系的第三方。
          </Text>
          <Text className="login-notice-wrap__view__text">
          9.3您同意，您与E网生活的协议关系终止后，E网生活仍享有下列权利：
          </Text>
          <Text className="login-notice-wrap__view__text">
          （1）继续保存您未及时删除的注册信息及您使用E网生活平台服务期间发布的所有信息至法律规定的记录保存期满。
          </Text>
          <Text className="login-notice-wrap__view__text">
          （2）您在使用E网生活平台服务期间存在违法行为或违反本协议和/或规则的行为的，E网生活仍可依据本协议向您主张权利、追究责任。
          </Text>
          <Text className="login-notice-wrap__view__text">
          十、管辖与法律适用
          </Text>
          <Text className="login-notice-wrap__view__text">
          10.1本协议签订地为中华人民共和国北京市。
          </Text>
          <Text className="login-notice-wrap__view__text">
          10.2本协议之订立、生效、解释、修订、补充、终止、执行与争议解决均适用中华人民共和国法律，如法律无相关规定的，则应参照通用国际商业惯例和（或）行业惯例。
          </Text>
          <Text className="login-notice-wrap__view__text">
          10.3本协议任一条款被视为废止、无效或不可执行，该条应视为可分的且并不影响本协议其余条款的有效性及可执行性。
          </Text>
          <Text className="login-notice-wrap__view__text">
          10.4 若您和E网之间因本协议发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交至E网住所地有管辖权的人民法院管辖。
          </Text>
          <Text className="login-notice-wrap__view__text">
          为维护网民和相关权利人利益，北京壹网生活科技有限公司已经以公示的方式，为用户及相关权利人提供了丰富、便捷的线上线下投诉渠道（包括但不限于通过您的专属客服、E网生活网站首页下方的违法信息举报电话或者通过E网生活网站的帮助中心页面（等渠道与E网生活取得联系）。基于网络用户间的公平考量，同时也为了使网络用户的投诉能够及时得到处理，避免被当做垃圾邮件屏蔽，北京壹网生活科技有限公司拒绝接收和处理所有以电子邮件形式发送给本公司员工个人的网络侵权通知，更不承诺对发送给本公司员工个人的电子邮件侵权通知进行优先处理，特此告知。
          </Text>
        </ScrollView>
      </View>
    );
  }
}
