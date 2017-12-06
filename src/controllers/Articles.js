import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import FaStar from 'react-icons/lib/fa/star'
import immutable from 'immutable'

import { Bootstrap3ishPaginator } from 'react-paginators'

import ArticleForm from '../forms/ArticleForm'

const FavoriteButton = ({isFavorite, onClick}) => (
  <FaStar style={{cursor: "pointer"}} color={isFavorite ? "#ffa500" : "#eee"} onClick={onClick} />)

class List extends Component {

  constructor(props) {
    super(props)
    this.state = { articles: [] }
  }

  componentWillMount() {
    this.props.api.listArticles().then((result) => {
      this.setState({articles: result.articles, current: 1, last: result.links.last._page})
    })
  }

  handleFavorite(article, index) {
    article.isFavorite = article.isFavorite !== true
    this.props.api.updateArticle(article.id, article).then((result) => {
      const nextArticles = immutable.List(this.state.articles)
      nextArticles[index] = result.article
      this.setState({articles: nextArticles})
    })
  }

  handlePageClick(page) {
    this.props.api.listArticles(page).then((result) => {
       this.setState({articles: result.articles, current: page, last: result.links.last._page})
    })
  }

  render() {

    const current = (this.state && this.state.current) || 1
    const last = (this.state && parseInt(this.state.last, 10)) || 1

    return (
      <div>
        <h2>Articles</h2>
        <ul>
          {this.state.articles.map((x, index) => (
            <li key={index}>
              <Link to={`/articles/${x.id}`}>{x.title}</Link>
              {" "}
              <FavoriteButton isFavorite={x.isFavorite} onClick={() => this.handleFavorite(x, index)} />
            </li>
          ))}
        </ul>

        <div style={{padding: "30px",  display: "flex", justifyContent: "center" }}>
          <Bootstrap3ishPaginator
            current={current}
            last={last}
            maxPageCount={10}
            onClick={this.handlePageClick.bind(this)}
          />
        </div>
      </div>
    )
  }
}

class FavoriteList extends Component {

  constructor(props) {
    super(props)
    this.state = { articles: [] }
  }

  componentWillMount() {
    this.props.api.listFavoriteArticles().then((result) => {
      this.setState({articles: result.articles})
    })
  }

  render() {

    const {articles} = this.state

    return (
      <div>
        <h2>Favorites</h2>
        <ul>
        {articles.map((x, index) => (
          <li key={index}><Link to={`/articles/${x.id}`}>{x.title}</Link></li>
        ))}
        </ul>
      </div>
    )
  }
}

class Show extends Component {

  constructor(props) {
    super(props)
    this.state = { article: {} }
  }

  componentWillMount() {
    const { id } = this.props.match.params
    this.props.api.showArticle(parseInt(id, 10)).then((result) => {
      this.setState({article: result.article})
    })
  }

  render() {
    const {article} = this.state
    return (
      <div>
        <h2>{article.title}</h2>
        <p>{article.description}</p>
      </div>
    )
  }
}

class Create extends Component {

  handleSubmit({title, description}) {
    this.props.api.createArticle({title, description, isFavorite: false}).then( _ => this.props.history.push("/"))
  }

  render() {
    return (
      <div>
        <h2>Create</h2>
        <div style={{padding: "50px"}}>
          <ArticleForm onSubmit={this.handleSubmit.bind(this)} />
        </div>
      </div>
    )
  }
}

export default { List, FavoriteList, Show, Create }
