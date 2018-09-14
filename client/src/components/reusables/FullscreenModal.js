import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import CustomButton from './CustomButton';


class FullscreenModal extends Component {
    state = {
        open: this.props.open
    }

    componentWillReceiveProps({ open }) {
        this.setState({ open })
    }

    render() {
        const { open } = this.state
        const { header, content, buttonText1, action, button1Color, closeAction } = this.props;
        const Button = CustomButton({ name: buttonText1, color: button1Color });
        const inlineStyle = {
            modal : {
                marginTop: '40vh',
                marginLeft: 'auto',
                marginRight: 'auto',
            }
        };


        return (
            <div>
                <Modal
                    open={open}
                    dimmer='inverted'
                    style={inlineStyle.modal}
                    size='tiny'
                >
                    <Modal.Header style={{textAlign: 'center'}}>{header}</Modal.Header>
                    { content
                        ? <Modal.Content style={{textAlign: 'center'}}>{content}</Modal.Content>
                        : null }
                    <Modal.Actions style={{margin: '0 auto'}}>
                        <Button onSubmit={() => this.props.action()} />
                        { closeAction
                            ? <div className='close-modal'>
                                <span onClick={()=>closeAction()}>No, take me back</span>
                            </div>
                            : null
                        }
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default FullscreenModal;
