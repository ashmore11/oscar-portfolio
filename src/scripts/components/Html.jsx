import React, { PropTypes } from 'react';

export default function Html({ head, content, store }) {
  const ENV = {
    dev: process.env.NODE_ENV === 'development',
    prod: process.env.NODE_ENV === 'production',
  };
  const styles = <link rel="stylesheet" type="text/css" href="/styles/styles.css" />;
  const initialState = JSON.stringify(store.getState());

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {ENV.prod ? styles : null}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={
            { __html: `window.__initialState__ = ${initialState};` }
          }
        />
        <script src="/scripts/vendors.js"></script>
        <script src="/scripts/bundle.js"></script>
      </body>
    </html>
  );
}

Html.propTypes = {
  head: PropTypes.object,
  content: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired,
};
