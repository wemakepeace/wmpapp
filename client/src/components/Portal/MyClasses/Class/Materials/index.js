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

            <p>The program consists of three rounds of letters. Each of the letters will discuss different topics and there are lessons that you as the teacher will go through. Please take the time to implement the lesson plans, as they are a vital part of ensuring a valuable exchange experience for you and your students. On this page you will find both the downloadable letter templates and the instructions for each of the letters. Please make sure you read the instructions for each letter carefully.</p>
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
