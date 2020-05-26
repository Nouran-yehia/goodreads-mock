import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";


import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./components/privateRoute"
import Login from "./components/login.component";
import Home from "./pages/user/homepage";
import Profile from "./components/Profile";
import BoardAdmin from "./components/board-admin.component";
import Register from "./components/Register";
import NavBar from "./components/navbar";
import Category from './components/Category.js';
import BooksUser from './components/AllBooksUser';
import BooksAdmin from './components/AllBooksAdmin';
import CategoryList from './components/Categorylist.js';
import CategoryDetails from './components/CategoryDetails.js';
import BookDetails from './components/bookDetails'
import SearchBook from './components/SearchBook';
import SearchResult from './components/searchresults';
import Results from './components/Results';
import Authors from './components/Authors';
import AuthorsDetails from './components/AuthorsDetails';
import AuthorsView from './components/AuthorsView';
import AuthService from './services/auth.service';
import AboutUs from './pages/user/aboutus';
import Terms from './pages/user/terms';

function App() {

 
  return (
    <Router>
      <div>
        <NavBar/>

          <div className="container">
            <Switch>              
              <Route exact path={"/"} component={
                AuthService.getCurrentUser() && AuthService.getCurrentUser().roles.includes('ROLE_ADMIN') ? Profile : Home
                } />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/about" component={AboutUs} />
              <Route exact path="/terms" component={Terms} />
              <PrivateRoute exact path="/profile" component={Profile} />             
              <PrivateRoute path="/admin" component={BoardAdmin} />
              <PrivateRoute exact path="/categories"  component={Category} />
              <PrivateRoute exact path="/authors" component={Authors}/>
              <PrivateRoute exact path="/authors/all" component={AuthorsView}/>
              <PrivateRoute exact path="/authors/:id" component={AuthorsDetails}/>
              <PrivateRoute exact path="/categories/all" component={CategoryList} />
              <PrivateRoute exact path="/categories/:categoryname/:id" component={CategoryDetails} />
              <PrivateRoute exact path="/books/all" component={BooksUser}/>
              <PrivateRoute exact path="/books/:id" component={BookDetails}/>
              <PrivateRoute exact path="/SearchResult" component={SearchResult} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/search" component={SearchBook} />
              <PrivateRoute exact path="/books/all/admin" component={BooksAdmin}/>
              <PrivateRoute exact path="/Results" component={Results} />
            </Switch>
          </div>
        </div>
      </Router>
    );

  }

export default App;
