var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
 type Name {
   firstName: String,
   lastName: String
 }
 type User {
   name: Name
   age: Int
   gender: Int
 }
  type Query {
    hello: String
    account: String
    age:Int
   users: [User]
  }
`);
var root = {
  hello: () => 'Hello world!',
  account: () => 'jayce@outlook.com',
  age: () => 18,
  users: () => {
    return [
      {
        name: {
          firstName: 'jayce',
          lastName: 'sun',
        },
        age: 18,
        gender: 1,
      },
      {
        name: {
          firstName: 'Lisa',
          lastName: 'Wang',
        },
        age: 17,
        gender: 0,
      },
    ];
  },
};

var app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);
app.listen(4000, () =>
  console.log('Now browse to http://localhost:4000/graphql'),
);
