const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

module.exports = {
  debug: process.env.NODE_ENV === 'development',
  webpack_assets_file_path: 'webpack/webpack-assets.json',
  webpack_stats_file_path: 'webpack/webpack-stats.json',
  assets: {
    images: {
      extensions: ['png', 'jpg', 'jpeg', 'gif'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },
    fonts: {
      extensions: ['eot', 'ttf', 'svg'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },
    styles: {
      extensions: ['scss'],
      filter(module, regex, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        }
        return regex.test(module.name);
      },
      path(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
        }
        return module.name;
      },
      parser(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
        }
        return module.source;
      },
    },
  },
};
