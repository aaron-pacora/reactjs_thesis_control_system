import React, { Component } from 'react';

import ButtonLogout from '../../all/buttonLogout';

import global from '../../../../../../providers/global.static.jsx';

class UserShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            full_name : "",
            role_name : "",
            color     : ""
        };
    }

    componentDidMount(){
        this.getDataUser();
    }

    getDataUser(){
        fetch(global.URLBASESERVICE + "/user/data_in_cookie", {
            method: 'POST',
            credentials: "include"
        })
        .then((response) => {
            return response.json();
        })
        .then((rpta) => {
            this.setState({
                full_name: rpta.full_name,
                role_name: rpta.role_name
            });
            $('.tooltipped').tooltip({ delay: 50 });
        }).catch(()=>{
            this.setState({
                full_name : "¡Ha ocurrido un error!",
                role_name : "Esperando...",
                color     : "error_cn"
            });
            $('.tooltipped').tooltip({ delay: 50 });
        });
    }
    
    render() {
        return (
            <div className="user_show">
                {(()=>{
                    if(this.state.role_name != ""){
                        return <a className="content_data tooltipped z-depth-3" href="/usuario"
                            data-position="top" data-delay="50" data-tooltip={this.state.role_name}>
                            <span>{this.state.full_name}</span>
                            <div className={"icon_type_user "+this.state.color}></div>
                            <ButtonLogout />
                        </a>;
                    }
                })()}
            </div>
        )
    }
}
export default UserShow;