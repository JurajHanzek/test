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
        S