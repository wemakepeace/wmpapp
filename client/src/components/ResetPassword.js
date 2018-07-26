import React from 'react';
import { Grid, Header, Image, Form, Segment, Message, Button, Menu } from 'semantic-ui-react';


export const ResetPassword = ({ onInputChange, feedback }) => {
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
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
};


