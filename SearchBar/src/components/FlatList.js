const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class FlatListHelper extends React.PureComponent {
  componentDidMount() {
    let { tabRoute, animation, addHandlerScroll } = this.props;

    addHandlerScroll(tabRoute, this.scrollToOffset);

    setTimeout(() => { // Fix bug initialScroll set
      this.scrollToOffset(animation.initialScroll, false)
    }, 250);
  }

  scrollToOffset = (offset, animated = true) => {
    this.flatList.getNode().scrollToOffset({offset, animated});
  };

  _onScrollEndDrag = e => {
   [...]
  };

  render() {
    let { scrollY, fullHeight } = this.props.animation;
    let { contentContainerStyle } = this.props;
    
    return (
      <AnimatedFlatList
        {...this.props}
        scrollEventThrottle={1}  
        onScrollEndDrag={this._onScrollEndDrag}
        contentContainerStyle={[
          {paddingTop: fullHeight + ifIphoneX(15, 0)}, 
          contentContainerStyle
        ]}
        ref={component => { 
          this.flatList = component; 
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      />
    );
  }
}

// HOC
const withSearchBarContext = Comp => props => (
  <SearchBarContext.Consumer>
    {(context) => 
      <Comp
        {...context}
        {...props} 
      />
    }
  </SearchBarContext.Consumer>
);

export default withSearchBarContext(FlatListHelper);