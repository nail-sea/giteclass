import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image ,ScrollView } from "@tarojs/components";
import { TitleBar, SearchBar, NoData , TabSelect} from "@/components";
import { connect } from "@tarojs/redux";
import storage from "@/utils/storage";
import { setLocation } from "@/config/requestConfig";
import ENUM, { ROUTER_CLASS } from "@/config/enum";
import ItemMaster from "@/pages/class/item-master/index";
import { getWindowHeight } from "@/utils/style";
import stdArray , { stdConfig , getPlatform} from "@/utils/common";
import ItemHome from "../../shopStore/item-home";
import decorator from '@/config/decorator'
import Dq from "@/config/Dq";

import "./searchList.scss";

@connect(({ search, location }) => ({
  ...search,
  ...location
}))
@decorator()
class SearchPage extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      page:0,
      showItems:null, //当前搜索显示链表

      loading: false,
      hasMore: true,
      searchText: "", //搜索内容
      title: "搜索结果", //头部标题
      from: "", //跳转来的页面
      tabSel: [
        {
          id: 0,
          label_born: "位置",
          label: "位置",
          selector: ["selectorEduChecked"],
          active: false
        },
        {
          id: 1,
          label_born: "时间",
          label: "时间",
          selector: ["selectorSalaryChecked"],
          active: false
        },
        // {
        //   id: 2,
        //   label_born: "地点",
        //   label: "地点",
        //   selector: ["selectorPlaceChecked"],
        //   active: false
        // },
        {
          id: 2,
          label_born: "排序",
          label: "排序",
          selector: ["selectorTimeChecked"],
          active: false
        }
      ],
      tabSelCurrent: -1,
      selectorChecked:{0:[0],1:[0],2:[0],3:[0]},
      selectorItems:{
        0:[],
        1:[
          { id: 0, label: "全部" },
          { id: 1, label: "今天" },
          { id: 2, label: "近三天" }
        ],
        // 2:[
        //   { id: 0, label: "不限" },
        //   { id: 1, label: "附近" },
        //   { id: 2, label: "500m" },
        //   { id: 3, label: "1km" },
        //   { id: 4, label: "3km" },
        //   { id: 5, label: "5km" },
        //   { id: 6, label: "10km" }
        // ],
        2:[
          { id: 0, label: "全部" },
          { id: 1, label: "正序" },
          { id: 2, label: "倒序" }
        ]
      },



    };
  }

  handleBack = () => {
    //当前页面返回，清除所有页面 返回跳来搜索的模块页
    if (getPlatform().isRN) {
      Dq.navigateBack({delta:1})      
    } else {
      Dq.redirectTo({
        // url:  `/pages/search/search?from=${this.state.from}`//this.state.from
        url: ROUTER_CLASS[this.state.from] || this.state.from
        // url: 'pages/release/release'
      });
    }
    let page = Taro.getCurrentPages();
    // console.log(page);
  };

  componentDidMount() {
    if(this.$router.params.from == '/pages/shopStore/index'){
      this.state.tabSel[0].label_born = '全部分类';
      this.state.tabSel[0].label = '全部分类';
      this.state.tabSel[0].active = true;

      this.setState({selectorItems:
        {
          0:[],
          1:[
            { id: 0, label: "全部" , name: 'total'},
            { id: 1, label: "今天" , name: 'today'},
            { id: 2, label: "昨天" , name: 'yesterday'},
            { id: 3, label: "本周" , name: 'week'},
            { id: 4, label: "本月" , name: 'month'},
            { id: 5, label: "本年" , name: 'year'},
            { id: 6, label: "3天" , name: '3day'},
            { id: 7, label: "7天" , name: '7day'},
            { id: 8, label: "30天" , name: '30day'},
            { id: 9, label: "90天" , name: '90day'},
          ],
          // 2:[
          //   { id: 0, label: "不限" , name:0},
          //   { id: 1, label: "1km" , name:1},
          //   { id: 2, label: "3km" , name:3},
          //   { id: 3, label: "5km" , name:5},
          //   { id: 4, label: "10km" , name:10}
          // ],
          2:[
            { id: 0, label: "默认" , name: 'audit_time'},
            { id: 1, label: "浏览量" , name: 'visit_num'},
            { id: 2, label: "销售量" , name: 'sell_coupon_num'}
          ]
        }
      })

    }else{

      const areainfo = storage.getInstance().getAreainfo();
      let sel_label = areainfo.cur_area.name;
      if (sel_label.length > 4) {
        sel_label = sel_label.substring(0, 4);
      }
      this.state.tabSel[0].label_born = sel_label;
      this.state.tabSel[0].label = this.state.tabSel[0].label_born;
      this.state.tabSel[0].active = true;
    }

    const searchText = decodeURI(this.$router.params.searchText || "")

    this.setState({
      tabSel: this.state.tabSel,
      title: this.$router.params.title || "搜索结果",
      from: this.$router.params.from || "",
      searchText: searchText
    }, () => {
      this.sendSearchList(0)
    })
  }

  handleToSearch = () => {
    //跳转去搜索页
    Dq.redirectTo({
      url: `/pages/search/search?from=${this.state.from}`
    });
  };

  setLocationInfo = (cur_area_id, cur_area_name) => {
    //
    let cityarr = []; //
    const area_arr = this.props.locationData[cur_area_id];
    cityarr.push({ id: 0, city_id: cur_area_id, label: "全" + cur_area_name });
    let tick = 1;
    for (let key in area_arr) {
      if (area_arr[key].city_id == -1) {
        continue;
      }
      let area = {};
      area.id = tick;
      area.label = area_arr[key].city_name;
      area.city_id = area_arr[key].city_id;

      cityarr.push(area);

      tick += 1;
    }
    this.state.selectorItems[0] = cityarr
    this.setState({ selectorItems: this.state.selectorItems });
  };

  //选择定位
  selectCurrentLocation = () => {
    const areainfo = storage.getInstance().getAreainfo();
    var that = this;
    let up_area = areainfo.cur_area;
    if (areainfo.area_level >= 5) {
      up_area = areainfo.area_info["county"];
    }
    const location_info = this.props.locationData[up_area.id];
    if (!location_info) {
      this.props
        .dispatch({
          type: "location/getLevelArea",
          payload: {
            up_id: up_area.id
          }
        })
        .then(res => {
          that.setLocationInfo(up_area.id, up_area.name);
          // console.log("locationData");
        });
    } else {
      that.setLocationInfo(up_area.id, up_area.name);
    }
  }

  getCategoryMsg(page){
    let {
      from,
      selectorItems,
      selectorChecked,
      searchText,
    } = this.state;
    
    let msg = {}
    if(searchText.length > 0){
      msg = {
        page:page +1,
        __location: 1,
        root: from,
        key_word: searchText
      }
      const arr_root = stdArray.splitString(from , '_')
      if(arr_root.length <= 0){
        console.error("searchList");
        return;
      }
      msg.primary_category = arr_root[0];//payload.root
      if(arr_root.length > 1)msg.second_category = arr_root[1];
    }else{
      msg.root = from;
      msg.page = page+1;

      if(selectorChecked[1][0] > 0)msg.publish_time = selectorChecked[1][0] + 1;
      if(selectorChecked[2][0] > 0)msg.distance = selectorChecked[2][0] + 1;
      if(selectorChecked[3][0] > 0)msg.order_type = selectorChecked[3][0];
      setLocation(2, msg);
      if (selectorItems[0].length > 0) {
        const areainfo = storage.getInstance().getAreainfo();
        let level = areainfo.area_level;
        if (level < 5) {
          level += 1; //区域等级
        }
        const type = ENUM.AREA_NAME[level];
        msg[type + "_id"] = selectorItems[0][selectorChecked[0][0]].city_id; //区域id
        // console.log("handleChange",level,type,msg[type]);
      }

      const arr_root = stdArray.splitString(from , '_')
      if(arr_root.length <= 0){
        console.error("searchList");
        return;
      }
      msg.primary_category = arr_root[0];//payload.root
      if(arr_root.length > 1)msg.second_category = arr_root[1];
    }

    return msg;
  }
  sendSearchList(page){
    
    let {
      from,
      selectorItems,
      selectorChecked,
      searchText,
    } = this.state;
    // console.log( "selectorSalaryChecked",selectorChecked);
    let msg = {}

    if(from == '/pages/home/index'){
      msg = {
        page:page +1,
        __location: 2,
        root: from,
        key_word: searchText
      }
    }else if(from == '/pages/shopStore/index'){
      if(searchText.length > 0){
        msg = {
          page:page +1,
          __location: 1,
          root: from,
          search_keyword: searchText
        }
      }else{
        if(selectorChecked[0][0] > 0) msg.primary_category = selectorItems[0][selectorChecked[0][0]].name;
        if(selectorChecked[1][0] > 0) msg.date_type = selectorItems[1][selectorChecked[1][0]].name;
        if(selectorChecked[2][0] > 0) msg.district_scope = selectorItems[2][selectorChecked[2][0]].name;
        if(selectorChecked[3][0] > 0) msg.sort_type = selectorItems[3][selectorChecked[3][0]].name;
        msg.__location = 1;
        msg.page = page + 1;
        msg.root = from;
      }
    }else{
      msg = this.getCategoryMsg(page);
    }
    
    // console.log("msg", msg);
    this.props.dispatch({
      type: "search/searchList",
      payload: msg
    }).then(data => {
      // console.log('searchList',data);
      if(data.list.length > 0){
        this.setState(prevState => ({
          page:data.page,
          showItems: data.page > 1 ? prevState.showItems.concat(data.list || []) : data.list,
          hasMore: data.list.length > 9,
          loading: false
        }));
      }else{
        this.setState({loading: false , hasMore: data.list.length > 0,showItems: data.page > 1 ? this.state.showItems : []})
      }
    });
  }
  handleChange = (key, tit, value) => {
    let { tabSelCurrent } = this.state;
    //更改当前页面state
    this.state[key] = value;
    this.setState({ [key]: value });
    // console.log("handleChange", key, tit, value);
    
    if (
      key == "tabSelCurrent" &&
      value == 0 &&
      this.state.selectorItems[0].length == 0
    ) {
      if(this.state.from == '/pages/shopStore/index'){
        let allitem = []
        const all_config = stdConfig.shopcategory;
        let tick = 0
        allitem.push({ id: tick, label: '全部分类' , name:''})
        tick += 1
        for(let key in all_config){
          const title = all_config[key].title;
          allitem.push({ id: tick, label: title , name:key})
          tick += 1
        }
        this.state.selectorItems[0] = allitem
      }else{
        this.selectCurrentLocation();
      }
    }
  };

  handleChecked = (item) => {
    const { tabSelCurrent } = this.state
    // console.log('onSelect', this.state.tabSelCurrent ,item)
    this.state.selectorChecked[this.state.tabSelCurrent] = [item]
    let sel_label = this.state.selectorItems[tabSelCurrent][item].label;
    if (sel_label.length > 4) {
      sel_label = sel_label.substring(0, 4);
    }
    console.log("tabSelCurrent",tabSelCurrent);
    this.state.tabSel[tabSelCurrent].label = item
      ? sel_label
      : this.state.tabSel[tabSelCurrent].label_born;
    this.state.tabSel[tabSelCurrent].active =
    tabSelCurrent == 0 ? true : item;
      
    this.setState(prevState => ({
      tabSel: this.state.tabSel,
      tabSelCurrent: -1,
      selectorChecked:this.state.selectorChecked,
      // searchText: ""
    }),() => {
      this.sendSearchList(0);
    })
  }

  handleClear = id => {
    //清空当前选择
    this.state.tabSel
      .find(item => {
        return item.id == id;
      })
      .selector.forEach(item => {
        this.setState({ [item]: [0] });
      });
  };
  onToDetail = (id, type) => {
    //查看详情
    if (!type) {
      // const from_arr = this.state.from.split('/');
      type = "jobHunting";
    }

    Dq.navigateTo({
      url: `/pages/class/detail-master/index?post_id=${id}`
    });
  };

  loadRecommend = async () => {
    // console.log('loadRecommend')
    if (!this.state.hasMore || this.state.loading) {
      return;
    }
    this.setState({ loading: true }, () => {
      this.sendSearchList(this.state.page);
    });

  };

  //选择器
  renderTabSelect(){
    const {
      tabSel,
      tabSelCurrent,
      selectorItems,
      selectorChecked
    } = this.state;

    return (
        <TabSelect
          tabList={tabSel}
          current={tabSelCurrent}
          onTab={this.handleChange.bind(this, "tabSelCurrent", "")}
          onClear={this.handleClear.bind(this)}
          items={selectorItems}
          checked={selectorChecked}
          onChecked={this.handleChecked.bind(this)}
        >
        </TabSelect>
    )
  }

  render() {
    const { showItems } = this.state;
    const {
      from,
      searchText,
      title,
      tabSelCurrent,
    } = this.state;
    const headerHeight = from != "/pages/home/index" ? (57 + 51) : 57

    return (
      <View
        className={tabSelCurrent === -1 ? "search-list" : "search-list--fixed"}
      >
        <TitleBar
          title={title}
          customBack={true}
          handleBack={this.handleBack.bind(this)}
        />
        <View className="search-list__header">
          <SearchBar
            mode="search"
            title={searchText}
            handleSearch={this.handleToSearch.bind(this)}
          />
        </View>

        {from != "/pages/home/index" && this.renderTabSelect()}

        {showItems && showItems.length > 0 && (
          <ScrollView
          scrollY
          className="home__wrap"
          onScrollToLower={this.loadRecommend}
          style={{ height: getWindowHeight(false, true, headerHeight)}}
        >
          <View className="search-list__list">
            {searchText.length > 0 && (
              <View className="search-list__list__title">
                <Text className="search-list__list__title__text">{"“" + searchText + "”的搜索信息"}</Text>
              </View>
            )}
            {showItems.map((item, index) => {
              return (
                from == '/pages/shopStore/index' 
                ?
                <ItemHome key={item.id} data = {item}/>
                :
                <ItemMaster
                  key={item.id}
                  item_data={item}
                  type={this.state.from}
                  onHandleDetail={this.onToDetail.bind(
                    this,
                    item.post_id,
                    item.primary_category
                  )}
                />
                
              );
            })}
          </View>
          <View className="list__bottom__loading">
            {this.state.loading && (
              <Text className="list__bottom__loading-txt">正在加载中...</Text>
            )}
            {!this.state.hasMore && (
              <Text className="list__bottom__loading-txt">
                更多内容，敬请期待
              </Text>
            )}
          </View>
          </ScrollView>
        )}
        {(showItems && showItems.length <= 0) && (
          <View>
            <NoData
              title={searchText.length > 0 ?  searchText + "的搜索信息" : null}
              tips="搜索暂无结果，换换其他的搜索方式吧"
            />
          </View>
        )}
      </View>
    );
  }
}
export default SearchPage;