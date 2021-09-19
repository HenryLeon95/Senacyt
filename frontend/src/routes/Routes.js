import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Menu from '../pages/Menu';


function Routes() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path = "/" component={Login} /> {/* Ruta que será alojado el componente */}
      <Route exact path = "/dashboard" component={Menu} />
    </Switch>
    </BrowserRouter>
  );
}

export default Routes;
