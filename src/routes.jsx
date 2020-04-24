import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import global from '../providers/global.static.jsx';

import Home from './components/modules/home/home'

import ListTheses from './components/modules/intranet/theses/list';
import FormTheses from './components/modules/intranet/theses/form';

import User from './components/modules/intranet/user/configure';
import ErrorPage from './components/modules/intranet/error_page/error_page';
import Cookie from './components/utils/cookie';

var st_conn = !!document.cookie;
const AppRoutes = () => {
    
        if(Cookie.readCookie("user_name"))
        {
            return (   
                <Switch>
                    <Route exact path="/tesis" component={ListTheses} />
                    <Route exact path="/nuevo" component={FormTheses} />
                    <Route exact path="/usuario" component={User} />
                    <Route component={ErrorPage} />
                </Switch>
            )
        }else{
            return (
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route component={ErrorPage} />
                </Switch>
                
            )
        }
        
}

export default AppRoutes;