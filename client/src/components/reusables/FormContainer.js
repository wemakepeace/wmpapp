import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

export default ({ Input, CustomButton }) => {

    return class extends Component {

        state = {}

        onInputChange = (value, key) => {
            this.setState({[ key ]: value })
        }

        onSubmit = () => this.props.onSubmit(this.state)

        render() {
            const { inputs } = this.props;

            return (
                <div className='custom-form'>
                    { inputs && inputs.length ?
                        <div className='profile-segment'>
                            {inputs.map((input) => (
                                <Input
                                    {...input}
                                    value={this.state[ input.name ]}
                                    onInputChange={this.onInputChange}
                                    key={input.name}
                                />))}
                        </div> : null }
                    <div className='form-row'>
                        <CustomButton onSubmit={this.onSubmit.bind(this)} />
                    </div>
                </div>
            );
        }
    }
}

