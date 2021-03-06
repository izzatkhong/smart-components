const path = require('path');
const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');
const { version } = require('./package.json');

module.exports = {
  title: `SmartComponents | ${version}`,
  template: './styleguide.template.html',
  getComponentPathLine: componentPath => {
    const dirname = path.dirname(componentPath, '.js');
    const name = dirname.split('/').slice(-1)[0];
    const componentName = upperFirst(camelCase(name));

    return 'import ' + componentName + " from 'smart-components/" + name + "'";
  },
  sections: [
    {
      name: 'Components',
      components: () => [
        path.resolve(__dirname, 'source/components/button', 'index.js'),
        path.resolve(__dirname, 'source/components/button-group', 'index.js'),
        path.resolve(__dirname, 'source/components/button-social', 'index.js'),
        path.resolve(__dirname, 'source/components/icon', 'index.js'),
      ],
    },
    {
      name: 'Containers',
      sections: [
        {
          name: 'withToggle',
          content: 'source/components/with-toggle/Readme.md',
        },
      ],
    },
  ],
  updateWebpackConfig: webpackConfig => {
    webpackConfig.module.loaders.push(
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'source'),
        loader: 'babel',
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'node_modules', 'minimal.css'),
        loader: 'style!css?modules&importLoaders=1',
      }
    );

    webpackConfig.entry.push(
      path.join(__dirname, 'node_modules/minimal.css/minimal.css')
    );

    return webpackConfig;
  },
};
