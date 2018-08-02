import React, { Component } from 'react';
import { connect } from 'react-redux';
import Exchange from './Exchange';
import ClassDetails from './ClassDetails';
import { LoaderWithText } from '../../reusables/LoaderWithText';


class OverviewContainer extends Component {
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
        const { teacher, exchange, currentClass } = this.props;
        const { firstName } = teacher;

        return (
            <div>
                <LoaderWithText
                    loading={loading}
                    exchangeAction={exchangeAction}
                />
                <div className='profile-segment'>
                    <h3>{`Welcome, ${firstName}`}!</h3>
                    <p>Here you can edit your teacher profile, manage all your enrolled classes or register a new class.</p>
                </div>
                <ClassDetails
                    classData={currentClass}
                    teacher={teacher}
                    title='Your Class '/>
                <ClassDetails
                    classData={exchange.exchangeClass}
                    teacher={exchange.exchangeClass && exchange.exchangeClass.teacher}
                    title='Exchange Class '/>
                <Exchange
                    toggleLoader={this.toggleLoader.bind(this)}
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

export default connect(mapStateToProps)(OverviewContainer);
