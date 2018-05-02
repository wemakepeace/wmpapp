import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

class SchoolAddressDropdown extends Component {
    state = {
        value: null
    }

    onSelect = (value) => {
        this.setState({ value })
        this.props.autoFillForm(value.value)
    }

    componentDidMount() {
        const { schoolId } = this.props;
        this.setState({ value: schoolId });
    }

    componentWillReceiveProps(nextProps) {
        const { schoolId } = nextProps;
        this.setState({ value: schoolId });
    }

    render() {
        const { schools } = this.props;
        const { value } = this.state;

        const schoolAddressOptions = [];
        let option = {};


        for (var school in schools) {
            option = {
                label: schools[school].schoolName,
                value: schools[school].id
            }

            schoolAddressOptions.push(option);
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
export default connect(mapStateToProps)(SchoolAddressDropdown);
