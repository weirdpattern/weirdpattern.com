import * as React from "react";

import Helmet from "react-helmet";

import * as data from "../../content/data.json";
const config = data as any;

/**
 * Share component.
 * @param {Props} props the properties of the component.
 * @returns {React.ReactElement<Props>}
 *    the react node that represents the share.
 *
 * @public
 * @function
 */
export default function Share(): React.ReactElement<{}> {
  return (
    <React.Fragment>
      <Helmet>
        <script
          src={`https://platform-api.sharethis.com/js/sharethis.js#property=${
            config.ids.sharethis
          }&product=inline-share-buttons`}
        />
      </Helmet>
      <div className="sharethis-inline-share-buttons" />
    </React.Fragment>
  );
}
