import React from 'react';

export default props => {
    return (
        <ul ref = {props.setRef} className="sidenav" id= "side-nav">
            {props.renderLinks()}
        </ul>
    );
};