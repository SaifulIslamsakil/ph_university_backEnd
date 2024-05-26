import express, { Application, Request, Response } from "express"
import cors from "cors"
import { StudentRoutes } from "./app/student/student.route"
import userRoute from "./app/users/user.route"
const app:Application = express()


app.use(express.json())
app.use(cors())

app.use("/api/v1/student", StudentRoutes)
app.use("/api/v1/user", userRoute)

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})




export default app