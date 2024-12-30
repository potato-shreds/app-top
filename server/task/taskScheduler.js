const Database = require('../database/db');
var store = require('app-store-scraper');
var appTopDB = require('../database/appTopDB');

const db = Database.getInstance('../database/mydatabase.db');
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
const countries = ['us', 'cn'];

// taskScheduler.js
const getAllGroupedDataAndStore = async () => {
  let allAppsData = [];

  for (
    let collectionNum = 0;
    collectionNum < collections.length;
    collectionNum++
  ) {
    for (let countryNum = 0; countryNum < countries.length; countryNum++) {
      for (
        let categoriesNum = 0;
        categoriesNum < categories.length;
        categoriesNum++
      ) {
        try {
          await store
            .list({
              collection: collections[collectionNum],
              category: categories[categoriesNum],
              num: 100,
              country: countries[countryNum],
              lang: 'en',
            })
            .then(async (apps) => {
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
              await new Promise((resolve) => setTimeout(resolve, 1000));

              appTopDB.upsertData(
                collections[collectionNum],
                countries[countryNum],
                categories[categoriesNum],
                JSON.stringify(allAppsData)
              );
            })
            .catch(console.log);
        } catch (err) {
          console.error(
            `Error fetching or inserting data for collection: ${collections[collectionNum]}, country: ${countries[countryNum]}, category: ${categories[categoriesNum]}`,
            err
          );
        }
      }
    }
  }

  return allAppsData;
};

const interval = 1000 * 60 * 60 * 24;

const appTopTask = () => {
  setInterval(getAllGroupedDataAndStore, interval);
};

module.exports = appTopTask;
