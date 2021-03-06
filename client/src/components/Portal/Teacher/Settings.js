import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ChangePassword from './ChangePassword';
import {
    Grid,
    Header,
    Image,
    Form,
    Segment,
    Message,
    Button,
    Menu,
    Accordion,
    Icon
} from 'semantic-ui-react';

class Settings extends Component {
    state = { activeIndex: null }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
        this.setState({ activeIndex: newIndex })
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { toggleWarningModal, onChangePassword } = this.props;
        const { activeIndex } = this.state

        return (
            <div className='profile-segment'>
                <h3>Security Settings</h3>
                <Accordion fluid styled>
                    <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        Change password
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <ChangePassword onChangePassword={onChangePassword} />
                    </Accordion.Content>

                    <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        Delete account
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <p>
                            This action is not reversable. Please make sure you do not have any exchanges in progress before deleting.
                        </p>
                        <Button
                            onClick={() => {
                                toggleWarningModal(true, 'showWarningModal');
                            }}
                            negative>Delete Account</Button>
                    </Accordion.Content>
                </Accordion>
            </div>
        );
    }
}

export default Settings;
