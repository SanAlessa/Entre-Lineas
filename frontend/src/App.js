import React, { useState } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/styles.css'
import Search from './components/Search'
import Header from "./components/Header"
import Home from "./components/Home"
import Footer from "./components/Footer"
import Register from "./components/Register"
import SignIn from "./components/SignIn"
import Stories from './components/Stories'
import NewChapter from './components/NewChapter'
import NewBook from './components/NewBook'
import Settings from './components/Settings'
import StoryBook from './components/StoryBook'
import StoryDescription from './components/StoryDescription'
import authActions from './redux/actions/authActions'
import UserProfile from './components/UserProfile'
import FinishBook from './components/FinishBook'
import ModifyBook from './components/ModifyBook'
import ForgotPassword from './components/ForgotPassword'
import SendEmail from './components/SendEmail'
import MyBooks from './components/MyBooks'
import ModifyChapter from './components/ModifyChapter'

const App = (props) => {
  const [reload, setReload] = useState(false)

  if (props.loggedUser) {
    var routes =
      <>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route path="/add-book" component={NewBook} />
          <Route path="/stories/:genre" component={Stories} />
          <Route path="/story/:id" component={StoryDescription} />
          <Route path="/settings" component={Settings} />
          <Route path="/book/:id/:chapter/:index" component={StoryBook}/>
          <Route path="/new-book/:id" component={NewChapter}/>
          <Route path='/userprofile' component={UserProfile}/>
          <Route path='/finish-book/:id' component={FinishBook}/>
          <Route path='/modify-book/:id/image' component={FinishBook}/>
          <Route path='/modify-book/:id/:chapterId/:index' component={ModifyChapter}/>
          <Route path='/modify-book/:id' component={ModifyBook}/>
          <Route path='/reset-password/:email' component={ForgotPassword}/>
          <Route path='/myBooks' component={MyBooks}/>
          <Redirect to="/search" />
        </Switch>
      </>
  } else if (localStorage.getItem('token')) {
    props.logFromLS(localStorage.getItem('token'))
    .then(response=> {
      response && setReload(!reload)
    })
  }else{
    routes = 
    <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/search" component={Search}/>
      <Route path="/register" component={Register}/>
      <Route path="/signin" component={SignIn}/>
      <Route path="/stories/:genre" component={Stories}/>
      <Route path="/story/:id" component={StoryDescription}/>
      <Route path="/book/:id/:chapter/:index" component={StoryBook}/>
      <Route path='/send-email' component={SendEmail}/>
      <Route path='/reset-password/:email' component={ForgotPassword}/>
      <Redirect to="/"/>
    </Switch>
    </>
  }

  return (
    <>
      <BrowserRouter>
        <Header />
        {routes}
        <Footer />
      </BrowserRouter>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.auth.loggedUser
  }
}

const mapDispatchToProps = {
  logFromLS: authActions.logFromLS
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
