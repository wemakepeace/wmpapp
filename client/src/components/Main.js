import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
// import logo from '../../../assets/logos/WMPlogo_transparent.png';
class Main extends Component {



    render() {
        // const { match, histor    y, ...props } = this.props;
        // console.log('this.props', this.props)
        // console.log('here')
        return (
            <Container>
                <div className='title-container'>
                    <div></div>
                    <div><h1 className='heading'>PEACE LETTERS</h1></div>
                    <div className='signup-container'></div>
                </div>
                <div className='promo-container'>
                    <div className='promo-box'>
                        When I started to learn it, I couldn’t find blogs that show “Which part of React Redux to build first?” or how to generally approach building any React-Redux apps. So I went through several example and blogs and came out with general steps as to how to approach building most React Redux Apps.

                        Please Note: I am using “Mocks” to keep it at a high level and not get into the weeds. I am using the classic Todo list app as the basis for building ANY app. If your app has multiple screens, simply repeat the process for each screen.
                    </div>
                    <div className='promo-box'>
                        When I started to learn it, I couldn’t find blogs that show “Which part of React Redux to build first?” or how to generally approach building any React-Redux apps. So I went through several example and blogs and came out with general steps as to how to approach building most React Redux Apps.

                        Please Note: I am using “Mocks” to keep it at a high level and not get into the weeds. I am using the classic Todo list app as the basis for building ANY app. If your app has multiple screens, simply repeat the process for each screen.
                    </div>
                    <div className='promo-box'>
                        When I started to learn it, I couldn’t find blogs that show “Which part of React Redux to build first?” or how to generally approach building any React-Redux apps. So I went through several example and blogs and came out with general steps as to how to approach building most React Redux Apps.

                        Please Note: I am using “Mocks” to keep it at a high level and not get into the weeds. I am using the classic Todo list app as the basis for building ANY app. If your app has multiple screens, simply repeat the process for each screen.
                    </div>
                </div>


            </Container>
        )
    }
}

export default Main;
