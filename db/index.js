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

    let x = new Product({
        name: "Té", 
        description: "Té de manzanilla McCormick ay no Hellman's que bruto",
        wasteComposition: [
            {
                name: "Papel",
                description: "Pos papel we",
                timeToLive: 1.5
            },
            {
                name: "Orgánico",
                description: "Hojas deshidratadas",
                timeToLive: 0.1
            }
        ],
        instructions: "Lo abres lo separas y lo tiras :D en el mismo vale madres",
        gtin: 1234,

    })
    // x.save().then(() => console.log("Se añadio la madre esta"))
}
);

