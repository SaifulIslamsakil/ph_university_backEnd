import mongoose from "mongoose";
import app from "./app"
import confiq from "./app/confiq"



const main = async () => {
    try {
        await mongoose.connect(confiq.database_URl as string);
        app.listen(confiq.port, () => {
            console.log(`Example app listening on port ${confiq.port}`)
        })
    } catch (error) {
        console.log(error)
    }
}


main()