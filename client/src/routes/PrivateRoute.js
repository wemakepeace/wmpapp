import React, { Component } from 'react';
import {  Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import NoAccess from '../components/error_pages/NoAccess';

class PrivateRoute extends Component {
    state = {
        isAuth: false
    }

    componentDidMount() {
        if (this.props.teacher && this.props.teacher.id) {
            this.setState({ isAuth: true });
        }
    }

    componentWillReceiveProps(newProps) {
        if(this.props.teacher && this.props.teacher.id) {
            this.setState({ isAuth: true });
        }
    }

    render() {
        const Component = this.props.component;
        const { loading } = this.props;
        const props = this.props;
        let newProps = {};

        for(let prop in props) {
            if(prop !== 'component') {
                newProps[prop] = props[prop];
            }
        }

        if (!loading) {
            return (
                <Route {...newProps} render={ (newProps) => (
                    this.state.isAuth === true
                    ? <Component {...newProps} />
                    : <NoAccess {...newProps} />
                )}/>
            )
        }
        return null
    }
};

export default PrivateRoute;
