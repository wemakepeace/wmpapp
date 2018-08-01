import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import { Input } from '../components/profile/Input';

export default ({ inputs, selectInputs, state }) => {

    return class extends Component {
        constructor(props) {
            super(props);
            this.state = state;
        }

        onInputChange = (value, key, objName) => {
            this.setState({[ key ]: value })
        }

        onSubmit = () => this.props.onSubmit(this.state)

        render() {
            return (
                <div className=''>
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
                        <Button
                            className='large-custom-btn'
                            size='large'
                            fluid
                            onClick={this.onSubmit.bind(this)}>
                            Save
                        </Button>
                    </div>
                </div>
            );
        }
    }
}

