import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import Exchange from './Exchange';
import ClassDetails from './ClassDetails';
import { LoaderWithText } from '../../reusables/LoaderWithText';

const exchangeActions = {
    initiateExchange: 'Initiating Exchange',
    verifyExchange: 'Confirming Your Exchange Participation'
};

class OverviewContainer extends Component {
    state = {
        loading: false,
        action: ''
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
        const { loading, action } = this.state;
        const { teacher, exchange, currentClass } = this.props;
        const { firstName } = teacher;
        const exchangeAction = exchangeActions[ action ];
        return (
            <div>
                <LoaderWithText
                    loading={loading}
                    action={exchangeAction}
                />
                <div className='profile-segment'>
                    <h3>{`Welcome, ${firstName}`}!</h3>
                    <p>Here you can edit your teacher profile, manage all your enrolled classes or register a new class.</p>
                    <p>Once your class has been matched with another class and both participating classes have confirmed the participation, you will be able to access the Instructions and Materials needed.</p>
                </div>
                <hr style={{margin: '20px 0'}} />
                <Grid colums={2}>
                    <Grid.Column width={8} className='overview-class-details'>
                        <ClassDetails
                            classData={currentClass}
                            teacher={teacher}
                            title='Your Class '/>
                    </Grid.Column>
                    <Grid.Column width={8} className='overview-class-details'>
                        <ClassDetails
                            classData={exchange.exchangeClass}
                            teacher={exchange.exchangeClass && exchange.exchangeClass.teacher}
                            title='Exchange Class '/>
                    </Grid.Column>
                </Grid>
                <Exchange toggleLoader={this.toggleLoader.bind(this)} />
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

export default connect(mapStateToProps)(OverviewContainer);
