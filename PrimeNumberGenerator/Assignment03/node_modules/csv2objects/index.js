
const fs = require("fs")

const csv2objects = function csv2objects (path) {
  const fileContent = fs.readFileSync(path, { encoding: "utf8" });
  const allRows = fileContent.split("\n");
  const nonEmptyRows = allRows.filter(r => r.trim().length > 0);
  const headers = nonEmptyRows[0].split(",");
  const dataRows = nonEmptyRows.slice(1).map(r => r.split(",").map((d, i) => ([headers[i], d])));
  return dataRows.map(r => r.reduce((accum, item) => ({ ...accum, [item[0]]: item[1] }), {}));
};

module.exports = csv2objects;
