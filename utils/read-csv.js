const csv = require('csv-parser');
const fs = require('fs');

let readCVS = function (CSVFile) {
    let data = []
    fs.createReadStream(CSVFile)
    .pipe(csv())
    .on('data', (row) => {
        data.push(row)
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        return_file(data)
    });
}
// 解決同步問題的呼叫函數
let return_file = function (data){
    var file = data
    console.log(file)
}

readCVS('/GeneProject/csv/premature0-7.csv')
