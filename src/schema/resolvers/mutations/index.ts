import { resolvers as common } from "./common";
import { resolvers as animals } from "./animals";
import { resolvers as projects } from "./projects";

export const resolvers = [...common, ...animals, ...projects];
