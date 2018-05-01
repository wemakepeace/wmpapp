import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Async } from 'react-select';
import countries from 'country-list';

import SchoolList from './SchoolAddressesList';

class SchoolForm extends Component {
    state = {
        id: '',
        name: '',
        address1: '',
        address2: '',
        city: '',
        zip: '',
        state: '',
        country: ''
    }

    onLocalInputChange = (ev, key) => {
        this.props.onInputChange(key, ev.target.value, 'school')
        this.setState({[key]: ev.target.value});
    }

    onLocalSelectOptionChange = (value, key) => {
        this.props.onSelectOptionChange(key, value, 'school');
        console.log(key, value)
        this.setState({ [key] : value });
    }

    fetchCountries = () => {
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

    componentWillMount() {
        this.setState(this.props.schoolData)
    }

    componentWillReceiveProps(newProps) {
        this.setState(newProps)
    }

    render() {
        const { name, address1, address2, city, zip, state, country } = this.state;
        return (
            <div>
                <h2> School Mailing Address</h2>
                <p>This address will be used when sending letters to your class.</p>
                <SchoolList autoFillForm={this.props.autoFillForm}/>
                <div className='form-row'>
                    <label className='form-label'>School name</label>
                    <span className='form-input-span'>
                        <input
                            value={name || ''}
                            className='form-input'
                            placeholder=''
                            name='name'
                            onChange={(ev)=> this.onLocalInputChange(ev, 'name')}/>
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
                            onChange={(ev)=> this.onLocalInputChange(ev, 'address1')}/>
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
                            onChange={(ev)=> this.onLocalInputChange(ev, 'address2')}/>
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
                            onChange={(ev)=> this.onLocalInputChange(ev, 'city')}/>
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
                            onChange={(ev)=> this.onLocalInputChange(ev, 'state')}/>
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
                            onChange={(ev)=> this.onLocalInputChange(ev, 'zip')}/>
                    </span>
                </div>
                <div className='form-row'>
                    <label className='form-label'>Country</label>
                    <span className='form-input-span'>
                        {<Async
                            name='form-field-name'
                            value={country}
                            onChange={(select) => this.onLocalSelectOptionChange(select, 'country')}
                            loadOptions={this.fetchCountries}
                        />}
                    </span>
                </div>
            </div>
        )
    }
}

export default SchoolForm;
