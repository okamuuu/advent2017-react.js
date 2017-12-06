import server from '../server'
import Api from '../src/Api'

const port = server.listen(0).address().port
const api = new Api({baseUrl: `http://127.0.0.1:${port}/api`})

describe('Api', function() {

  test('listArticles', async () => {
    const result = await api.listArticles()
    expect(result.articles.length).toEqual(10)
  })
})
