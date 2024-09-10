import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
const port=process.env.PORT||3000
dotenv.config(); 

connectDB()
.then(() => {
    app.listen(port,()=>{
        console.log(`server is running in port ${port}`)})
    })
   
.catch((e)=>{
console.log(`database is not connected ${e}`)
})
