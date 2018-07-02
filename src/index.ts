import * as express from 'express';
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { schema } from "./schema";
import { createDataModels, IDataModelSet } from "./models";
import { createConnectorModels } from "./connectors";
import { Mongoose, Schema, Types, model } from 'mongoose';
import * as cors from "cors";

const myGraphQLSchema = schema; // ... define or import your schema here!
const PORT = 3000;

const app = express();

app.use(cors());
app.options("*", cors());

app.use(
    '/graphiql',
    graphiqlExpress({
        endpointURL: '/graphql',
    }),
);

const models = createDataModels();
Object.keys(models).forEach((key) => {
    models[key].init(models);
})

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress((() => {
    

    return {
        schema: myGraphQLSchema,
        context: {
            models
        }
    }
})));

app.listen(PORT);

// const app = express()
// app.use(bodyParser.json());
// app.post("/", async (req, res) => {
//     // console.log(req.body);
//     // const models = createDataModels();
//     // models.CompetencyModel.saveOne(req.body).then(() => {
//     //     res.send(req.body);
//     // })

//     const models = createConnectorModels();
//     const input = req.body;
//     Object.assign(input, {"_id": Types.ObjectId().toHexstring()})
//     // const instance = new models.CompetencyModel()
//     const result = await models.CompetencyModel.create(input);
//     res.send(result);
// });

// app.get("/", (req, res) => {
//     res.send()
// });

// app.listen(3000);