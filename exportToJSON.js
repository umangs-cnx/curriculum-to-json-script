const fs = require('fs');
class ExportToJSON {
  writeToFile(jsonData) {
    fs.writeFile("test.json", jsonData, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
}

module.exports = new ExportToJSON();
