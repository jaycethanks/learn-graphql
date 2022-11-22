var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type TimeObj {
      hours:String
      days:String
      years:String
    }
    type User {
      firstName:String
      lastName:String
      gender:Boolean
      alive(bathDay:String):TimeObj
    }
    type Query {
      user(id:String!):User
    }
  `);
var root = {
  user({ id }) {
    const users = {
      abc: {
        firstName: 'Tom',
        lastName: 'Smith',
        gender: 1,
      },
      def: {
        firstName: 'Lily',
        lastName: 'Liu',
        gender: 0,
      },
    };
    return {
      ...users[id],
      alive({ bathDay }) {
        const now = new Date();
        const bd = new Date(bathDay);
        return {
          hours: (now - bd) / 1000 / 3600,
          days: (now - bd) / 1000 / 3600 / 24,
          years: (now - bd) / 1000 / 3600 / 24 / 365,
        };
      },
    };
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
