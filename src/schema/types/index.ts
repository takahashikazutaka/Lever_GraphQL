import { typeDefs as animals } from "./animals";
import { typeDefs as methods } from "./methods";
import { typeDefs as projects } from "./projects";
import { typeDefs as queries } from "./queries";
import { typeDefs as mutations } from "./mutations";

const schemaRoot = `
    schema {
        query: Query,
        mutation: Mutation,
    }
`

export const typeDefs = [
    schemaRoot,
    ...animals,
    ...methods,
    ...projects,
    ...queries,
    ...mutations
];