import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Async } from 'react-select';
import countries from 'country-list';

import WMPHeader from '../WMPHeader';
import Feedback from '../Feedback';

import { updateSchool } from '../../redux/actions/school';
import { fetchClass } from '../../redux/actions/class';


class SchoolForm extends Component {
    state = {
        id: '',
        name: '',
        address1: '',
        address2: '',
        city: '',
        zip: '',
        state: '',
        country: '',
        showFeedback: false
    }

    fetchCountries() {
        let options;
        return new Promise((resolve, reject) => {
            const list = countries().getData()

            options = list.map(el => {
                return {
                    label: el.name,
                    value: el.code
                }
            });

            options.length ? resolve() : reject();
        })
        .then(res => {
            return { options: options }
        })
    }

    onInputChange = (ev, key) => this.setState({ [key]: ev.target.value })

    onSelectOptionChange = (select, key) => this.setState({ [key] : select.value, showFeedback: false })

    sendDataToParent = () => {
        const data = this.state;
        return this.props.submitAllData(data);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.feedback && nextProps.feedback.type) {
            this.setState({ showFeedback: true });
        }
    }

    componentDidMount() {
        if (this.props.classes && this.props.classes.currentClass) {
            const currentClass = this.props.classes.list[this.props.classes.currentClass];
            const school = currentClass.school ? currentClass.school : {};

            this.setState(school);
        }
    }

    render() {
        // console.log('this.props.fetchSchoolData', this.props.fetchSchoolData)
        // console.log('this.props.fetchSchoolData()', this.props.fetchSchoolData())
        const { name, address1, address2, zip, city, state, country, showFeedback } = this.state;
        const { feedback } = this.props;

        return (
            <div className='profile-segment'>
                <h4> School Address</h4>
                <p>This is the address that will be used in the Exchange for sending letters.</p>
                <div className='form-row'>
                    <label className='form-label'>School name</label>
                    <span className='form-input-span'>
                        <input
                            value={name || ''}
                            className='form-input'
                            placeholder=''
                            name='name'
                            onChange={(ev)=>this.onInputChange(ev, 'name')}/>
                    </span>
                </div>

                <div className='form-row'>
                    <label className='form-label'>Address</label>
                    <span className='form-input-span'>
                        <input
                            value={address1 || ''}
                            className='form-input'
                            placeholder=''
                            name='address1'
                            onChange={(ev)=>this.onInputChange(ev, 'address1')}/>
                    </span>
                </div>
                <div className='form-row'>
                    <label className='form-label'>Address</label>
                    <span className='form-input-span'>
                        <input
                            value={address2 || ''}
                            className='form-input'
                            placeholder=''
                            name='address1'
                            onChange={(ev)=>this.onInputChange(ev, 'address2')}/>
                    </span>
                </div>
                <div className='form-row'>
                    <label className='form-label'>City</label>
                    <span className='form-input-span'>
                        <input
                            value={city || ''}
                            className='form-input'
                            placeholder=''
                            name='city'
                            onChange={(ev)=>this.onInputChange(ev, 'city')}/>
                    </span>
                </div>
                <div className='form-row'>
                    <label className='form-label'>State</label>
                    <span className='form-input-span'>
                        <input
                            value={state || ''}
                            className='form-input'
                            placeholder=''
                            name='state'
                            onChange={(ev)=>this.onInputChange(ev, 'state')}/>
                    </span>
                </div>
                <div className='form-row'>
                    <label className='form-label'>Zip code</label>
                    <span className='form-input-span'>
                        <input
                            value={zip || ''}
                            className='form-input'
                            placeholder=''
                            name='zip'
                            onChange={(ev)=>this.onInputChange(ev, 'zip')}/>
                    </span>
                </div>
                <div className='form-row'>
                    <label className='form-label'>Country</label>
                    <span className='form-input-span'>
                        {<Async
                            name='form-field-name'
                            value={country}
                            onChange={(select) => this.onSelectOptionChange(select, 'country')}
                            loadOptions={this.fetchCountries}
                        />}
                    </span>
                </div>
                <div className='form-row'>
                    <Button
                        className='large-custom-btn'
                        size='large'
                        onClick={()=>this.sendDataToParent()}>SAVE</Button>
                </div>
                {showFeedback && (feedback && feedback.type)
                    ? <Feedback {...feedback} />
                    : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        classes: state.classes,
        feedback: state.feedback
    }
}
export default connect(mapStateToProps, { updateSchool, fetchClass })(SchoolForm);
