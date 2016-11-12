const path = require('path');

const src = path.resolve(process.env.PWD, 'src');

const resolve = {
  extensions: [
    '',
    '.js',
    '.jsx',
    '.scss',
    '.jpg',
    '.png',
  ],
  alias: {
    app: `${src}/scripts`,
    actions: `${src}/scripts/actions`,
    components: `${src}/scripts/components`,
    containers: `${src}/scripts/containers`,
    reducers: `${src}/scripts/reducers`,
    utils: `${src}/scripts/utils`,
    styles: `${src}/styles`,
    images: `${src}/images`,
  },
};

module.exports = resolve;
