const fs = require('fs');
var store = require('app-store-scraper');
const categories = [
  store.category.BUSINESS,
  store.category.EDUCATION,
  store.category.ENTERTAINMENT,
  store.category.FOOD_AND_DRINK,
  store.category.HEALTH_AND_FITNESS,
  store.category.LIFESTYLE,
  store.category.MUSIC,
  store.category.PHOTO_AND_VIDEO,
  store.category.PRODUCTIVITY,
  store.category.REFERENCE,
  store.category.SOCIAL_NETWORKING,
  store.category.TRAVEL,
  store.category.UTILITIES,
];

let allAppsData = [];

// Function to process each category
const processCategory = (category) => {
  return store
    .list({
      collection: store.collection.TOP_GROSSING_IOS,
      category: category,
      num: 200,
    })
    .then((apps) => {
      apps.forEach((app, index) => {
        console.log(app);
        allAppsData.push({
          category: app.genre,
          rank: index + 1,
          id: app.id,
          appId: app.appId,
          title: app.title,
          releaseDate: app.released,
        });
      });
    })
    .catch(console.log);
};

// Process all categories
Promise.all(categories.map(processCategory))
  .then(() => {
    // Prepare CSV content
    let csvContent = 'Category,Rank,ID,App ID,Title,Release Date\n';
    allAppsData.forEach((app) => {
      csvContent += `${app.category},${app.rank},${app.id},${app.appId},${app.title},${app.releaseDate}\n`;
    });

    // Save CSV content to a single file
    const fileName = 'top_apps_all_categories.csv';
    fs.writeFile(fileName, csvContent, (err) => {
      if (err) {
        console.error(`Error writing to file ${fileName}`, err);
      } else {
        console.log(`File ${fileName} saved successfully`);
      }
    });
  })
  .catch(console.log);

//
// http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/topfreeapplications/6007/limit=2/json?s=143441

// http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/topgrossingapplications/6007/limit=2/json?s=143441
