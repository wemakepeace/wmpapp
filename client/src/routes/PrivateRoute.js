import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Redirect, Route } from 'react-router-dom';
import axios from 'axios';

class PrivateRoute extends Component {
    state = {
        isAuth: false
    }

    componentWillMount() {
        if (this.props.auth === true && localStorage.getItem('token')) {
            this.setState({isAuth: true});
        }
    }


    render() {
        const Component = this.props.component;
        const props = this.props;
        let newProps = {}

        for(let prop in props) {
            if(prop !== 'component') {
                newProps[prop] = props[prop];
            }
        }

        return (
            <Route {...newProps} render={ (newProps) => (
                this.state.isAuth === true
                ? <Component {...newProps} />
                : <Redirect to='/flex' />
            )}/>
        )
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
