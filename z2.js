let MongoClient  = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017';

MongoClient.connect(url).then(async function(client) {

    let db = client.db('faks');
       let continuous  = ["No", "year", "month", "day", "hour", "PM2", "PM10", "SO2", "NO2",
    "CO", "O3", "TEMP", "PRES", "DEWP", "RAIN", "WSPM"]
    try{
        db.collection('statistika_data').deleteMany({});
        for (let variable of continuous){
            var match = {
                $match : {
                    [variable]: {$ne:-1}
                },
            }
            var group = {
                $group : {
                    _id : variable,
                    avg : { $avg : "$" + variable },
                    std : { $stdDevPop : "$" + variable },
                    nomissing : { $sum : 1}
                }
            }
            var stats =await db.collection('data').aggregate([match, group]).toArray();
            console.log(stats);
            db.collection('statistika_data').insertMany(stats);
        }
    } catch (e){
        console.log(e);
    }
});