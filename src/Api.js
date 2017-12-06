import axios from 'axios'
import parse from 'parse-link-header'

export default class Api {

  constructor({ baseUrl, successHandler, failureHandler }) {
    this.baseUrl = baseUrl;
    this.handleSuccess =
      successHandler ||
      function(result) {
        return Promise.resolve(result);
      };
    this.handleFailure =
      failureHandler ||
      function(e) {
        return Promise.reject(e);
      };
  }

  listArticles(page=1) {
    return axios.get(`${this.baseUrl}/articles?_page=${page}`).then((res) => {
      return {
        "articles": res.data || [],
        "links": parse(res.headers.link)
      }
    }).catch(this.handleFailure)
  }

  listFavoriteArticles(page=1) {
    return axios.get(`${this.baseUrl}/articles?isFavorite=true&_page=${page}`).then((res) => {
      return {
        "articles": res.data || [],
        "links": parse(res.headers.link)
      }
    }).catch(this.handleFailure)
  }

  showArticle(id) {
    return axios.get(`${this.baseUrl}/articles/${id}`).then((res) => {
      return { "article": res.data }
    }).catch(this.handleFailure)
  }

  updateArticle(id, params) {
    return axios.put(`${this.baseUrl}/articles/${id}`, params).then((res) => {
      return { "article": res.data }
    }).catch(this.handleFailure)
  }

  createArticle(params) {
    return axios.post(`${this.baseUrl}/articles`, params).then((res) => {
      this.handleSuccess("Create Article Success")
      return { "article": res.data }
    }).catch(this.handleFailure)
  }
}
