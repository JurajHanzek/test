var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017').then(function(client) {
    let db = client.db('faks');
     let categorical = ["wd", "station"];


    try{
        for (let variable of categorical){
            db.collection('data').updateMany(
                {[variable]: "NA"},
                {$set: {[variable]: 'empty'}},
                function(err, res){
                    if (err) throw err;
                });
        }
    } catch (e){
        console.log(e);
    }

      let continuous  = ["No", "year", "month", "day", "hour", "PM2", "PM10", "SO2", "NO2",
    "CO", "O3", "TEMP", "PRES", "DEWP", "RAIN", "WSPM"]
    try{
        for (let variable of continuous){
            db.collection('data').updateMany(
                {[variable]: NaN},
                {$set: {[variable]: -1}},
                function(err, res){
                    if (err) throw err;
                });

        }
    } catch (e){
        console.log(e);
    }
});