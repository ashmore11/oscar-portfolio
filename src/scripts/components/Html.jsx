import React, { PropTypes } from 'react';

export default function Html({ content, store }) {
  let styles;
  if (process.env.NODE_ENV === 'production') {
    styles = <link rel="stylesheet" type="text/css" href="/styles/styles.css" />;
  }
  return (
    <html>
      <head>
        <title>Oscar Portfolio</title>
        {styles}
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
