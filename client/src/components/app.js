import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import AccountRoutes from './account';
import { Route, Switch } from 'react-router-dom';


const App = () => (
    <div>
        <div className="container">
            <Switch>
                <Route path = "/account" component = {AccountRoutes}/>
            </Switch>
        </div>
    </div>
);

export default App;
