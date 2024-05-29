import app from "../../app";


type Route = {
    path: string,
    fileName : string
}
const allRoute: Route[] = [
    {
        path:"/",
        fileName : "any" 
    }
]

allRoute.forEach(route => app.use(route.path, route.fileName) );