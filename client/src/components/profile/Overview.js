import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react'
import {  BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import SelectClass from '../SelectClass';
import TeacherForm from './TeacherForm';
import ClassDetails from './ClassDetails';
import ExchangeContainer from '../../containers/ExchangeContainer';
import { fetchClass } from '../../redux/actions/class';
import { getCountryName } from '../../utils/helpers';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { LoaderWithText } from './LoaderWithText';


class Overview extends Component {
    state = {
        loading: false,
        exchangeAction: ''
    }

    toggleLoader(bool, exchangeAction) {
        if (bool !== undefined) {
            this.setState({ loading: bool, exchangeAction })
        } else {
            this.setState({ loading: !this.state.loading, exchangeAction })
        }
    }

    componentWillReceiveProps() {
        this.toggleLoader(false, "");
    }

    render() {
        const { loading, exchangeAction } = this.state;
        const { teacher, classes, exchange } = this.props;
        const { firstName } = teacher;
        let classData;

        if (classes && classes.currentClass) {
            classData = classes.currentClass;
        }


        return (
            <div className='profile-form'>
                <LoaderWithText loading={loading} exchangeAction={exchangeAction} />
                <div className='profile-segment'>
                    <h3>{`Welcome, ${firstName}`}!</h3>
                    <p>Here you can edit your teacher profile, manage all your enrolled classes or register a new class.</p>
                </div>
                <ClassDetails
                    classData={classData}
                    teacher={teacher}
                    title='Your Class '/>
                <ClassDetails
                    classData={exchange.exchangeClass}
                    teacher={exchange.exchangeClass && exchange.exchangeClass.teacher}
                    title='Exchange Class '/>
                <ExchangeContainer
                    toggleLoader={this.toggleLoader.bind(this)}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        teacher: state.teacher,
        classes: state.classes,
        exchange: state.exchange,
        feedback: state.feedback
    }
}

export default connect(mapStateToProps, { fetchClass })(Overview);
