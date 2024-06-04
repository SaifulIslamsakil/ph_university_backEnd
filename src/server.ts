import mongoose from "mongoose";
import app from "./app"
import confiq from "./app/confiq"
import { Server } from 'http';

let server: Server

const main = async () => {
    try {
        await mongoose.connect(confiq.database_URl as string);
        server = app.listen(confiq.port, () => {
            console.log(`Example app listening on port ${confiq.port}`)
        })
    } catch (error) {
        console.log(error)
    }
}


main()

process.on("unhandledRejection", () => {
    console.log(`😈 unahandledRejection is detected , shutting down ...`);
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
})

process.on("uncaughtException", () => {
    console.log(`😈 uncaughtException is detected , shutting down ...`);
    process.exit(1)
})

