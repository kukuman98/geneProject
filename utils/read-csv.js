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
                console.log('CSV file successfully processed');
                resolve(data);
            })
            .on('error', reject); 
    })
}
// 解決同步問題的呼叫函數
// let return_file = function (data){
//     var file = data
//     console.log(file)
// }

// readCVS('/GeneProject/csv/premature0-7.csv')

module.exports = {readCVS}
// node utils/read-csv.js