import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Menu from '../pages/Menu';
import Person from '../pages/Person';
import Report from '../pages/Report';
import Report2 from '../pages/Report2';


function Routes() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path = "/" component={Login} /> {/* Ruta que será alojado el componente */}
      <Route exact path = "/dashboard" component={Menu} />
      <Route exact path = "/profile" component={Person} />
      <Route exact path = "/report" component={Report} />
      <Route exact path = "/report2" component={Report2} />
    </Switch>
    </BrowserRouter>
  );
}

export default Routes;
