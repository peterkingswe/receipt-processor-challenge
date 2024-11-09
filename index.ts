import cors from "cors"
import express, {Application} from "express";
import {json, urlencoded} from "body-parser";
import {rawReqLogger} from "./modules/middleware";
// import {port} from "./modules/helpers";
// import {rawReqLogger} from "./modules/middleware";
// import {routerApi} from "./routes/api";
// import {routerIndex} from "./routes";
// import {routerAuth} from "./routes/authentication";

const app: Application = express();

app
    .use(json())
    .use(urlencoded({extended: true}))
    .use(cors())
    .options('*', cors())
    .use(express.static('public'))
    .use(rawReqLogger)
    .use([routerIndex, routerAuth, routerApi]);

// Jest automatically defines as test
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, '0.0.0.0', () =>
        console.log('http connected to localhost port ', port)
    );
}

export default app