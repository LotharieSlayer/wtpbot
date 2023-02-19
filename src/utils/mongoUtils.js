// MongoDB key-value storage like Enmap
// Generic functions to upsert and get data from MongoDB
// You can setup your own methods to set/get data from MongoDB in a more optimized way into your own plugins

async function upsert(key, value, collection){
    const filter = { _id: key };
    const options = { upsert: true };
    await collection.updateOne(filter, {
        $set: {
            value: value
        }
    }, options)
}

async function get(key, collection){
    const query = { _id: key };
    const options = {
        projection: {
            _id: 0,
            value: 1
        }
    };
    return await collection.findOne(query, options);
}

module.exports = {
    upsert,
    get,
};