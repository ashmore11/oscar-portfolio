import React, { PropTypes } from 'react';
import serialize from 'serialize-javascript';

export default function Html({ head, assets, content, store }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {/* styles (will be present only in production with webpack extract text plugin) */}
        {Object.keys(assets.styles).map((style, i) =>
          <link
            key={i}
            rel="stylesheet"
            type="text/css"
            href={assets.styles[style]}
          />
        )}

        {/* resolves the initial style flash (flicker) on page load in development mode */}
        {Object.keys(assets.styles).length === 0 ?
          <style dangerouslySetInnerHTML={{ __html: require('../../styles/main.scss')._style }} /> :
          null
        }
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={
            { __html: `window.__initialState__ = ${serialize(store.getState())};` }
          }
        />
        <script src="/scripts/vendors.js"></script>
        <script src={assets.javascript.main} />
      </body>
    </html>
  );
}

Html.propTypes = {
  head: PropTypes.object,
  assets: PropTypes.object,
  content: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired,
};
