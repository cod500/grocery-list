import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './components/layout/Home';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Profile from './components/profile/Profile';
import AddList from './components/list/AddList';
import AllLists from './components/list/AlllList';
import SingleList from './components/list/SingleList';
import Footer from './components/layout/Footer';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div style={{ background: "url('img/bg.svg') no-repeat" }}>
      <Router>
        <ToastContainer />
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/profile/:id" exact component={Profile} />
          <Route path="/list/:id" exact component={SingleList} />
          <Route path="/add" exact component={AddList} />
          <Route path="/lists" exact component={AllLists} />
        </Switch>
        <Footer />
      </Router>

    </div>
  );
}

export default App;
