require("dotenv").config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const cron = require('node-cron');

const apiRoutes = require('./controllers/api');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const alertGenerator = require('./utils/alert-generator');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// Cron
// Run every minute
cron.schedule('* * * * *', function () {
  alertGenerator();
});


// Chat Server

const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on('connection', socket => {
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on('send-message', (data) => {
    let { recipients, text, senderName } = data;
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient)
      newRecipients.push(id)
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text, senderName
      })
    })
  })
})

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// turn on api routes
app.use('/api/stripe', apiRoutes);

// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  http.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
