import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Async } from 'react-select';
import countries from 'country-list';

import { Form, Radio } from 'semantic-ui-react'

class SchoolList extends Component {
    state = {}

    handleChange = (e, { value }) => this.setState({ value })

    render() {
        const { schools } = this.props;
        console.log('this.state', this.state)
        return (
            <div>
            {
                Object.keys(schools).map(school => {
                    const schoolData = schools[school];
                   return (
                        <Form>
                            <Form.Field>
                                <Radio
                                    label='Select address'
                                    name='radioGroup'
                                    value={schoolData.id}
                                    checked={this.state.value === schoolData.id}
                                    onChange={this.handleChange}
                                />
                                <ul>
                                    <li>{schoolData.name}</li>
                                    <li>{schoolData.address1} {schoolData.address2}</li>
                                    <li>{schoolData.city} {schoolData.zip}</li>
                                    <li>{schoolData.state} {schoolData.country}</li>
                                </ul>
                            </Form.Field>
                        </Form>
                    )
                })
            }
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
