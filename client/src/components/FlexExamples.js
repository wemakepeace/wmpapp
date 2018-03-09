import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react'


class FlexExamples extends Component {



    render() {
        return (
            <Container>
                    <Container>
                        <div className='form-row'>
                            <label>First name</label>
                            <input type='text' id='firstname' />
                        </div>
                        <div className='form-row'>
                            <label>Last name</label>
                            <input type='text' id='lastname' />
                        </div>
                    </Container>
                    <Container>
                        <div className='column-layout'>
                            <div className='main-column'>
                                <h2>Main Column!!!!</h2>
                                <p>Redux is becoming the de facto way to build React apps. And there are tons of examples that show how it’s done. But React-Redux apps have too many parts like: “Reducers”, “Actions”, “Action Creators”, “State”, “Middleware” and more). It could be overwhelming!</p>
                                <p>When I started to learn it, I couldn’t find blogs that show “Which part of React Redux to build first?” or how to generally approach building any React-Redux apps. So I went through several example and blogs and came out with general steps as to how to approach building most React Redux Apps.</p>
                                <p>Please Note: I am using “Mocks” to keep it at a high level and not get into the weeds. I am using the classic Todo list app as the basis for building ANY app. If your app has multiple screens, simply repeat the process for each screen.</p>
                            </div>
                            <div className='sidebar-1'>
                                <h2>Sidebar 1</h2>
                                <p>Redux is becoming the de facto way to build React apps. And there are tons of examples that show how it’s done. But React-Redux apps have too many parts like: “Reducers”, “Actions”, “Action Creators”, “State”, “Middleware” and more). It could be overwhelming!</p>
                            </div>
                            <div className='sidebar-2'>
                                <h2>Sidebar 2</h2>
                                <p>Redux is becoming the de facto way to build React apps. And there are tons of examples that show how it’s done. But React-Redux apps have too many parts like: “Reducers”, “Actions”, “Action Creators”, “State”, “Middleware” and more). It could be overwhelming!</p>
                            </div>
                        </div>
                    </Container>
                    <Container>
                        <div className='call-outs-container'>
                            <div className='call-out'>
                                <h2>Callout 1</h2>
                                <p>Redux is becoming the de facto way to build React apps. And there are tons of examples that show how it’s done. But React-Redux apps have too many parts like: “Reducers”, “Actions”, “Action Creators”, “State”, “Middleware” and more). It could be overwhelming!</p>
                            </div>
                            <div className='call-out'>
                                <h2>Callout 2</h2>
                                <p>Redux is becoming the de facto way to build React apps. And there are tons of examples that show how it’s done!</p>
                            </div>
                            <div className='call-out'>
                                <h2>Callout 3</h2>
                                <p>Redux is becoming the de facto way to build React apps.</p>
                            </div>
                        </div>
                    </Container>

                    <Container>
                        <div className='equal-height-container'>
                            <div className='first'>
                                <h2>Callout 1</h2>
                                <p>Redux is becoming the de facto way to build React apps. And there are tons of examples that show how it’s done. But React-Redux apps have too many parts like: “Reducers”, “Actions”, “Action Creators”, “State”, “Middleware” and more). It could be overwhelming!</p>
                            </div>
                            <div className='second'>
                                <div className='second-a'>A</div>
                                <div className='second-b'>B</div>
                            </div>
                        </div>
                    </Container>
                    <div>Main</div>
            </Container>
        )
    }
}

export default FlexExamples;
