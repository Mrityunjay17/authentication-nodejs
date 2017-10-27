const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/test', function (err, data) {
    if (err) {
        return console.log(err.message);
    }
    data.collection('User').findOneAndUpdate((_id = new ObjectID('59e08df5ca58b92954ca25d3')),
        (
            {
                $set: {
                    Name: 'Raja'
                }
            }),({returnOriginal:false}))
        .then((data) => {
            console.log(data);
        }, (err) => {
            console.log(err.message)
        });
    data.close();
});

