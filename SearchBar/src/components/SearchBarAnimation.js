export default class SearchBarAnimation {
  statusBarHeight = 21;
  wrapperHeight = 177;
  paddingStatusBar = 41;
  arrowHeight = 36 - ifIphoneX(2, 0);
  topPartHeight = this.arrowHeight + 45 + 10; // arrowHeight + inputHeight + padding (Top part)
  fullHeight = this.topPartHeight + 131; // = 222
  distanceRange = this.fullHeight - this.topPartHeight;
  maxClamp = this.fullHeight - (this.paddingStatusBar + this.statusBarHeight);
  minClamp = this.topPartHeight;
  diffClamp = this.maxClamp - this.minClamp;
  
  initialScroll = this.topPartHeight;
  maxActionAnimated = 88; // Location input height + padding (Bottom part)
  actionAnimated = new Animated.Value(0);
  scrollY = new Animated.Value(this.initialScroll);
  
  stateBarTypes = { CLAMPED: 1, NORMAL: 2, EXPANDED: 3 };
  stateBar = this.stateBarTypes.NORMAL;

  constructor(initialState) {
    this.initialState = initialState;

    this.scrollY.addListener(this._updateScroll);
  }

  destroy() {
    this.scrollY.removeAllListeners();
  }

  _updateScroll = () => {
    [...]
  };
  
  getTransformWrapper() {
    return {
      transform: [{
        translateY: Animated.add(
          Animated.multiply(this.clampedScroll, -1),
          this.scrollY.interpolate({ // To negative
            inputRange: [0, 1],
            outputRange: [0, -1],
          }).interpolate({ // Add bottom height part 
            inputRange: [-this.topPartHeight, 0],
            outputRange: [0, this.minClamp],
            extrapolate: 'clamp',
          })
        )
      }]
    };
  }

  getTransformSearchBar() {
    return {
      transform: [{
        translateY: this.scrollY.interpolate({
          inputRange: [0, this.topPartHeight],
          outputRange: [0, this.topPartHeight - this.arrowHeight],
          extrapolate: 'clamp',
        })
      }]
    };
  }

  getOpacitySearchBar() {
    return {
      opacity: this.clampedScroll.interpolate({
        inputRange: [this.topPartHeight, this.maxClamp],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      })
    };
  }

  getOpacityLocationInput() {
    return {
      opacity: this.scrollY.interpolate({
        inputRange: [0, this.topPartHeight],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      })
    };
  }

  getArrowMinimizeStyle() {
    return {
      transform: [{
        translateY: this.scrollY.interpolate({
          inputRange: [0, this.topPartHeight],
          outputRange: [0, this.topPartHeight],
          extrapolate: 'clamp',
        })
      }],
      opacity: this.scrollY.interpolate({
        inputRange: [0, this.topPartHeight],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      })
    };
  }

  animationProps = {
    [...]
  };
}