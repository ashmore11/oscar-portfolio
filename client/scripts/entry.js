const React = require('react');

const { html, head, meta, body, div, script } = React.DOM;

module.exports = () => (
  html(null,
    head(null,
      meta({ charSet: 'utf-8' })
    ),
    body(null,
      div({ id: 'main' }),
      script({ src: '/scripts/vendors.js' }),
      script({ src: '/scripts/bundle.js' })
    )
  )
);
