import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: { type: 'hash' },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  publicPath: './',
  //动态引入
  // dynamicImport: {
  //   loading: '@/components/XpLoading',
  // },
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    // generate stats file while ANALYZE_DUMP exist
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed', // stat  // gzip
  },
  // mfsu: process.env.NODE_ENV === 'production' ? { production: {} } : {},
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
    echarts: 'window.echarts',
  },
  scripts: [
    'https://gw.alipayobjects.com/os/lib/react/17.0.2/umd/react.production.min.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/17.0.2/umd/react-dom.production.min.js',
    'https://cdn.staticfile.org/echarts/5.4.1/echarts.min.js',
  ],
  chunks: ['antd', 'vendors', 'umi'],
  chainWebpack(config: any) {
    // 用dayjs 替换 moment
    config.plugin('moment2dayjs').use('antd-dayjs-webpack-plugin', [
      {
        preset: 'antdv4', //看你项目中使用的antd是v几版本
      },
    ]);

    config.optimization.splitChunks({
      chunks: 'all', //async异步代码分割 initial同步代码分割 all同步异步分割都开启
      automaticNameDelimiter: '～',
      name: true,
      minSize: 30000, //字节 引入的文件大于30kb才进行分割
      //maxSize: 50000,         //50kb，尝试将大于50kb的文件拆分成n个50kb的文件
      minChunks: 1, //模块至少使用次数
      // maxAsyncRequests: 5,    //同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
      // maxInitialRequests: 3,  //首页加载的时候引入的文件最多3个
      // name: true,                  //缓存组里面的filename生效，覆盖默认命名
      cacheGroups: {
        // echarts: {
        //   name: 'echarts',
        //   test: /[\\/]node_modules[\\/](echarts)[\\/]/,
        //   priority: -9,
        //   enforce: true,
        // },
        antd: {
          name: 'antd',
          test: /[\\/]node_modules[\\/](@ant-design|antd|antd-mobile)[\\/]/,
          priority: -10,
          enforce: true,
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -11,
          enforce: true,
        },
      },
    });
  },
});
