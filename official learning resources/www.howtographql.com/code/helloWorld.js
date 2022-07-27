const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const schema = buildSchema(`
  type Query{
    name: String
    age: Int
    from: String
  }
`);
const mokeDb = {
  jay: {
    name: "jayce",
    age: 18,
    sex: "male",
    department: "IT",
  },
};

const root = {
  name() {
    return "Jay";
  },
  age() {
    return 18;
  },
  from() {
    return "China";
  },
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // 启用调试
  }),
);

app.listen(3222);
