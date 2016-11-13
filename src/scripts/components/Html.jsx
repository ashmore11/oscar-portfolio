import React, { PropTypes } from 'react';

export default function Html({ content, store }) {
  return (
    <html>
      <head>
        <title>Oscar Portfolio</title>
        <link rel="stylesheet" type="text/css" href="/styles/styles.css" />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={
            { __html: `window.__initialState__ = ${JSON.stringify(store.getState())};` }
          }
        />
        <script src="/scripts/vendors.js"></script>
        <script src="/scripts/bundle.js"></script>
      </body>
    </html>
  );
}

Html.propTypes = {
  content: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired,
};
