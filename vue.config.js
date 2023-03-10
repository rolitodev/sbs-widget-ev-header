module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
  pluginOptions: {
    i18n: {
      locale: 'es-CL',
      fallbackLocale: 'es-CL',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
  devServer: {
    proxy: 'https://3411-190-109-5-21.ngrok.io',
  },
};
