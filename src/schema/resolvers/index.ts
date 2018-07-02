import { resolvers as animals } from "./animals";
import { resolvers as methods } from "./methods";
import { resolvers as projects } from "./projects";
import { resolvers as queries } from "./queries";
import { resolvers as mutations } from "./mutations";

export const resolvers = [
    ...animals,
    ...methods,
    ...projects,
    ...queries,
    ...mutations
];