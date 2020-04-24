import React, { Component } from 'react';
import validator from 'validator';

import global from '../../../../../../providers/global.static.jsx';

import SvgCalendar from '../../../../../icons/svg_calendar.svg';

import ItemGroup from './itemGroup.jsx';
import Buttons from './buttons.jsx';
import InputList from './inpCoincidences.jsx';

import Utils from '../../../../utils/utils.jsx';

class Body extends Component {
    constructor(props) {
        super(props);
        this.utils = new Utils();
        this.onChangeTitle    = this.onChangeTitle.bind(this);
        this.onChangeCode     = this.onChangeCode.bind(this);
        this.executeSave      = this.executeSave.bind(this);
        this.updateDataToSave = this.updateDataToSave.bind(this);
        this.state = {
            schoolsList : [], // escuelas para el select
            chargeList  : [],
            reaload : false
        };
        
        this.data = {
            title_thesis : null,
            date_lift    : null,
            code         : null,
            author       : [],
            jury         : [],
            adviser      : []
        };
    }

    updateDataToSave(type,index,data){
        this.data[type][index] = data;
    }

    componentDidMount(){
        this.fetchGetSchools();
        this.fetchGetCharges();
        $('.datepicker').pickadate({
            selectMonths: true,
            selectYears: 15,
            today: 'Hoy',
            clear: 'Limpiar',
            close: 'Ok',
        });
    }

    fetchGetSchools() {
        fetch(global.URLBASESERVICE + "/school", {
            method: 'POST',
            credentials: "include"
        })
        .then((response) => {
            return response.json();
        })
        .then((rpta) => {
            this.setState({ schoolsList: rpta });
        });
    }

    fetchGetCharges() {
        fetch(global.URLBASESERVICE + "/charge", {
            method: 'POST',
            credentials: "include"
        })
        .then((response) => {
            return response.json();
        })
        .then((rpta) => {
            this.setState({ chargeList: rpta });
        });
    }

    onChangeTitle(event){
        this.data.title_thesis = event.target.value;
        this.setState({ reaload: true});
    }
    onChangeCode(event){
        this.data.code = event.target.value;
        this.setState({ reaload: true});
    }

    render() {
        return (
            <div className="body_view_form_thesis">
                <h1>Añadir una Tesis</h1>
                <div className="content_group z-depth-3">
                    <div className="title_count_group">
                        <span>Tesis</span>
                    </div>
                    <div class="input-field inp_thesis">
                        <input id="thesis" type="text"
                                value={this.data.title_thesis}
                                onChange={this.onChangeTitle}/>
                        <label for="thesis">Nombre de Tesis</label>
                    </div>
                    <div className="complements">
                        <div class="complement_thesis">
                            <input id="thesis" type="text"
                                value={this.data.code} placeholder="Código de Tesis"
                                onChange={this.onChangeCode} />
                        </div>
                        <div class="complement_thesis">
                            <input id="date_lift" type="text" class="datepicker" placeholder="Publicación"/>
                            <div className="icon">
                                <SvgCalendar/>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {(()=>{
                        if(this.state.schoolsList.length != 0){
                            return <ItemGroup title="Autor(es)" baseId="author"
                                arrayData={this.state.schoolsList}
                                titleSelect={"Escuela"}
                                dataToSave={this.data.author}
                                updateDataToSave={this.updateDataToSave}/>;
                        }
                    })()}
                    <ItemGroup title="Asesor(es)" baseId="adviser"
                                dataToSave={this.data.adviser}
                                updateDataToSave={this.updateDataToSave}/>
                    {(()=>{
                        if(this.state.chargeList.length != 0){
                            return <ItemGroup title="Jurado(s)" baseId="jury"
                                arrayData={this.state.chargeList}
                                titleSelect={"Cargo"}
                                dataToSave={this.data.jury}
                                updateDataToSave={this.updateDataToSave}/>;
                        }
                    })()}
                </div>
                <Buttons onClickSave={this.executeSave}/>
            </div>
        )
    }

    executeSave(){
        let valDate = $("#date_lift").val();
        if (!(valDate != "" && valDate != null)){
            Materialize.toast("Seleccione una fecha!", 4000);
            return false;
        }
        // let dateLiftValue = valDate.replace(",", "");
        // let arrDate = dateLiftValue.split(" ");
        // arrDate[1] = this.utils.getMonthNumberByName(arrDate[1]);
        // this.data.date_lift = arrDate.join("/");
        this.data.date_lift = valDate;
        console.log(this.data);
    }
}
export default Body;
