import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Async } from 'react-select';
import countries from 'country-list';

import { Form, Radio, Dropdown } from 'semantic-ui-react'
import Select from 'react-select';




class SchoolList extends Component {
    state = {
        value: null
    }



    handleChange = (e, { value }) => this.setState({ value })

    onSelect = (value) => {

        // if (value === null) {
            this.setState({ value })
            // return this.props.removeCurrentClass();
        // }

        // const fetchClassFromServer = this.props.classes && this.props.classes.list && this.props.classes.list[selected.value] ? false : true

        // this.props.fetchClass(selected.value, fetchClassFromServer);
    }

    render() {
        const { schools } = this.props;
        const { value } = this.state;

        const schoolAddressOptions = [];
        let option = {};

        for (var school in schools) {
            option = {
                label: schools[school].name,
                value: schools[school].id
            }

            schoolAddressOptions.push(option)
        }

        return (
            <div style={{margin: '50px 0'}}>
                <label className='form-label'>Fill in with existing address</label>
                <Select
                    className='header-menu-item select-class'
                    name='form-field-name'
                    value={value}
                    placeholder='Select address'
                    onChange={this.onSelect}
                    options={schoolAddressOptions}
                />

            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        schools: state.teacher.schools
    }
}
export default connect(mapStateToProps)(SchoolList);
