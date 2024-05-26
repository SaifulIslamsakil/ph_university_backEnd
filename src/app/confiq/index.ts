

import env from "dotenv"

import path from "path"

env.config(({path: path.join(process.cwd(), '.env')}))

export default {
    port : process.env.PORT,
    database_URl : process.env.DATABASE_URL

}