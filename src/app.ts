import express, { Application, Request, Response } from "express"
import cors from "cors"
import globalErrorHandler from "./app/midelware/globalErrorHandler"
import notFoundRoute from "./app/midelware/noteFoundRoute"
import router from "./app/routes"

const app:Application = express()

app.use(express.json())
app.use(cors())


app.use("/api/v1", router)
// app.use("/api/v1/student", StudentRoutes)
// app.use("/api/v1/user", UserRoute)
// app.use("/api/v1/academic-semister", AcademicSemesterRoute)

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.use(globalErrorHandler)
app.use(notFoundRoute)


export default app