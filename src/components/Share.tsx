import * as React from "react";

import Helmet from "react-helmet";

import { DependenciesMetadata } from "../interfaces";

/**
 * Properties for the Share component.
 * @property {DependenciesMetadata} dependencies the dependencies to be used.
 *
 * @private
 * @interface
 */
interface Props {
  dependencies: DependenciesMetadata;
}

/**
 * Share component.
 * @param {Props} props the properties of the component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the share.
 *
 * @public
 * @function
 */
export default function Share(props: Props): React.ReactElement<{}> {
  return (
    <React.Fragment>
      <Helmet>
        <script
          src={`https://platform-api.sharethis.com/js/sharethis.js#property=${
            props.dependencies.sharethis
          }&product=inline-share-buttons`}
        />
      </Helmet>
      <div className="sharethis-inline-share-buttons" />
    </React.Fragment>
  );
}
