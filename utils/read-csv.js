const csv = require('csv-parser');
const fs = require('fs');

async function readCVS(CSVFile) {
    let data = []
    return new Promise(function(resolve,reject){
        fs.createReadStream(CSVFile)
            .pipe(csv())
            .on('data', (row) => {
                data.push(row)
            })
            .on('end', () => {
                resolve(data);
            })
            .on('error', reject); 
    })
}

module.exports = {readCVS}
// node utils/read-csv.js