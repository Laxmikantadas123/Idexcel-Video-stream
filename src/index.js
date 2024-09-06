import dotenv from "dotenv";
import connectDB from "./db/index.js";
const port=process.env.PORT||3000
dotenv.config(); 

connectDB()
.then(() => {
    app.listion(()=>{
        console.log(`server is running in port ${port}`)})
    })
   
.catch((e)=>{
console.log(`database is not connected ${e}`)
})
