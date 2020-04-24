import React, { Component } from 'react';

import global from '../../../../../../providers/global.static.jsx';

import InputCoincidences from './inpCoincidences.jsx';
import JuryInputs from './juryInputs';

class ItemGroup extends Component {
    constructor(props) {
        super(props);
        this.onChangeCount = this.onChangeCount.bind(this);
        this.data = this.props.dataToSave;
        this.state = {
            count : (this.data.length == 0) ? 1 : this.data.length
        };
        this.baseID   = this.props.baseId;
        this.title    = this.props.title;
        this.titleSelect = this.props.titleSelect;
    }

    onChangeCount(e){
        let count = e.target.value;
        if (count < 1){
            count = 1;
        }else if(count > 3 ){
            let arr = (count + "").split("");
            count = arr[arr.length - 1];
            if (count > 3){
                count = 3;
            }
        }
        let currentCount = this.state.count;
        if (count != currentCount){
            if (currentCount < count){
                for (let i = count; i <= this.data.length; i++) {
                    this.data.splice(i - 1,1);
                }
            }
            this.setState({count});
        }
    }

    render() {
        return (
            <div className="content_group item_group z-depth-2">
                <div className="title_count_group">
                    <span>{this.title}</span>
                    <div className="count_box">
                        <input type="number" name="count_authors"
                        value={this.state.count} onChange={this.onChangeCount}/>
                    </div>
                </div>
                {(()=>{
                    let elements = [];
                    for (let i = 1; i <= this.state.count; i++) {
                        elements.push(this.elements(i));
                    }
                    return elements;
                })()}
            </div>
        )
    }

    elements(count){
        let base = this.baseID+"_"+count;
        let typeUser = this.title.split("(")[0];
        return <div className="elemet_item" key={count}>
                <div className="content_new_user">
                    <div className="desc_user">
                        <span>{typeUser + " " + count}</span>
                    </div>
                    {(()=>{
                    let dataCurrent = (this.data[count - 1] != undefined) ? this.data[count - 1] : {};
                        if(this.baseID != 'jury'){
                            return <InputCoincidences type={this.baseID}
                                        findData={this.findPersons}
                                        dataCurrent={dataCurrent}
                                        count={count}
                                        title={typeUser}
                                        titleSelect={this.titleSelect}
                                        createPerson={this.createPerson}
                                        arrayData={this.props.arrayData}
                                    />;
                        }else{
                            return <JuryInputs type={this.baseID}
                                        findData={this.findPersons}
                                        dataCurrent={dataCurrent}
                                        count={count}
                                        title={typeUser}
                                        titleSelect={this.titleSelect}
                                        createPerson={this.createPerson}
                                        arrayData={this.props.arrayData}
                                    />;
                        }
                    })()}
                </div>
        </div>;
    }

    findPersons(newVal, type) {
        return new Promise((resolve, reject) => {
            let data = new FormData();
            data.append(type + "_name", newVal);
            fetch(global.URLBASESERVICE + "/" + type + "/filter", {
                method: 'POST',
                credentials: "include",
                body: data
            })
            .then((response) => {
                return response.json();
            })
            .then((rpta) => {
                resolve(rpta);
            }).catch(() => {
                resolve([]);
            });
        });
    }

    createPerson(type,data){
        return new Promise((resolve, reject) => {
            fetch(global.URLBASESERVICE + "/" + type + "/async_create", {
                method: 'POST',
                credentials: "include",
                body: data
            })
            .then((response) => {
                return response.json();
            })
            .then((rpta) => {
                resolve(rpta);
            }).catch(() => {
                resolve([]);
            });
        });
    }
}
export default ItemGroup;