import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from '../components/Main';
import FlexExamples from '../components/FlexExamples';
import MainMenu from '../components/MainMenu';

export default (props) => {

    // const { match, history } = props;
    // console.log('match', match)
    // console.log(props)
    return (
        <BrowserRouter>
            <div>
                <MainMenu />
                <Route exact path='/' render={(props) => <Main {...props} />} />
                <Route exact path='/flex' render={() => <FlexExamples />} />
            </div>
        </BrowserRouter>
    )
}
