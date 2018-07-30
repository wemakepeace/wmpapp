import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Image, Form, Segment, Message, Button, Menu, Accordion, Icon } from 'semantic-ui-react';
import ChangePasswordContainer from '../../containers/profile/ChangePasswordContainer';

class Settings extends Component {
    state = {
        activeIndex: null
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
        this.setState({ activeIndex: newIndex })
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { onChangePasswordClick, showChangePwForm } = this.props;
        const { activeIndex } = this.state

        return (
            <div className='profile-segment'>
                <h2>Security Settings</h2>
                <Accordion fluid styled>
                    <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        Change password
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <ChangePasswordContainer form='change' />
                    </Accordion.Content>

                    <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        Delete account
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <p>
                            This action is not reversable. Please make sure you do not have any exchanges in progress before deleting.
                        </p>
                        <Button negative>Delete Account</Button>
                    </Accordion.Content>

                    <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        Another security thing
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                        <p>
                        Three common ways for a prospective owner to acquire a dog is from pet shops, private
                        owners, or shelters.
                        </p>
                    </Accordion.Content>
                </Accordion>
                <div className='form-row'>
                    { activeIndex === 'Change password' ? <ChangePasswordContainer form='change' /> : null }
                    { activeIndex === 'Delete account' ?  <Link to='/delete'>Delete Account</Link> : null }
                </div>
            </div>
        );
    }
}

export default Settings;
