export default class SearchBarProvider extends React.Component {
  constructor(props) {
    super(props);

    this.searchBarAnimation = new SearchBarAnimation({
      scrollToOffset: (configScroll) => {
        let tab = configScroll.tab ? configScroll.tab : this.props.currentTab;

        let scrollToOffset = this._handlersScroll[tab];
        scrollToOffset && scrollToOffset(configScroll.offset, configScroll.animated);
      }
    });

    this.state = {
      currentTab: null,
      canJumpToTab: true,
      contextProvider: {
        animation: this.searchBarAnimation.animationProps, 
        addHandlerScroll: this._addHandlerScroll,
      }
    };
  }

  componentWillUnmount() {
    this.searchBarAnimation.destroy();
  }

  _handlersScroll = {};
  _addHandlerScroll = (tab, handler) => {
    this._handlersScroll[tab] = handler;
  };

  render() {
    return (
      <SearchBarContext.Provider value={this.state.contextProvider}>
        {this.props.children(this.searchBarAnimation)}
      </SearchBarContext.Provider>
    );
  }
}