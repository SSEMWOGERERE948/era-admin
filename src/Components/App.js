import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../Components/Login';
import Home from '../Components/Home';
import Bookings from '../Components/Bookings';
import Rooms from '../Components/Rooms';
import Contacts from '../Components/Contacts';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <Switch>
        <Route path="/bookings">
          <Bookings />
        </Route>
        <Route path="/rooms">
          <Rooms />
        </Route>
        <Route path="/contacts">
          <Contacts />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          {loggedIn ? <Home /> : <Login onLogin={handleLogin} />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
