import * as React from "react";
import * as classNames from "classnames";

import Link from "gatsby-link";
import { kebabCase } from "lodash";

import { ValueCount } from "../interfaces";

/**
 * Properties for the DropdownButton component.
 * @typedef {Interface} Props
 * @property {string} text the text to be displayed.
 * @property {Array<ValueCount>} data the source of the dropdown button.
 *
 * @private
 * @interface
 */
interface Props {
  text: string;
  data: Array<ValueCount>;
}

/**
 * State for the DropdownButton component.
 * @typedef {Interface} Props
 * @property {boolean} expanded
 *   a flag indicating whether the dropdown is open or not.
 *
 * @private
 * @interface
 */
interface State {
  expanded: boolean;
}

/**
 * DropdownButton component.
 * @param {Props} props the properties of the component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the dropdown button.
 *
 * @public
 * @function
 */
export default class DropdownButton extends React.PureComponent<Props, State> {
  /**
   * Class constructor.
   * @param {Props} props the properties of the drppdown button.
   */
  public constructor(props: Props) {
    super(props);

    this.state = { expanded: false };
    this.clickHandler = this.clickHandler.bind(this);
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    const { text, data } = this.props;

    const sorted = data.sort((a: ValueCount, b: ValueCount): number => {
      return b.totalCount - a.totalCount;
    });

    return (
      <li className="dropdown">
        <div className="dropdown-button">
          <span className="total">{data.length}</span>
          <span className="total-label">{text}</span>
          <i className="arrow-down" />
        </div>
        <ul className="dropdown-list">
          {data.map((item: ValueCount, index: number) => {
            return (
              <li key={index}>
                <Link
                  to={
                    "/" +
                    text +
                    "/" +
                    encodeURIComponent(kebabCase(item.fieldValue))
                  }
                >
                  {item.fieldValue} ({item.totalCount})
                </Link>
              </li>
            );
          })}
        </ul>
      </li>
    );
  }

  /**
   * Handles the click event.
   * @returns {void}
   *
   * @private
   * @method
   */
  private clickHandler(): void {
    this.setState({ expanded: !this.state.expanded });
  }
}

/*
<div className="dropdown">
        <ul
          onClick={() => this.clickHandler()}
        >
          <span className="total">{data.length}</span>
          <span className="total-label">{text}</span>
          <i className="arrow-down" />
        </button>
        {this.state.expanded ? (
          <div className="dropdown-list">
            <ul>
              {data.map((item: string, index: number) => {
                return <li key={index}>item</li>;
              })}
            </ul>
          </div>
        ) : null}
      </div>
*/
