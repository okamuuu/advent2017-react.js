import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, NavLink, withRouter } from 'react-router-dom'

import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import Api from "./Api";
import Articles from './controllers/Articles'

const Header = ({onClick}) => (
  <h1 className="text-center" style={{cursor: "pointer" }} onClick={onClick}>Favorite Articles</h1>
)

const Nav = () => (
  <ul className="nav nav-pills">
    <li><NavLink exact to="/articles">Articles</NavLink></li>
    <li><NavLink exact to="/articles/favorite">Favorite Articles</NavLink></li>
    <li><NavLink exact to="/articles/create">Create</NavLink></li>
  </ul>
)

const Footer = () => (<p className="text-center">Favorite Articles</p>)

const Routes = withRouter(({api, history}) => (
  <div className="container">
    <Header onClick={() => history.push("/")} />
    <Nav />
    <Switch>
      <Route exact path="/" component={props => <Articles.List {...props} api={api} />} />
      <Route exact path="/articles" component={props => <Articles.List {...props} api={api} />} />
      <Route exact path="/articles/favorite" component={props => <Articles.FavoriteList {...props} api={api} />} />
      <Route exact path="/articles/create" component={props => <Articles.Create {...props} api={api} />} />
      <Route exact path="/articles/:id" component={props => <Articles.Show {...props} api={api} />} />
    </Switch>
    <Footer />
  </div>
))

class App extends Component {
  constructor(props) {
    super(props);
    this.api = new Api({
      baseUrl: process.env.NODE_ENV === "production" ? "/api" : `http://127.0.0.1:4000/api`,
      failureHandler: this.handleHttpError,
      successHandler: this.handleHttpSuccess
    });
  }

  handleHttpError(error) {
    return new Promise((resolve, reject) => {
      NotificationManager.error(error + "", "", 5000, () => {
        return reject(error);
      });
    });
  }

  handleHttpSuccess(message) {
    return new Promise((resolve, reject) => {
      NotificationManager.success(message, "", 5000, () => {
        return resolve(true);
      });
    });
  }

  render() {
    return (
      <div>
        <NotificationContainer />
        <Router>
          <Routes api={this.api} />
        </Router>
      </div>
    );
  }
}

export default App
