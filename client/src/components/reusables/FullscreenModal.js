import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import CustomButton from './CustomButton';

const Button = CustomButton({ name: 'Go to Home Page'});

class FullscreenModal extends Component {
    state = { open: this.props.open }

    componentWillReceiveProps({ open }) {
        this.setState({ open })
    }

    render() {
        const { open } = this.state
        const inlineStyle = {
            modal : {
                marginTop: '50vh',
                marginLeft: 'auto',
                marginRight: 'auto',
            }
        };

        return (
            <div>
                <Modal
                    open={open}
                    closeOnEscape={false}
                    closeOnDimmerClick={false}
                    dimmer='inverted'
                    onClose={this.close}
                    style={inlineStyle.modal}
                    size='tiny'
                >
                    <Modal.Header style={{textAlign: 'center'}}>Your account has been deleted.</Modal.Header>
                    <Modal.Actions style={{margin: '0 auto'}}>
                        <Button  onSubmit={() => this.props.onClick()} />
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default FullscreenModal;
