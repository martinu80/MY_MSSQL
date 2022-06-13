var express = require('express');
var app = express();
var sql = require('mssql/msnodesqlv8');
// const Chart = require('chart.js');
// const myChart = new Chart(ctx, {...});


// //--------------------------------Setup--------------------------------
//
// const labels = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
// ];
// const data = {
//   labels: labels,
//   datasets: [{
//     label: 'My First dataset',
//     backgroundColor: 'rgb(255, 99, 132)',
//     borderColor: 'rgb(255, 99, 132)',
//     data: [0, 10, 5, 2, 20, 30, 45],
//   }]
// };
//
// //---------------------------------------------------------------
//
//
// //--------------------------------Config--------------------------
//
// const config = {
//   type: 'line',
//   data: data,
//   options: {}
// };
//
// //----------------------------------------------------------------
//
//
// //-------------------Render the chart Eric--------------------------------
//
// const myChart = new Chart(
//   document.getElementById('myChart'),
//   config
// );
//
//
//
// //----------------------------------------------------------------
// function ConnectToDB() {
//
// }
// //----------------------------------------------------------------
// function UpdateChart() {
//     myChart.data.datasets[0].data[1] = 6
//     console.log(myChart.data.datasets[0].data[1])
//     myChart.update()
// }
//----------------------------------------------------------------


app.get('/', function (req, res) {


    // config for your database
    var config = {
        server: 'localhost',
        database: 'TEST_db',
        user: 'SQL_S71500',
        // driver: 'msnodesqlv8',
        password: '123',
        // options:{
        //   trustedConnection: true,
        //   trustServerCertificate: false
        // }
        //port: parseInt('1433'),
    };

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);
        else console.log("connected!!!!")
        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        //request.query('select TOP (2) TagTimeStamp from DATA_table', function (err, recordset) {
        //  request.query('select TOP (5)  Tag_1,Tag_2,Tag_3 from TEST_table', function (err, recordset) {
          request.query('select * from DATA_table', function (err, recordset) {

            if (err) console.log(err)
            // console.log("query result", recordset)
            // send records as a response
            var jsonObj = JSON.parse(JSON.stringify(recordset));
             console.log(jsonObj.recordset[2].TagTimeStamp);
             //console.log(recordset);
             // res.send(recordset);
             res.json(jsonObj)
             // res.send(jsonObj.recordset[2].TagTimeStamp);
             // res.json

        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});
