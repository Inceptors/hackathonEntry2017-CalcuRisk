import React from 'react';
import ReactDOM from 'react-dom';

import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';

import App from 'containers/App/App.jsx';

import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';

import LoginPage from './views/Pages/LoginPage.jsx';




ReactDOM.render((
    <HashRouter>
        <Switch>
            <Route path="/login" name="Login" component={LoginPage} />
            <Route path="/" name="Home" component={App}/>

        </Switch>
    </HashRouter>
),document.getElementById('root'));
