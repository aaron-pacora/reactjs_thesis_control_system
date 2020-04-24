import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Information from './../../../render/intranet/user/configure/information_user.jsx';
import Buttons_action from './../../../render/intranet/user/configure/button_action.jsx';
import global from '../../../../../providers/global.static.jsx';

import './../../../../sass/modules/intranet/user/configure.sass'


class Configure extends Component{
    constructor(){
        super();
        this.state = {
            full_name: null,
            role_name:null,
            user_name:null
        }
        fetch(global.URLBASESERVICE + "/user/data_in_cookie", {
            method: 'POST',
            credentials: "include"
        })
        .then((response) => {
            return response.json();
        })
        .then((rpta) =>{
            console.log(rpta);
            this.setState({full_name : rpta.full_name,role_name:rpta.role_name,user_name:rpta.user_name})
            console.log(this.state.user_name);
        })
    }
    render(){
        if (this.state.full_name != null) {
            return(
                <div className="user_view">
                    <div className="content_view">
                        <h3 className="title">Perfil</h3>                    
                        <Information
                            full_name = {this.state.full_name}
                            role_name = {this.state.role_name}
                            user_name = {this.state.user_name}
                        />
                        <Buttons_action
                            user_name={this.state.user_name}                            
                        />
                    </div>
                </div>
            );
        }else{
            return <div></div>
        }
    }
}

export default Configure;