const mongoose = require('mongoose');
const Product = require('./models/product')

const dbUser = process.env.DB_ADMIN_USER
const dbPassword = process.env.DB_ADMIN_PASSWORD

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true, //this is the code I added that solved it all
    keepAlive: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
    useFindAndModify: false,
    useUnifiedTopology: true
}


mongoose.connect(`mongodb://${dbUser}:${dbPassword}@ds058739.mlab.com:58739/recyclops-db`, options).then(() =>{


    console.log("Connection successful!")


}
);

