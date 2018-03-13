import "../scss/main.scss";

import * as React from "react";
import Helmet from "react-helmet";

import * as data from "../../content/data.json";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GraphResult, Metadata } from "../interfaces";

const config = data as any;

/**
 * Layout props.
 * @typedef {Interface} Props
 * @property {*} children the children function renderer.
 *
 * @private
 * @interface
 */
interface Props {
  children: any;
}

/**
 * Layout of the site.
 * @param {Function} children the children.
 * @returns {React.ReactNode} the react node that represents the layout.
 *
 * @public
 * @function
 */
export default function Layout({ children }: Props): React.ReactNode {
  return (
    <React.Fragment>
      <Helmet>
        <meta name="description" content={config.description} />
      </Helmet>
      <div className="is-fluid">
        <Header url={config.url} title={config.title} />
        {children()}
        <Footer profile={config.profile} />
      </div>
    </React.Fragment>
  );
}
