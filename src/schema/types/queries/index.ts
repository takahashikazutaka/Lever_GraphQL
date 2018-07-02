import { typeDefs as common } from "./common";
import { typeDefs as animals } from "./animals";
import { typeDefs as methods } from "./methods";
import { typeDefs as projects } from "./projects";

export const typeDefs = [
    ...common,
    ...animals,
    ...methods,
    ...projects,
];