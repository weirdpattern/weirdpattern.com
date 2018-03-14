import * as React from "react";
import * as classNames from "classnames";

/**
 * Search props
 * @typedef {Interface} Props
 * @property {Function} closeSearch closes the search dialog.
 * @property {Function} performSearch performs a search.
 *
 * @private
 * @interface
 */
interface Props {
  performSearch: (term: string) => void;
  closeSearch: Function;
}

/**
 * Search state
 * @typedef {Interface} State
 * @property {boolean} error a flag indicating there was an error in the search.
 *
 * @private
 * @interface
 */
interface State {
  error: boolean;
}

/**
 * Search component
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the search.
 *
 * @public
 * @function
 */
export default class Search extends React.PureComponent<Props, State> {
  private input: HTMLInputElement;

  /**
   * Class constructor
   * @param {Props} props the properties of the search.
   */
  public constructor(props: Props) {
    super(props);

    this.state = { error: false };
    this.searchKeydownHandler = this.searchKeydownHandler.bind(this);
  }

  /** @inheritdoc */
  public componentDidMount() {
    this.input.focus();
    setTimeout(() => {
      this.input.value = "";
    }, 1);
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    const { error } = this.state;
    const searchBoxClass = classNames("search-box", { error });

    return (
      <div
        role="button"
        tabIndex={-1}
        className="overlay"
        onClick={() => this.props.closeSearch()}
        onKeyDown={() => {}}
      >
        <input
          className={searchBoxClass}
          onKeyDown={e => this.searchKeydownHandler(e)}
          ref={input => (this.input = input)}
        />
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
    if (event.key === "Esc" || event.keyCode === 27) {
      this.props.closeSearch();
      event.preventDefault();
    } else if (event.key === "Enter" || event.keyCode === 13) {
      if (!this.input.value) {
        this.setState({ error: true }, () => {
          setTimeout(() => this.setState({ error: false }), 3000);
        });
      } else {
        this.props.performSearch(this.input.value);
        this.props.closeSearch();
      }

      event.preventDefault();
    }
  }
}
