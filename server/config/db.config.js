const mysql = require('mysql');

// create mysql connection
// const stablishedConnection = () => {
//     return new Promise((resolve, reject) => {
//         const dbConn = mysql.createConnection({
//             host: 'localhost',
//             user: 'root',
//             password: '',
//             database: 'apps_dev'
//         });
//         dbConn.connect(function(error){
//             if(error){
//                 reject(error)
//             }
//             resolve(dbConn)
//         })
//     })
// }

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'apps_dev'
});
dbConn.connect(function(error){
    if(error){
        // console.log(error)
    }
})

// module.exports.closeDBConnection = (con) => {
//     con.destroy()
// }
// module.exports = stablishedConnection;
module.exports = dbConn