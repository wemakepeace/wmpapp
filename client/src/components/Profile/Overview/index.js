import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Image } from 'semantic-ui-react';
import Exchange from './Exchange';
import ClassDetails from './ClassDetails';
import { LoaderWithText } from '../../reusables/LoaderWithText';
import SelectClass from '../../reusables/SelectClassDropdown';
import RegisterClass from '../../reusables/RegisterClass';
import { fetchClass } from '../../../redux/actions/class';
import peaceGirlImg from '../../../../../assets/images/peacegirl.png';

const exchangeActions = {
    initiateExchange: 'Initiating Exchange',
    verifyExchange: 'Confirming Your Exchange Participation'
};

class OverviewContainer extends Component {
    state = {
        loading: false,
        action: ''
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
        const { loading, action } = this.state;
        const { teacher, exchange, currentClass, history } = this.props;
        const { firstName } = teacher;
        const exchangeAction = exchangeActions[ action ];

        return (
            <div className='overview'>
                <LoaderWithText
                    loading={loading}
                    text={exchangeAction}
                />
                <div className='profile-segment'>
                    <h2>{`Welcome, ${firstName}`}!</h2>
                    <p>Here you can edit your teacher profile, manage all your enrolled classes or register a new class.</p>
                    <p>Once a class has been matched with another class and both participating classes have confirmed the participation, you will be able to access the Instructions and Materials in the main menu.</p>
                    <p>If you need a refresher on how the program works, see <a href='//wemakepeace.org/peace-letter-program' targer='_blank'>here</a>.</p>
                </div>
                <div className='overview-actions'>
                    <div>
                    { teacher && teacher.classes ?
                        <React.Fragment>
                            <h2>Select class</h2>
                            <SelectClass onClassSelect={this.onClassSelect.bind(this)} />
                        </React.Fragment> : null
                    }
                    </div>
                    <div>
                        <button className='roll-button'>
                            <RegisterClass history={history}/>
                        </button>
                    </div>
                </div>
                <Exchange toggleLoader={this.toggleLoader.bind(this)} />
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

export default connect(mapStateToProps, { fetchClass })(OverviewContainer);
