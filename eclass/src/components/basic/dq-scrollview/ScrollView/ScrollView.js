import Taro, { PureComponent } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import PropTypes from 'prop-types'

import './index.scss'

class EScrollView extends PureComponent {
	constructor(props) {
    super(props)
  }
  
	render() {
    const { onScroll , scrollStyle , onTouchEnd, onTouchMove , onTouchStart, onScrollToUpper , onScrollToLower,scrollIntoView} = this.props


		return (
      <ScrollView scrollY className='scrollview-container'
          style={scrollStyle}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchStart={onTouchStart}
          onScrollToUpper={onScrollToUpper}
          onScrollToLower={onScrollToLower}
          onScroll={onScroll}
          scrollIntoView={scrollIntoView}
          // lowerThreshold={loadMoreThreshold >= 0 ? loadMoreThreshold : 100}
          // enableBackToTop
        >
          {this.props.children}
        </ScrollView>
		)
	}
}

EScrollView.propTypes = {
  // scrollStyle: PropTypes.style,
  onTouchMove: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchStart: PropTypes.func,
  onScrollToUpper: PropTypes.func,
  onScrollToLower: PropTypes.func,
  onScroll: PropTypes.func,
  scrollIntoView: PropTypes.string,
}
EScrollView.defaultProps = {
  scrollStyle:{},
  onTouchMove: () => {},
  onTouchEnd: () => {},
  onTouchStart: () => {},
  onScrollToUpper: () => {},
  onScrollToLower: () => {},
  onScroll: () => {},
  scrollIntoView:''
}

export default EScrollView
