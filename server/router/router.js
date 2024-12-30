const Router = require('@koa/router');
const router = new Router();
const { getApps, getAppDetail } = require('../util/getApps.js');

async function getAppData(type, region, category) {
  return await getApps(type, region, category);
}

router.get('/', (ctx) => {
  ctx.body = 'hello Koa!';
});

router.get('/getData', async (ctx) => {
  const query = ctx.request.query;
  const data = await getAppData(query.type, query.region, query.category);
  ctx.body = data;
});

router.get('/getAppDetail/:id', async (ctx) => {
  const id = ctx.params.id;
  const appDetail = await getAppDetail(id);
  ctx.body = appDetail;
});

module.exports = router;
