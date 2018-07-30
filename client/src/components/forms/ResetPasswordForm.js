import React from 'react';
import { Grid, Header, Image, Form, Segment, Message, Button, Menu } from 'semantic-ui-react';


export const ResetPasswordForm = ({ onInputChange, onChangePassword, feedback }) => {
    return (
        <Grid
            textAlign='center'
            style={{ height: '100%' }}
            verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' textAlign='center'>
                    <Image src='../../../assets/logos/WMPlogo_transparent.png' />
                            {' '}Reset Password
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='New password'
                            type='password'
                            onChange={ (ev) => onInputChange(ev, 'password')}
                        /><Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Confirm new password'
                            type='password'
                            onChange={ (ev) => onInputChange(ev, 'confirmPassword')}
                        />
                        <Button
                            className='large-custom-btn'
                            size='large'
                            fluid
                            onClick={onChangePassword}>
                            Change Password
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
};


