import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login.component";
import Home from "./pages/user/homepage";
import Profile from "./components/profile.component";
// import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import Register from "./components/register.component";
import NavBar from "./components/navbar"
import Category from './components/Category.js';
import BooksUser from './components/AllBooksUser';
import CategoryList from './components/Categorylist.js';
import CategoryDetails from './components/CategoryDetails.js';
import BookDetails from './components/bookDetails'

function App() {

  return (
    <Router>
      <div>
        <NavBar/>

          <div className="container">
            <Switch>
              <Route exact path={"/"} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              {/* <Route path="/user" component={BoardUser} /> */}
              <Route path="/admin" component={BoardAdmin} />
              <Route exact path="/categories" component={Category} />
              <Route exact path="/categories/all" component={CategoryList} />
              <Route exact path="/categories/:categoryname/:id" component={CategoryDetails} />
              <Route exact path="/books" component={BooksUser}/>
              <Route exact path="/books/:id" component={BookDetails}/>
            </Switch>
          </div>
        </div>
      </Router>
    );

  }

export default App;
