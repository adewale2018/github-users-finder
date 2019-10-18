import React, { useState, useEffect, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import SearchForm from "./components/search/SearchForm";
import Alert from "./components/alert/Alert";
import User from "./components/users/User";
// import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import NotFound from "./components/pages/NotFound";

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const fireAlert = msg => {
    setAlert(msg);
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://api.github.com/users?client_id=${process.env.APP_CLIENT_ID}&client_secret=${process.env.APP_CLIENT_SECRET}`
      );
      setUsers(res.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Search User
  const searchUsers = async name => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${name}&client_id=${process.env.APP_CLIENT_ID}&client_secret=${process.env.APP_CLIENT_SECRET}`
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  // Clear Users
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  //Get A User
  const getUser = async username => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.APP_CLIENT_ID}&client_secret=${process.env.APP_CLIENT_SECRET}`
    );
    setUser(res.data);
    setLoading(false);
  };

  //Get Repos
  const getRepos = async username => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.APP_CLIENT_ID}&client_secret=${process.env.APP_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
  };

  return (
    <Switch>
      <div className='App'>
        <Navbar />

        <div className='container'>
          <Alert alert={alert} />
          <Route
            exact
            path='/'
            render={props => (
              <Fragment>
                <SearchForm
                  fireAlert={fireAlert}
                  searchUsers={searchUsers}
                  clearUsers={clearUsers}
                  showClear={users.length > 0 ? true : false}
                />
                <Users loading={loading} users={users} />
              </Fragment>
            )}
          />
          <Route
            exact
            path='/user/:username'
            render={props => (
              <User
                {...props}
                getUser={getUser}
                user={user}
                loading={loading}
                repos={repos}
                getRepos={getRepos}
              />
            )}
          />
          <Route exact path='/about' component={About} />
          <Route exact path='/contact' component={Contact} />
          <Route componet={NotFound} />
        </div>
      </div>
    </Switch>
  );
}

export default App;
