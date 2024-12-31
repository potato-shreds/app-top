var store = require('app-store-scraper');

const appTopData = [];

const getData = (type, region, category) => {
  return appTopData.find(
    (item) =>
      item.type === type && item.region === region && item.category === category
  );
};

const addData = (type, region, category, content) => {
  const index = appTopData.findIndex(
    (item) =>
      item.type === type && item.region === region && item.category === category
  );

  if (index !== -1) {
    appTopData[index].content = content;
    console.log(`Updated content for ${type} - ${region} - ${category}`);
  } else {
    appTopData.push({ type, region, category, content });
    console.log(`Added new data for ${type} - ${region} - ${category}`);
  }
};
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
const allAppsData = [];
const fetchAllData = async () => {
  for (
    let collectionNum = 0;
    collectionNum < collections.length;
    collectionNum++
  ) {
    for (let countryNum = 0; countryNum < Countries.length; countryNum++) {
      for (
        let categoriesNum = 0;
        categoriesNum < categories.length;
        categoriesNum++
      ) {
        try {
          const apps = await store.list({
            collection: collections[collectionNum],
            category: categories[categoriesNum],
            num: 100,
            country: Countries[countryNum],
            lang: 'en',
          });

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

          await addData(
            collections[collectionNum],
            Countries[countryNum],
            categories[categoriesNum],
            JSON.stringify(allAppsData)
          );

          allAppsData.length = 0;
        } catch (error) {
          console.log(
            `Error fetching data for ${collections[collectionNum]} - ${Countries[countryNum]} - ${categories[categoriesNum]}:`,
            error
          );
        }
      }
    }
  }
};
const initData = async () => {
  fetchAllData();
  setInterval(() => {
    fetchAllData();
  }, 1000 * 60 * 60 * 24);
};

module.exports = {
  addData,
  getData,
  appTopData,
  initData,
};
