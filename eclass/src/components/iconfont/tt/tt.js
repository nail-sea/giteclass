Component({
  properties: {
    // icon_zhaopianshanchu | icon_dianpuguanli | icon_guanyuEwang | icon_fuzhilianjie1 | icon_weixin | icon_Shanchumima | icon_qiehuan | icon_fuzhilianjie | icon_pengyouquan | icon_fanbailogo | icon_fenxiangerweima | icon_mingxi | icon_deal | icon_zhuye | icon_dikuangfenxiang | icon_boy | icon_dingwei | icon_girl | icon_ew | icon_dianpuruzhu | icon_kaitongEfeng | icon_shangjiaguanli | icon_wodefabu | icon_lishijilu | icon_xiaoxizhognxin | icon_zhanghuguanli | icon_wodekaquanyouhuiquanguanli | icon_zhanzhangguanli | icon_kefu | icon_yaoqingma | icon_moren | icon_shezhi | ic_phone | icon_shenhezhong | icon_guoqi | icon_weitongguo | icon_yitongguo | icon_jian | icon_jia | icon_zuchedinbiaoshi | icon_renminbi | icon_weixinzhifu | icon_zhifubao | icon_tianjia | icon_theyuan1 | icon_choose | icon_kechakan | icon_fengxiang1 | icon_liulan | icon_yanzhengma | icon_xinxi | icon_shanchu | icon_dui | icon_shijian | icon_zhankai | icon_shouqi | icon_shuaxin | ic_back | ic_share | ic_xiala1 | ic_zhankai_big | duihao_default | ic_qianbao | ic_xiangji | duihao_selected | ic_dian | ic_zhankai | ic_xiala | ic_sousuo
    name: {
      type: String,
    },
    // string | string[]
    color: {
      type: null,
      value: '',
      observer: function(color) {
        this.setData({
          isStr: typeof color === 'string',
        });
      }
    },
    size: {
      type: Number,
      value: 18,
      observer: function(size) {
        this.setData({
          svgSize: size / 750 * tt.getSystemInfoSync().windowWidth,
        });
      },
    },
  },
  data: {
    svgSize: 18 / 750 * tt.getSystemInfoSync().windowWidth,
    quot: '"',
    isStr: true,
  },
});
