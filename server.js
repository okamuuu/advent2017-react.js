const path = require('path')
const faker = require('faker')
const jsonServer = require('json-server')
const server = jsonServer.create()
const serverStatic = require('serve-static')

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS")
  next()
})

server.use('/api/', jsonServer.router(getArticles()))
server.use('/static', serverStatic(__dirname + '/dist/static'))
server.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});


function getArticles() {
  const articles = []

  for (var id = 1; id < 51; id++) {

    articles.push({
      "id": id,
      "title": faker.lorem.words(),
      "description": faker.lorem.paragraphs(),
      "isFavorite": false
    })
  }

  return { "articles": articles }
}

if (module.parent === null) {
  server.listen(4000)
  console.log('listening on port 4000')
}

module.exports = server
