const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const schema = buildSchema(`
  type AccountInput {
    name: String
    age: Int
    sex: String
    department: String
  }
  type Account {
    name: String
    age: Int
    sex: String
    department: String
  }

  type Query{
    accounts: [Account]
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
  createAccount({ input }) {
    mokeDb[input.name] = input;
    return mokeDb[input.name];
  },
  updateAccount({ id, input }) {
    const updatedAccount = Object.assign({}, mokeDb[id], input);
    mokeDb[id] = this.updateAccount;
    return updatedAccount;
  },
  accounts() {
    return mokeDb;
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
