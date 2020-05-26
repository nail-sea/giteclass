const ENUM = {
    HOME_PAGESIZE: 10,
    SPECIFICATION: [{ key: 1, name: '全职' }, { key: 2, name: '兼职' }, { key: 3, name: '不限' }], //工作性质
    TOPSTATUS: 2, //{ 1: '未置顶', 2: '置顶' }, //置顶状态 
    NOTOPSTATUS: 1,
    RECOMMEND_STATUS: 2,//{ 1: '未推荐', 2: '推荐' }, //推荐状态 
   //POST_SEX: [{ key: 1, name: '男' }, { key: 2, name: '女' }, { key: 3, name: '不限' }], //性别
    LOGINSTATUS: 1,//{ 1: '登录', 2: '未登录' }
    BIRTH: [{ key: 1990, name: '1990' }, { key: 1991, name: '1991' }, { key: 1992, name: '1992' }], // 可删掉出生年份
    AUDIT_STATUS: [{ key: 1, name: '审核通过' }, { key: 2, name: '审核失败' }, { key: 3, name: '审核中' }], //店铺审核状态
    AUDITSTATUS:{1:'审核通过',2:'审核失败',3:'审核中'}, //店铺审核状态 {对象枚举}
    AUDIT_STATUS_PASS: 1, //店铺通过审核
    POSTAUDITSTATUS:{1:'通过',2:'驳回' ,3:'驳回'},//帖子的审核状态
    POSTHAVEPASS: 1, //帖子已经通过审核
    POSTHAVEUP: 1, //帖子已上架
}

ENUM.AREA_NAME = [
    'corporation', 'provinces', 'city', 'area', 'county', 'community'
]

ENUM.AREA_INFO = {
    'provinces': '省',
    'city': '市',
    'area': '县',
    'county': '镇',
    'community': '小区'
}

ENUM.CATEGORIES = {
    'carpoolingCar': '拼车租车',
    'jobHunting': '招聘求职',
    'secondHand': '二手物品',
    'buyRentHouse': '租房买房',
    'dating': '征婚交友',
    'wantedAny': '寻人寻物',
    'localMeet': '同城聚会',
    'businessPartnership': '创业合伙',
    'localService': '本地服务',
    'productPromotion': '商品促销',
}

ENUM.ITEMTYPE = {
    'home': 'home',//首页样式
    'simpletext': 'simpletext',//详情推荐样式
    'carpoolingCar': 'carpoolingCar',//拼车租车
    'jobHunting_1': 'jobHunting_1',//招聘求职
    'jobHunting_2': 'jobHunting_2',//招聘求职
    'secondHand': 'secondHand',//二手物品
    'buyRentHouse_2': 'buyRentHouse_2',//租房买房
    'buyRentHouse_1': 'buyRentHouse_1',//租房买房
    'dating': 'dating',//征婚交友
    'wantedAny': 'wantedAny',//寻人寻物
    'localMeet': 'localMeet',//同城聚会
    'businessPartnership': 'businessPartnership',//创业合伙
    'localService': 'localService',//本地服务
    'productPromotion': 'productPromotion',//商品促销
    'personal-page': 'personal-page',//我的个人主页
    'release-management': 'release-management',//我的发布管理
}

ENUM.LOGINURL = '/pages/login-register/loginEntrance/login'

ENUM.FROMURL={
    user: '/pages/user/user',
    release: '/pages/release/release',
    recharge:'/pages/release/recharge/index',
    payfor: '/pages/release/pay-for/index', 
    postId: '/pages/class/detail-master/index',
    shopId: '/pages/shopStore/detail/index',
    carpoolingCar: '/pages/class/carpoolingCar/carpoolingCar',
    payforPost: '/pages/release/pay-for/post-pay-for'
}

// 支付方式
ENUM.PAY_METHOD = {
    "e_coin": 'E币',
    "integral": '积分',
    "wx": '元'
}


export const POST_SEX = [{ key: 1, name: '男' }, { key: 2, name: '女' }, { key: 3, name: '保密' }]; //性别
ENUM.POST_SEX = POST_SEX

//命名方式: (1级类目)_(二级类目)
export const ROUTER_CLASS = {
    'carpoolingCar': '/pages/class/carpoolingCar/carpoolingCar',
    'jobHunting_2': '/pages/class/commonCategory/commonCategory?name=jobHunting_2',
    'jobHunting_1': '/pages/class/commonCategory/commonCategory?name=jobHunting_1',
    'secondHand': '/pages/class/commonCategory/commonCategory?name=secondHand',
    'buyRentHouse_1': '/pages/class/commonCategory/commonCategory?name=buyRentHouse_1',
    'buyRentHouse_2': '/pages/class/commonCategory/commonCategory?name=buyRentHouse_2',
    'dating': '/pages/class/commonCategory/commonCategory?name=dating',
    'wantedAny': '/pages/class/commonCategory/commonCategory?name=wantedAny',
    'localMeet': '/pages/class/commonCategory/commonCategory?name=localMeet',
    'businessPartnership': '/pages/class/commonCategory/commonCategory?name=businessPartnership',
    'localService': '/pages/class/commonCategory/commonCategory?name=localService',
    'productPromotion': '/pages/class/commonCategory/commonCategory?name=productPromotion',
}

//命名方式: (1级类目)_(二级类目)
export const ROUTER_CLASS_RELEASE = {
    'carpoolingCar': '/pages/class/carpoolingCar/release/index',//拼车租车
    'jobHunting_2': '/pages/class/jobHunting/job-wanted/index', //招聘求职-求职
    'jobHunting_1': '/pages/class/jobHunting/recruit/index', //招聘求职-招人
    'secondHand': '/pages/class/secondHand/index', // 二手
    'buyRentHouse_1': '/pages/class/buyRentHouse/index',  //房屋租赁-买房
    'buyRentHouse_2': '/pages/class/buyRentHouse/index', //房屋租赁- 买房
    'dating': '/pages/class/dating/index',//征婚交友
    'wantedAny': '/pages/class/wantedAny/index', // 寻人寻物
    'localMeet': '/pages/class/localMeet/index',//同城聚会
    'businessPartnership': '/pages/class/businessPartnership/index',//创业合伙
    'localService': '/pages/class/localService/index', //本地服务
    'productPromotion': '/pages/class/productPromotion/index',//商品促销
}

export const CATEGORY = {

    'jobHunting_1': {
        title: '招聘',
        noticebar: true,
        paging: { file: 'images/icon/job_hunting_ico_1.png', router: 'jobHunting_2' },
        tabList: [
            { id: 1, name: '推荐', index: 0 }
        ],
        labelList: [
        ],
        statistics: [
            { id: 1, name: '本站浏览:', file: 'visit_num' },
            { id: 2, name: '优质信息:', file: 'post_num' },
        ]
    },
    'jobHunting_2': {
        title: '求职',
        noticebar: true,
        paging: { file: 'images/icon/job_hunting_ico_2.png', router: 'jobHunting_1' },
        tabList: [
            { id: 1, name: '推荐', index: 0 }
        ],
        labelList: [
            { id: 1, name: '岗位推荐' },
            { id: 2, name: '岗位福利' }
        ],
        statistics: [
            { id: 1, name: '本站浏览:', file: 'visit_num' },
            { id: 2, name: '优质信息:', file: 'post_num' },
        ]
    },
    'secondHand': {
        title: '二手物品',
        noticebar: true,
        tabList: [
            { id: 1, name: '推荐', index: 0 },
            { id: 2, name: '出售', index: 1 },
            { id: 3, name: '求购', index: 2 }
        ],
        labelList: [],
        statistics: [
            { id: 1, name: '本站浏览:', file: 'visit_num' },
            { id: 2, name: '优质信息:', file: 'post_num' },
        ]
    },
    'buyRentHouse_1': {
        title: '租房买房',
        noticebar: false,
        paging: { file: 'images/icon/icon_zhaoren_1.png', router: 'buyRentHouse_2' },
        tabList: [
            { id: 1, name: '推荐', index: 0 },
            { id: 2, name: '新房', index: 1 },
            { id: 3, name: '二手房', index: 2 },
            { id: 4, name: '租房', index: 3 }
        ],
        labelList: [
            { id: 1, name: '新房', file: 'images/bg/icon_xinfang.png' },
            { id: 2, name: '二手房', file: 'images/bg/icon_ershoufang.png' },
            { id: 3, name: '租房', file: 'images/bg/icon_zufang.png' },
        ],
        statistics: [
            { id: 1, name: '本站浏览:', file: 'visit_num' },
            { id: 2, name: '优质信息:', file: 'post_num' },
        ]
    },
    'buyRentHouse_2': {
        title: '房屋租售',
        noticebar: false,
        paging: { file: 'images/icon/icon_zhaoren_2.png', router: 'buyRentHouse_1' },
        tabList: [
            { id: 1, name: '推荐', index: 0 },
            { id: 2, name: '新房', index: 1 },
            { id: 3, name: '二手房', index: 2 },
            { id: 4, name: '租房', index: 3 }
        ],
        labelList: [
            { id: 1, name: '新房', file: 'images/bg/icon_xinfang.png' },
            { id: 2, name: '二手房', file: 'images/bg/icon_ershoufang.png' },
            { id: 3, name: '租房', file: 'images/bg/icon_zufang.png' },
        ],
        statistics: [
            { id: 1, name: '本站浏览:', file: 'visit_num' },
            { id: 2, name: '优质信息:', file: 'post_num' },
        ],
    },
    'dating': {
        title: '征婚交友',
        noticebar: true,
        tabList: [
            { id: 1, name: '推荐', index: 0 },
            { id: 2, name: '找男友', index: 1 },
            { id: 3, name: '找女友', index: 2 },
        ],
        labelList: [],
        statistics: [
            { id: 1, name: '本站浏览:', file: 'visit_num' },
            { id: 2, name: '优质信息:', file: 'post_num' },
        ]
    },
    'wantedAny': {
        title: '寻人寻物',
        noticebar: true,
        tabList: [
            { id: 1, name: '推荐', index: 0 },
            { id: 2, name: '打听', index: 1 },
            { id: 3, name: '寻人', index: 2 },
            { id: 4, name: '寻物', index: 3 },
            { id: 5, name: '失物招领', index: 4 }
        ],
        labelList: [],
        statistics: [
            { id: 1, name: '本站浏览:', file: 'visit_num' },
            { id: 2, name: '优质信息:', file: 'post_num' },
        ]
    },
    'localMeet': {
        title: '同城聚会',
        noticebar: true,
        tabList: [
            { id: 1, name: '推荐', index: 0 },
            { id: 2, name: '吃喝玩乐', index: 1 },
            { id: 3, name: '文化生活', index: 2 },
            { id: 4, name: '体育运动', index: 3 }
        ],
        labelList: [],
        statistics: [
            { id: 1, name: '本站浏览:', file: 'visit_num' },
            { id: 2, name: '优质信息:', file: 'post_num' },
        ]
    },
    'businessPartnership': {
        title: '创业合伙',
        noticebar: true,
        tabList: [
            { id: 1, name: '推荐', index: 0 },
        ],
        labelList: [],
        statistics: [
            { id: 1, name: '本站浏览:', file: 'visit_num' },
            { id: 2, name: '优质信息:', file: 'post_num' },
        ]
    },
    'localService': {
        title: '本地服务',
        noticebar: true,
        tabList: [
            { id: 1, name: '推荐', index: 0 },
            { id: 2, name: '家政服务', index: 1 },
            { id: 3, name: '维修服务', index: 2 },
            { id: 4, name: '其它', index: 99 }
        ],
        labelList: [],
        statistics: [
            { id: 1, name: '本站浏览:', file: 'visit_num' },
            { id: 2, name: '优质信息:', file: 'post_num' },
        ]
    },
    'productPromotion': {
        title: '商品促销',
        noticebar: true,
        tabList: [
            { id: 1, name: '推荐', index: 0 },
        ],
        labelList: [],
        statistics: [
            { id: 1, name: '本站浏览:', file: 'visit_num' },
            { id: 2, name: '优质信息:', file: 'post_num' },
        ]
    },
}
export default ENUM
