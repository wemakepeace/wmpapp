import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Grid, Image, Accordion, Icon } from 'semantic-ui-react';
import { LoaderWithText } from '../../reusables/LoaderWithText';
import SelectClass from '../../reusables/SelectClassDropdown';
import RegisterClass from '../../reusables/RegisterClass';
import Class from './Class';
import { fetchClass, removeCurrentClass } from '../../../redux/actions/class';

const exchangeActions = {
    initiateExchange: 'Initiating Exchange',
    verifyExchange: 'Confirming Your Exchange Participation'
};


const Overview = ({ teacher, onClassSelect, history }) => {
    return (
        <div>
            <div className='profile-segment'>
                <h3>{`Welcome, ${teacher.firstName}`}!</h3>
                <p>Here you can manage all your enrolled classes or register a new class.</p>
            </div>
            <div className='profile-segment'>
                <div className='exchange-actions'>
                    { teacher && teacher.classes ?
                        <div>
                            <React.Fragment>
                                <h4>Select class</h4>
                                <SelectClass onClassSelect={onClassSelect} />
                            </React.Fragment>
                        </div>  : null
                    }
                    <div>
                        <button className='roll-button'>
                            <RegisterClass history={history}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

class MyClasses extends Component {
    state = {
        loading: false,
        action: '',
        showSegmentOne: false
    }

     onClassSelect(selected){
        this.props.fetchClass(selected.value);
        this.props.history.push(`${this.props.match.url}/${selected.value}/progress`);
    }

    toggleLoader(bool, action) {
        if (bool !== undefined) {
            this.setState({ loading: bool, action });
        } else {
            this.setState({ loading: !this.state.loading, action });
        }
    }

    componentWillReceiveProps() {
        this.toggleLoader(false, "");
    }

    render() {
        const { loading, action, showSegmentOne } = this.state;
        const { teacher, exchange, currentClass, history, match } = this.props;
        const exchangeAction = exchangeActions[ action ];

        return (
            <div className='my-classes'>
                <LoaderWithText
                    loading={loading}
                    text={exchangeAction}
                />
                <Route
                    path={`${match.path}/:classId`}
                    render={(props) => (
                        <Class
                            {...this.props}
                            {...props}
                            toggleLoader={this.toggleLoader.bind(this)}
                        />)
                    }
                    {...this.props}
                />
                <Route
                    exact path={`${match.path}`}
                    render={(props) => (
                        <Overview
                            {...this.props}
                            {...props}
                            onClassSelect={this.onClassSelect.bind(this)}
                        />)
                    }
                />
            </div>
        );
    }
}

const mapStateToProps = ({ teacher, currentClass, exchange }) => {
    return {
        teacher,
        currentClass,
        exchange
    };
};

export default connect(mapStateToProps, { fetchClass, removeCurrentClass })(MyClasses);
