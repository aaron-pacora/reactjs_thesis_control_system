import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Header from '../../../render/intranet/theses/form/header.jsx';
import Body from '../../../render/intranet/theses/form/body.jsx';
import UserShow from '../../../render/intranet/theses/all/userShow.jsx';

import '../../../../sass/modules/intranet/theses/form.sass';

class form extends Component {
    render() {
        return (
            <div className="view_form_thesis">
                <Body/>
                <UserShow/>
            </div>
        );
    }
}

export default form;