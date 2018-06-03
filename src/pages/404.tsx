import * as React from "react";

import { Action } from "../interfaces";
import { getCommonActions } from "../utils";

/**
 * Properties of the NotFoundPage.
 * @typedef {Interface} Props
 * @property {Function} onUpdateActions a callback for scroll events.
 *
 * @private
 * @interface
 */
interface Props {
  location: { pathname: string };
  onUpdateActions: (actions: Array<Action>) => void;
}

/**
 * NotFoundPage component
 * @returns {void}
 *
 * @public
 * @function
 */
export default class NotFoundPage extends React.PureComponent<Props, {}> {
  /**
   * Class constructor.
   * @param {Props} props the properties of the component.
   */
  public constructor(props: Props) {
    super(props);

    // NOTE: this is a bug in gatsbyjs (https://github.com/gatsbyjs/gatsby/issues/3504)
    if (this.props && this.props.onUpdateActions) {
      this.props.onUpdateActions(getCommonActions("home", "report", "search"));
    }
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    return (
      <div className="not-found">
        <div className="blame">
          <svg xmlns="http://www.w3.org/svg/2000" viewBox="-10 -30 200 200">
            <defs>
              <filter
                id="chalk"
                height="2"
                width="1.6"
                colorInterpolationFilters="sRGB"
                y="-0.5"
                x="-0.3"
                filterUnits="objectBoundingBox"
              >
                <feTurbulence
                  baseFrequency="0.5"
                  seed="1"
                  result="result1"
                  numOctaves="6"
                  type="turbulence"
                />
                <feDisplacementMap
                  scale="1"
                  yChannelSelector="G"
                  in2="result1"
                  xChannelSelector="R"
                  in="SourceGraphic"
                />
              </filter>
            </defs>
            <path
              filter="url(#chalk)"
              d="M 20,40 q 70,-10 100,50 m 5,5 l 2,-18 m -3,19 l -20, -5"
              fill="none"
              stroke="#212733"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <p>You can blame this guy !!!</p>
        </div>
        <div className="middle-center">
          <h1>404</h1>
          <p>Ooops... I can&apos;t find the page you are looking for</p>
        </div>
        <div className="instructions">
          <p>You can use these your way</p>
          <svg xmlns="http://www.w3.org/svg/2000" viewBox="-10 -30 200 200">
            <defs>
              <filter
                id="chalk"
                height="2"
                width="1.6"
                colorInterpolationFilters="sRGB"
                y="-0.5"
                x="-0.3"
                filterUnits="objectBoundingBox"
              >
                <feTurbulence
                  baseFrequency="0.5"
                  seed="1"
                  result="result1"
                  numOctaves="6"
                  type="turbulence"
                />
                <feDisplacementMap
                  scale="1"
                  yChannelSelector="G"
                  in2="result1"
                  xChannelSelector="R"
                  in="SourceGraphic"
                />
              </filter>
            </defs>
            <path
              filter="url(#chalk)"
              d="M 20,40 q 70,-10 100,50 m 5,5 l 2,-18 m -3,19 l -20, -5"
              fill="none"
              stroke="#212733"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    );
  }
}
