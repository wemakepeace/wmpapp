import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

class SchoolAddressDropdown extends Component {
    state = {
        value: 'newaddress'
    }

    onSelect = (value) => {
        this.setState({ value })
        this.props.autoFillForm(value.value)
    }

    componentDidMount() {
        const { schoolId } = this.props;
        if (schoolId) {
            this.setState({ value: schoolId });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { schoolId } = nextProps;
        if (schoolId) {
            this.setState({ value: schoolId });
        }
    }

    render() {
        const { schools } = this.props;
        const { value } = this.state;

        const schoolAddressOptions = [];
        let option = {};



        for (var school in schools) {
            // console.log('schools[school]', schools[school])
            option = {
                label: schools[school].schoolName,
                value: schools[school].id
            }

            schoolAddressOptions.push(option);
        }
        schoolAddressOptions.push({ label: 'New Address', value: 'newaddress' })

        return (
            <div style={{margin: '50px 0'}}>
                <label className='form-label'>Fill in form with existing address in drobdown below or fill in manually.</label>
                <Select
                    className='header-menu-item select-class'
                    name='form-field-name'
                    value={value}
                    placeholder='Select address'
                    onChange={this.onSelect}
                    options={schoolAddressOptions}
                    clearable={false}
                    searchable={false}
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
export default connect(mapStateToProps)(SchoolAddressDropdown);
