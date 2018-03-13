import React from 'react';
import {  BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from '../components/Main';
import FlexExamples from '../components/FlexExamples';
import MainMenu from '../components/MainMenu';

export default (props) => {

    // const { match, history } = props;
    const { match, history } = props;
    console.log('match', match)
    console.log('props', props)
    return (
        <div>
            <MainMenu history={history}/>
            <Switch>
                <Route exact path={match.url} render={(props) => <Main {...props} />} />
                <Route exact path={match.url + 'flex'} render={() => <FlexExamples />} />
            </Switch>
        </div>
    )
}
