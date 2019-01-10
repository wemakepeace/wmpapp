import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import InstructionsAccordion from './InstructionsAccordion';

const Materials = ({ exchange, match, location, history }) => {
    const { classRole, status, exchangeClass, materials } = exchange;

    return (
         <div className='class-portal-tab'>
            <h3>Materials & Instructions</h3>
            <p>The following instructions are designed to guide you through the Peace Letter exchange process. It’s pretty simple. Please read and follow these basic steps below to make sure the process go smoothly.</p>
            <Route
                exact path={`${match.path}`}
                render={({ match }) => (
                    <InstructionsAccordion
                        history={history}
                        match={match}
                        materials={materials}
                        classRole={classRole}
                        exchangeClass={exchangeClass}
                    />
                )}
            />
            <Route
                path={`${match.path}/:childpath`}
                render={({ match }) => (
                    <InstructionsAccordion
                        history={history}
                        match={match}
                        materials={materials}
                        classRole={classRole}
                        exchangeClass={exchangeClass}
                    />
                )}
            />
        </div>
    );
}

const mapStateToProps = ({ exchange }) => {
    return { exchange }
};

export default connect(mapStateToProps)(Materials);
