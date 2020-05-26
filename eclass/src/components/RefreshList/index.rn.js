import Taro, { Component, PureComponent } from "@tarojs/taro";
import {DqListView} from '@/components'
class RefreshListView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  
      list:[], 
      hasMore:true,
      refreshing:false
    }
    this.page = props.initPage || 1
  }

  _onLoadMore = async () => {
    const {getListData} = this.props
    if (typeof getListData === 'function') {
      this.page ++
      try {
        const data = await getListData(this.page)
        const {list:currentList} = this.state
        const nextList = [...currentList, ...data]
        const hasMore = this._isHasMore()
        if (hasMore) {
          this.setState({list:nextList, hasMore})
        }
      } catch (error) {
      }
    }
  }

  _onRefresh = () => {
    this.page = props.initPage || 1
    this.setState({refreshing:true}, async () => {
      const {getListData} = this.props
      try {
        const data = await getListData(this.page)
        this.setState({list:data})
      } catch (error) {
        console.log(error)
      } finally{
        this.setState({refreshing:false})
      }
    })
  }

  _isHasMore = (nextList, currentList) => {
    if (typeof this.props.isHasMore === 'function') {
      return this.props.isHasMore(nextList, currentList)
    }
    return nextList.length > currentList.length
  }

  _renderItem = (item, index) => {
    return this.props.renderItem(item, index)
  }

  render() {
    return (
      <DqListView
        renderItem={this._renderItem}
        data={this.state.list}
        hasMore={this.state.hasMore}
      />
    );
  }
}

RefreshListView.defaultProps = {
  initPage:1, 
  getListData:() => [],
  renderItem:() => {},
  isHasMore: null
}

export default RefreshListView;