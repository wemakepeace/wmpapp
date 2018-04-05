import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Async } from 'react-select';
import countries from 'country-list';
import WMPHeader from '../WMPHeader';


class SchoolForm extends Component {
    state = {
        id: '',
        name: '',
        address1: '',
        address2: '',
        city: '',
        zip: '',
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

    onSelectOptionChange = (value, key) => this.setState({ [key] : value, showFeedback: false })

    onSubmit = () => {
        const data = this.state;
        console.log('data', data)
        // fetch new id from this.state.age_group
        // this.props.updateClass(data);
    }

    componentDidMount() {
        if (this.props.classes && this.props.classes.currentClass) {
            const currentClass = this.props.classes.list[this.props.classes.currentClass];
            const school = currentClass.school ? currentClass.school : {}
            this.setState(school);
        }
    }

    render() {
        console.log('this.state', this.state);
        const { name, address1, address2, zip, city, country } = this.state;
        return (
           <div className='profile-form'>
                <div className='profile-segment'>
                    <h4> School Address</h4>
                    <p>This is the address that will be used in the Exchange for sending letters.</p>
                    <div className='form-row'>
                        <label className='form-label'>School name</label>
                        <span className='form-input-span'>
                            <input
                                value={name || ''}
                                className='form-input'
                                placeholder='. . . . . .'
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
                                placeholder='. . . . . .'
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
                                placeholder='. . . . . .'
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
                                placeholder='. . . . . .'
                                name='city'
                                onChange={(ev)=>this.onInputChange(ev, 'city')}/>
                        </span>
                    </div>
                    <div className='form-row'>
                        <label className='form-label'>Zip code</label>
                        <span className='form-input-span'>
                            <input
                                value={zip || ''}
                                className='form-input'
                                placeholder='. . . . . .'
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
                                onChange={(value) => this.onSelectOptionChange(value, 'country')}
                                loadOptions={this.fetchCountries}
                            />}
                        </span>
                    </div>
                    <div className='form-row'>
                        <Button
                            className='large-custom-btn'
                            size='large'
                            onClick={()=>this.onSubmit()}>SAVE</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        classes: state.classes
    }
}
export default connect(mapStateToProps)(SchoolForm);
