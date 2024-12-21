const mongoose = require("mongoose");


function connectToDb() {
    try {
        const connectionInstance = mongoose.connect(`${process.env.DB_CONNECT}/uber-video`);
        // console.log(`\n DB Connected: ${connectionInstance.connection.host} \n`);
    } catch (error) {
        console.error("MONGODB Connection error: ", error);
        process.exit(1);
    }
}

module.exports = connectToDb;