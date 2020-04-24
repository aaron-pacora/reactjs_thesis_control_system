import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import IconClose from './../../../../../icons/svg_close.svg';
import global from '../../../../../../providers/global.static';
import Countdown from 'react-countdown-now';


class Button_Action extends Component {
    constructor(props){
        super(props);
        this.rectangule = null;
        this.form_add_user = null;
        this.form_change_password = null;
        this.state = {
            change_pass : "",
            change_new_pass : "",
            change_confirm_pass : "",
            add_name : "",
            add_pass : "",
            add_confirm_pass : "",
            status_change_pas:false,
            user_name:this.props.user_name,
            viewTiming:false,
            timing:0
        }
    }
    componentDidMount(){
        this.rectangule = $('div.thir_part');
        this.rectangule.hide();
        this.form_add_user = $('form.form_add_user');
        this.form_change_password = $('form.form_change_pass');
        this.forms = $('form');
        let close_button = $('.close_icon');
        $(document).ready(function () {
            $('select').material_select();
            
        });
    }
    change_pass(e){
        e.preventDefault();
        this.rectangule.show();
        this.forms.removeClass('not_visible');
        this.forms.addClass('not_visible');
        this.form_change_password.removeClass('not_visible');
    }
    add_user(e){
        e.preventDefault();
        this.rectangule.show();
        this.forms.removeClass('not_visible');
        this.forms.addClass('not_visible');
        this.form_add_user.removeClass('not_visible');
    }

    validateCurrentPassword(e){
        if (this.state.change_pass.value != "") {
            let data = new FormData();
            data.append("password",this.state.change_pass.value);
            data.append("user_name", this.state.user_name);            
            fetch(global.URLBASESERVICE + "/user/validate_current_password",{
                method : "POST",
                credentials:'include',
                body:data
            })
            .then((response)=>{
              return response.json();
            })
            .then((rpta)=>{
                switch (rpta) {
                    case "warning":
                        console.log(rpta);
                        break;
                    case "block":
                        console.log(rpta);
                        this.setState({viewTiming:true,timing:10000});
                        $('input').removeClass('invalid');
                        $('input').removeClass('valid');
                        $('input').attr("disabled","disabled");
                        break;
                    case true:
                        console.log(rpta);
                        break;
                        // $('input#last_passsword').removeClass('invalid');
                        // $('input#last_passsword').addClass('valid');
                    case false:
                        console.log(rpta);
                        break;
                        // $('input#last_passsword').removeClass('valid');
                        // $('input#last_passsword').addClass('invalid');
                }
                // console.log(rpta);
                // if (rpta) {
                //     $('input#last_passsword').removeClass('invalid');
                //     $('input#last_passsword').addClass('valid');
                // }else{
                //     $('input#last_passsword').removeClass('valid');
                //     $('input#last_passsword').addClass('invalid');
                // }
            });
        }
    }

    validatePassword(e){
        if (this.state.change_new_pass.value != "") {
            var cont = 0;
            var filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890';
            for (var i = 0; i < this.state.change_new_pass.value.length; i++)
                if (filtro.indexOf(this.state.change_new_pass.value.charAt(i)) != -1){
                    cont ++
                }
            if (cont == this.state.change_new_pass.value.length) {
                for (var i = 0; i < this.state.change_new_pass.value.length; i++)
                    if (!isNaN(this.state.change_new_pass.value.charAt(i))) {
                        return true;
                    }
            }
            return false;
        }
        return 1;
    }
    validatePassWithNew(e){
        if (this.state.change_confirm_pass.value != "" && this.state.change_new_pass.value != "") {
            if (this.state.change_confirm_pass.value === this.state.change_new_pass.value) {
                $('input#repeat_pass').removeClass('invalid');
                $('input#repeat_pass').addClass('valid');
                this.setState({ status_change_pas:true});
            }else{
                $('input#repeat_pass').removeClass('valid');
                $('input#repeat_pass').addClass('invalid');
                this.setState({ status_change_pas: false });                       
            }
        }
    }
    send_change_pass(e){
        e.preventDefault();
        if (this.state.change_pass.value != "" && this.state.change_new_pass.value != "" && this.state.change_confirm_pass.value != "") {
            if (this.state.status_change_pas) {
                let data = new FormData();
                data.append("new_pass", this.state.change_confirm_pass.value);
                data.append("user_name", this.state.user_name);                
                fetch(global.URLBASESERVICE + "/user/change_password",{
                    method: 'POST',
                    credentials:'include',
                    body:data
                })
                .then((Response)=>{
                    return Response.json();
                }).then((rpta)=>{
                    console.log(rpta);
                });
            }else{
                Materialize.toast('¡Corrija los campos con error!', 4000);                    
            }
        }else{
            Materialize.toast('¡Debe completar los campos!', 4000);
        }
    }
    send_add_user(e) {
        e.preventDefault();
        console.log(this.state.add_name.value);
        if (this.state.add_name.value != "" && this.state.add_pass.value != "" && this.state.add_confirm_pass.value != "") {
        } else {
            Materialize.toast('Debe completar los campos', 4000);
        }
    }
    render() {
        return (
            <div className="button_action">
                <div className="buttons_part_view_user">
                    <button className="button_design" id="change_password"
                            onClick = {(e)=>this.change_pass(e)}
                            >Cambiar Contraseña</button>
                    <button className="button_design" id="add_user"
                            onClick={(e) => this.add_user(e)}    
                            >Agregar Usuario</button>
                </div>
                <div class="thir_part">
                    <div className="close_icon"
                        onClick={(e)=>{
                            this.state.add_confirm_pass.value="";
                            this.state.change_confirm_pass.value = "";
                            this.state.change_new_pass.value = "";
                            this.state.add_name.value = "";
                            this.state.add_pass.value = "";
                            this.state.change_pass.value = "";
                            $('input.select-dropdown').val("Elige un rol");
                            $('input').focus();
                            $('input').blur();                          
                            $('div.thir_part').hide();
                        }}
                    >
                        <IconClose/>
                    </div>
                    <div class="rectangule_user_view z-depth-2">
                        <form action="" class="form_change_pass not_visible">
                            <div className="form_on">
                                <div class="input-field inp_short">
                                    <input id="last_passsword" type="password" className="validate"
                                        ref={(input) => { this.state.change_pass = input;}}
                                        onBlur={(e)=>{
                                            this.validateCurrentPassword(e);
                                        }}
                                            />
                                    <label for="last_passsword" data-error="Incorrecto" data-success="Correcto">Contraseña Actual</label>
                                    {(()=>{
                                        if (this.state.viewTiming) {
                                            const Completionist = () => { 
                                                this.setState({ viewTiming: false });
                                                this.state.change_pass.value = "";
                                                $('input').focus();
                                                $('input').blur();
                                                $('input').prop("disabled", false);
                                                return(
                                                    <span>Adios</span>
                                                )
                                            }
                                            return(
                                                <Countdown date={Date.now() + this.state.timing}>
                                                    <Completionist/>
                                                </Countdown>
                                            )
                                        }
                                    })()}
                                </div>
                                <div class="input-field inp_short">
                                    <input id="new_password" type="password" className="validate"
                                        ref={(input) => { this.state.change_new_pass = input;}}
                                        onKeyUp = {(e)=>{
                                            let status = this.validatePassword();
                                            if (status === true) {
                                                $('input#new_password').removeClass('invalid');
                                                $('input#new_password').addClass('valid');
                                            }
                                            if (status === false) {
                                                $('input#new_password').removeClass('valid');
                                                $('input#new_password').addClass('invalid');
                                            }
                                            this.validatePassWithNew(e);
                                        }}
                                        onBlur={(e) => { 
                                            console.log("en el blur");
                                            let status = this.validatePassword(e);
                                            if (status === true) {
                                                $('input#new_password').removeClass('invalid');
                                                $('input#new_password').addClass('valid');
                                            }
                                            if (status === false) {
                                                console.log("en el false");                                                
                                                $('input#new_password').removeClass('valid');
                                                $('input#new_password').addClass('invalid');
                                            }
                                            this.validatePassWithNew(e);
                                        }}  
                                            />
                                    <label for="new_password" data-error="Incorrecto" data-success="Correcto">Nueva Contraseña</label>
                                </div>
                                <div class="input-field inp_short">
                                    <input id="repeat_pass" type="password" className="validate"
                                        ref={(input) => { this.state.change_confirm_pass = input;}}
                                        onKeyUp = {(e)=>{
                                            this.validatePassWithNew(e);
                                        }}
                                        onBlur={(e) => { this.validatePassWithNew(e);}}
                                            />
                                    <label for="repeat_pass" data-error="Incorrecto" data-success="Correcto">Repetir contraseña</label>
                                </div>
                            </div>
                            <button className="button_design"
                                    onClick = {(e)=>{this.send_change_pass(e)}}
                                    >Guardar</button>
                        </form>
                        <form action="" class="form_add_user not_visible">
                            <div className="form_on">
                                <div class="input-field inp_short">
                                    <input id="name" type="text" 
                                        ref={(input) => { this.state.add_name = input;}}
                                            />
                                    <label for="name">Nombre</label>
                                </div>
                                <div class="input-field inp_short">
                                    <input id="user_name" type="text" 
                                        ref={(input) => { this.state.add_pass = input;}}
                                            />
                                    <label for="user_name">Nombre de usuario</label>
                                </div>
                                <div class="input-field inp_short">
                                    <input id="password" type="password" 
                                        ref={(input)=>{this.state.add_confirm_pass = input;}}
                                            />
                                    <label for="password">Contraseña</label>
                                </div>
                                <div className="input-field col s12">
                                    <select>
                                        <option value="" disabled selected>Elige un rol</option>
                                        <option value="1">Option 1</option>
                                        <option value="2">Option 2</option>
                                        <option value="3">Option 3</option>
                                    </select>
                                </div>
                            </div>
                            <button className="button_design"
                                    onClick = {(e)=>{this.send_add_user(e)}}
                                    >Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Button_Action;