const Koa = require('koa');
const cors = require('koa2-cors');
const capture = require('@sunshine_bit/capture');

const app = new Koa();
app.use(cors());
app.use(async (ctx, next) => {
  const method = ctx.method;
  const path = ctx.path;
  if (method !== 'GET' || path !== '/image-capture') {
    return ctx.body = '请使用 GET 请求方法，且请求路径为 /image-capture';
  }
  const {
    url,
    width,
    height,
    deviceScaleFactor,
    fileName,
    encoding, 
  } = ctx.query;

  const res = await capture.capture({
    url,
    deviceScaleFactor,
    fileName,
    encoding, 
    width: !!width ? parseInt(width) : width,
    height: !!height ? parseInt(height) : height,
  });
  ctx.set('Cache-Control', 'no-cache');
  ctx.type = 'image/png';
  ctx.attachment(fileName);
  ctx.body = res;
  ctx.body = res;
})

const port = 16661;
app.listen(port);
console.log(`服务已启动: http://127.0.0.1:${port}`);