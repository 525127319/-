const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const onerror = require('koa-onerror');
const body = require('koa-better-body');
const cors = require('koa2-cors');
const router = require('koa-router')({ prefix: '/api' });

const logUtil = require('./utils/LogUtil');
let routeUtil,energy,smt,product,user;
// line,materiallogs,recordcount,station,tester,tester1,user;
if (process.env.NODE_ENV !== 'production') {
    routeUtil = require('./utils/RouteUtil');
} else {
    energy = require('./api/energy/route');
    // line = require('./api/line/route');
    // materiallogs = require('./api/materiallogs/route');
    // recordcount = require('./api/recordcount/route');
    // station = require('./api/station/route');
    // tester = require('./api/tester/route');
    // tester1 = require('./api/tester1/route');
    // smt = require('./api/smt/route');
    product = require('./api/product/route');
    user = require('./api/user/route');
}



// error handler
onerror(app);
app.use(cors({
  credentials:true
}));

app.use(body());

app.use(serve(__dirname + '/public'));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  try {
    await next();
    let ms = new Date() - start;
    logUtil.logResponse(ctx, ms);
  } catch(e){
    let ms = new Date() - start;
    //记录异常日志
    logUtil.logError(ctx, e, ms);
  }
});

//route
if (process.env.NODE_ENV === 'production') {
  router.use(energy.routes(), energy.allowedMethods());
  // router.use(smt.routes(), smt.allowedMethods());
  router.use(product.routes(), product.allowedMethods());
  // router.use(line.routes(), line.allowedMethods());
  // router.use(materiallogs.routes(), materiallogs.allowedMethods());
  // router.use(recordcount.routes(), recordcount.allowedMethods());
  // router.use(station.routes(), station.allowedMethods());
  // router.use(tester.routes(), tester.allowedMethods());
  // router.use(tester1.routes(), tester1.allowedMethods());
  router.use(user.routes(), user.allowedMethods());

  app.use(router.routes());
} else {
    try {
        routeUtil.initRoute().then((routes) => {
            app.use(routes);
          });
    } catch (e) {
        console.error('loading router error:  ', e);
    }

}


module.exports = app;
