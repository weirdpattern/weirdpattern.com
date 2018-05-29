import * as React from "react";
import * as classNames from "classnames";

import Overlay from "./Overlay";
import SearchResults from "./SearchResults";

/**
 * Properties for the Search component.
 * @typedef {Interface} Props
 * @property {any} index the index to be used.
 * @property {boolean} searching a flag indicating the user is searching.
 * @property {Function} close closes the search.
 *
 * @private
 * @interface
 */
interface Props {
  index: any;
  searching: boolean;
  close: Function;
}

/**
 * State for the Search component.
 * @typedef {Interface} State
 * @property {boolean} focused a flag indicating the search box is focused.
 * @property {Array<any>} results the results of the search.
 *
 * @private
 * @interface
 */
interface State {
  focused: boolean;
  results: Array<any>;
}

/**
 * Social component.
 * @param {Props} props the properties of the component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the social.
 *
 * @public
 * @function
 */
export default class Search extends React.PureComponent<Props, State> {
  private index: any;
  private input: React.RefObject<HTMLInputElement>;

  /**
   * Class constructor.
   * @param {Props} props the properties of the search.
   */
  public constructor(props: Props) {
    super(props);

    this.input = React.createRef();

    this.state = { focused: false, results: [] };
    this.searchHandler = this.searchHandler.bind(this);
  }

  /** @inheritdoc */
  public componentDidUpdate() {
    if (this.props.searching) {
      this.input.current.focus();
    }
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    const { close, searching } = this.props;

    const focused = { focused: this.state.focused };
    const searchBoxClasses = classNames("search-box", focused);
    const searchPanelClasses = classNames("search-panel", focused);
    const searchIndicatorClasses = classNames("search-indicator", focused);

    return (
      searching && (
        <Overlay close={close}>
          <div className={searchPanelClasses}>
            <input
              placeholder="Show me..."
              className={searchBoxClasses}
              onBlur={() => this.focusHandler(false)}
              onFocus={() => this.focusHandler(true)}
              onChange={e => this.searchHandler(e)}
              ref={this.input}
            />
            <i className={searchIndicatorClasses} />
          </div>
          {this.state.results.length > 0 && (
            <SearchResults results={this.state.results} />
          )}
        </Overlay>
      )
    );
  }

  /**
   * Handles the keydown events.
   * @param {React.ChangeEvent<HtmlInputElement>} event the event.
   * @return {void}
   *
   * @private
   * @method
   */
  private searchHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    this.search(this.input.current.value);
  }

  /**
   * Handles the focus state of the search box.
   * @param {boolean} focused a flag indicating the search box is focused.
   * @returns {void}
   *
   * @private
   * @method
   */
  private focusHandler(focused: boolean): void {
    if (this.input.current.value) {
      this.setState({ focused });
    } else {
      this.setState({ focused, results: [] });
    }
  }

  /**
   * Performs a search.
   * @param {string} term the term to be searched.
   * @returns {void}
   *
   * @private
   * @method
   */
  private search(term: string): void {
    if (!term) {
      this.setState({ results: [] });
      return;
    }

    const index = this.props.index;

    this.setState({
      results: index
        .search(term, { expand: true })
        .map(({ ref }: any) => index.documentStore.getDoc(ref))
    });
  }
}
