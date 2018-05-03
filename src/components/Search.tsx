import * as React from "react";
import * as classNames from "classnames";

/**
 * Properties for the Search component.
 * @typedef {Interface} Props
 * @property {boolean} searching a flag indicating the search active state.
 * @property {Function} search the open handler.
 *
 * @private
 * @interface
 */
interface Props {
  searching: boolean;
  search: (term: string) => void;
}

/**
 * State for the Search component.
 * @typedef {Interface} State
 * @property {boolean} focused a flag indicating the search box is focused.
 * @property {string} requiredError
 *   a flag indicating the search box is missing a required value.
 *
 * @private
 * @interface
 */
interface State {
  focused: boolean;
  requiredError: boolean;
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
export default class Search extends React.Component<Props, State> {
  private input: React.RefObject<HTMLInputElement>;

  /**
   * Class constructor.
   * @param {Props} props the properties of the search.
   */
  public constructor(props: Props) {
    super(props);
    this.state = { requiredError: false, focused: false };
    this.input = React.createRef();
    this.searchKeydownHandler = this.searchKeydownHandler.bind(this);
  }

  /** @inheritdoc */
  public componentDidUpdate() {
    if (this.props.searching) {
      this.input.current.focus();
    }
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    const error = { error: this.state.requiredError };
    const focused = { focused: this.state.focused };
    const searchBoxClasses = classNames("search-box", focused, error);
    const searchPanelClasses = classNames("search-panel", focused, error);
    const searchIndicatorClasses = classNames(
      "search-indicator",
      focused,
      error
    );

    return (
      <div className={searchPanelClasses}>
        <input
          placeholder="Show me..."
          className={searchBoxClasses}
          onBlur={() => this.focusHandler(false)}
          onFocus={() => this.focusHandler(true)}
          onKeyDown={e => this.searchKeydownHandler(e)}
          ref={this.input}
        />
        <i className={searchIndicatorClasses} />
      </div>
    );
  }

  /**
   * Handles the keydown events.
   * @param {React.KeyboardEvent<HtmlInputElement>} event the event.
   * @return {void}
   *
   * @private
   * @method
   */
  private searchKeydownHandler(
    event: React.KeyboardEvent<HTMLInputElement>
  ): void {
    if (event.key === "Enter" || event.keyCode === 13) {
      if (!this.input.current.value) {
        this.setState({ requiredError: true }, () => {
          setTimeout(() => this.setState({ requiredError: false }), 1000);
        });
      } else {
        this.setState({ requiredError: false });
        this.props.search(this.input.current.value);
      }

      event.preventDefault();
    }
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
    this.setState({ focused });
  }
}
