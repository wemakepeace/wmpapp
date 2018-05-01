import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Menu } from 'semantic-ui-react'

const ClassMenu = ({ classes }) => {
    const items = classes.map(_class  => {
        return {
            key: _class.id,
            name: _class.name
        }
    })

    return (
        <Menu size='tinu' items={items} />
    )
}

export default ClassMenu;
