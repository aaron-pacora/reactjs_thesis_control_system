import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import UserShow from '../../../render/intranet/theses/all/userShow.jsx';

import Header from '../../../render/intranet/theses/list/header.jsx';
import Body from '../../../render/intranet/theses/list/body.jsx';

import '../../../../sass/modules/intranet/theses/list.sass';

class theses extends Component {
    render() {
        return (
            <div className="view_list_thesis">
                <Header/>
                <Body/>
                <UserShow/>
            </div>
        );
    }
}

export default theses;