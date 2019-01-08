import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Grid, Image, Accordion, Icon } from 'semantic-ui-react';
import { LoaderWithText } from '../../reusables/LoaderWithText';
import SelectClass from '../../reusables/SelectClassDropdown';
import RegisterClass from '../../reusables/RegisterClass';
import Class from './Class';
import { fetchClass } from '../../../redux/actions/class';

const exchangeActions = {
    initiateExchange: 'Initiating Exchange',
    verifyExchange: 'Confirming Your Exchange Participation'
};

class MyClasses extends Component {
    state = {
        loading: false,
        action: '',
        showSegmentOne: false
    }

     onClassSelect(selected){
        this.props.fetchClass(selected.value);
    }

    toggleLoader(bool, action) {
        if (bool !== undefined) {
            this.setState({ loading: bool, action })
        } else {
            this.setState({ loading: !this.state.loading, action })
        }
    }

    componentWillReceiveProps() {
        this.toggleLoader(false, "");
    }

    render() {
        const { loading, action, showSegmentOne } = this.state;
        const { teacher, exchange, currentClass, history, match } = this.props;
        const { firstName } = teacher;
        const exchangeAction = exchangeActions[ action ];

        return (
            <div className='my-classes'>
                <LoaderWithText
                    loading={loading}
                    text={exchangeAction}
                />
                <div className='profile-segment'>
                    <h2>{`Welcome, ${firstName}`}!</h2>
                    <p>Here you can create or edit your teacher profile, manage all your enrolled classes or register a new class.</p>
                </div>
                <div className='profile-segment'>
                    <div className='exchange-actions'>
                        { teacher && teacher.classes ?
                            <div>
                                <React.Fragment>
                                    <h2>Select class</h2>
                                    <SelectClass onClassSelect={this.onClassSelect.bind(this)} />
                                </React.Fragment>
                            </div>  : null
                        }
                        <div>
                            <button className='roll-button'><RegisterClass history={history}/></button>
                        </div>
                    </div>
                </div>
                <Route
                    path={`${match.path}/:childpath`}
                    render={(props) => (
                        <Class
                            {...this.props}
                            {...props}
                            toggleLoader={this.toggleLoader.bind(this)}
                        />
                    )}
                    {...this.props}
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

export default connect(mapStateToProps, { fetchClass })(MyClasses);
