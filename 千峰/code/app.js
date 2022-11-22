var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
      getClassMates(classNo: Int!):[String]
    }
  `);
var root = {
  getClassMates({ classNo }) {
    const obj = {
      31: ['张三', '李四', '王五'],
      61: ['张大三', '李大四', '王大五'],
    };
    return obj[classNo];
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
