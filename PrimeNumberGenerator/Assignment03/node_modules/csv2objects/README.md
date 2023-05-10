# csv2objects
Fast and easy tool to turn a CSV file to a JavaScript objects array.

## How to use

```javascript
const csv2objects = require("csv2objects");
const objects = csv2objects("./test/sample.csv");
// [
//   { social_id: "UCmdrrEl_ms-aZrf8E5DtljQ", username: "mullerquaker",      brand_name: "Muller",             country_name: "Global",             ignore_category: "Yoghurt",       language: "English" },
//   { social_id: "UC0Szb7wRfe8IxgBBRqDwNmQ", username: "TotalGreekYoghurt", brand_name: "Fage",               country_name: "United Kingdom",     ignore_category: "Yoghurt",       language: "English" },
//   { social_id: "UCNBNXG10CyUe1AGA8Q3oMyA", username: "LactacydRussia",    brand_name: "Lactacyd (Sanofi)",  country_name: "Russian Federation", ignore_category: "Womens Health", language: "Russian" }
// ]
```
