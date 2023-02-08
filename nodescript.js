const path = require('path');
const fs = require('fs');
const rd = require('rd');
const cheerio = require('cheerio');
const absOutputPath = path.join(__dirname, './dist');
const publicPath = '';
const outputHtmlTemplate = fs.readFileSync(
  path.join(absOutputPath, 'index.html'),
  'utf-8',
);
const outputHtmlPath = path.join(absOutputPath, 'index.html');
const $ = cheerio.load(outputHtmlTemplate);
const formatPath = (pathName) => {
  return pathName.split(path.sep).join('/');
};
let prefetchChunks = []; // 需要预加载的资源文件
const outputJsFiles = rd.readFilterSync(absOutputPath, /\.js$/); // 遍历获取预加载的模块名称
outputJsFiles.forEach((jsFilePath) => {
  // 获取相对路径名
  const formatJsPath = formatPath(jsFilePath);
  // if ((0, _util.isPrefetchOrLoadModule)(formatJsPath)) {
  if (!jsFilePath.includes('\\umi.js')) {
    prefetchChunks.push(formatJsPath);
  }
  // }
}); // 拼接link标签

const prefetchLinksStr = prefetchChunks
  .map((chunkName) => {
    const name = chunkName.split('/').pop();
    console.log(name);
    return `<link rel='${
      (chunkName.match(/(prefetch|preload)/) || ['prefetch'])[0]
    }' as='script' href='${formatPath(
      path.join(publicPath || '', name),
    )}' />`;
  })
  .join('\n');
// console.log(prefetchLinksStr);
$('head').append(prefetchLinksStr);
fs.writeFileSync(outputHtmlPath, $.html());
