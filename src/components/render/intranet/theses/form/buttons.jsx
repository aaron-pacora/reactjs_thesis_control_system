
import React, { Component } from 'react';

class ItemGroup extends Component {
    constructor(props) {
        super(props);

        this.onClickSave = this.props.onClickSave;
    }

    render() {
        return (
            <div className="buttons">
                <div className="btn_continue" onClick={this.onClickSave}>Continuar</div>
                <div className="btn_cancel">Cancelar</div>
            </div>
        )
    }
}
export default ItemGroup;