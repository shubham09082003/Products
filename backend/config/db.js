import mongoose from "mongoose";

export const mongoConnect = async () => {

    try{
        const conn = await mongoose.connect("mongodb://localhost:27017/product",{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database is connected to " , conn.connection.host);
    }
    catch(e){
        console.error(`Error : ${e.message}`);
    }
};