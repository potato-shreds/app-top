var store = require('app-store-scraper');
var appTop = require('../appTopData/data.js');
async function getApps(collectionNum, countryNum, categoriesNum) {
  const categories = [
    store.category.PRODUCTIVITY,
    store.category.BOOKS,
    store.category.BUSINESS,
    store.category.EDUCATION,
    store.category.ENTERTAINMENT,
    store.category.FINANCE,
    store.category.FOOD_AND_DRINK,
    store.category.HEALTH_AND_FITNESS,
    store.category.LIFESTYLE,
    store.category.MEDICAL,
    store.category.MUSIC,
    store.category.NAVIGATION,
    store.category.NEWS,
    store.category.PHOTO_AND_VIDEO,
    store.category.REFERENCE,
    store.category.SHOPPING,
    store.category.SOCIAL_NETWORKING,
    store.category.SPORTS,
    store.category.TRAVEL,
    store.category.UTILITIES,
    store.category.WEATHER,
  ];
  const collections = [
    store.collection.TOP_FREE_IOS,
    store.collection.TOP_GROSSING_IOS,
  ];
  const Countries = ['us', 'cn'];
  let allAppsData = [];
  let data = appTop.getData(
    collections[collectionNum],
    Countries[countryNum],
    categories[categoriesNum]
  );
  if (data) {
    console.log('data.length !== 0');
    return JSON.parse(data.content);
  }
  await store
    .list({
      collection: collections[collectionNum],
      category: categories[categoriesNum],
      num: 100,
      country: Countries[countryNum],
      lang: 'en',
    })
    .then((apps) => {
      apps.forEach((app, index) => {
        allAppsData.push({
          rank: index + 1,
          id: app.id,
          appId: app.appId,
          title: app.title,
          category: app.genre,
          releaseDate: app.released,
          icon: app.icon,
        });
      });
      appTop.addData(
        collections[collectionNum],
        Countries[countryNum],
        categories[categoriesNum],
        JSON.stringify(allAppsData)
      );
    })
    .catch(console.log);

  return allAppsData;
}

function getAppDetail(id) {
  return store.app({
    id: id,
  });
}

module.exports = {
  getApps,
  getAppDetail,
};
