const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/test', function (err, data) {
	if (err) {
		return console.log(err.message);
	}
	data.collection('users').find({}).toArray().then((data) => {
		console.log(data);
	}, (err) => {
		console.log(err.message)
	});
	data.close();
});

