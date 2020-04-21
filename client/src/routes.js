import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import MyHeader from './components/Header'
import Main from './components/Main'
import FullPostContainer from './containers/FullPostContainer'
import PostsByCategoryContainer from './containers/PostsByCategoryContainer'
import CreatePost from './components/CreatePost'

export default ({ isAuth }) => (
    <Fragment>
        <Router>
            <MyHeader isAuth={isAuth} />
            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
                <Route path="/posts/:id">
                    <FullPostContainer />
                </Route>
                <Route path="/categories/:category">
                    <PostsByCategoryContainer />
                </Route>
                <Route path="/create">
                    <CreatePost />
                </Route>
                <Redirect to="/" />
            </Switch>
        </Router>
    </Fragment>
)