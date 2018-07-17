import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react'
import {  BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import SelectClass from '../SelectClass';
import TeacherForm from './TeacherForm';
import ClassDetails from './ClassDetails';
import ExchangeOverview from './ExchangeOverview';
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

    shouldComponentUpdate({ classes }) {
        return classes && classes.currentClass ? true : false
    }

    render() {
        const { loading, exchangeAction } = this.state;
        const { teacher, classes, exchange } = this.props;
        const { firstName } = teacher;
        let classData;

        if (classes && classes.currentClass) {
            classData = classes.list[ classes.currentClass ];
        }

        return (
            <div className='profile-form'>
                <LoaderWithText loading={loading} exchangeAction={exchangeAction} />
                <div className='profile-segment'>
                    <h3>{`Welcome, ${firstName}`}!</h3>
                    <p>Here you can edit your teacher profile, manage all your enrolled classes or register a new class.</p>
                </div>
                <hr style={{margin: '20px 0'}}/>
                <ClassDetails
                    classData={classData}
                    teacherData={teacher}
                    title='Your Class '/>

                <hr style={{margin: '20px 0'}}/>
                <ExchangeOverview toggleLoader={this.toggleLoader.bind(this)} />
            </div>
        )
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
