import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link, Route, Redirect } from 'react-router-dom';
import {
    Header,
    Image,
    Form,
    Segment,
    Message,
    Button,
    Icon
} from 'semantic-ui-react';
// import Menu from './XXXMenu';
// import TabContent from './TabContent';
// import content from './XXXMenu/content';
import { fetchLetterTemplates } from '../../../../../redux/actions/exchange';
import InstructionsAccordion from './InstructionsAccordion';

class Materials extends Component  {
    state = {}

    componentDidMount = () => {
        if (!this.props.exchange.letterURLs) {
            return this.props.fetchLetterTemplates()
            .then(() => {
                if (this.props.history.location.pathname === '/portal/materials') {
                    this.props.history.push('materials/instructions');
                }
            });
        }
    }

    render() {
        const { classRole, letterURLs, status, exchangeClass } = this.props.exchange;
        const { match, location } = this.props;

        // if (status !== 'confirmed') {
        //     return (
        //         <div>
        //             <h3>Material & Instructions</h3>
        //             <p>Once your class is matched with an exchanging class and both teachers have confirmed the participation, you will be granted access to all materials and instructions needed for the program.</p>
        //         </div>
        //     );
        // }

        return (
            <div className='class-portal-tab'>
                <h3>Materials & Instructions</h3>
                <p>The following instructions are designed to guide you through the Peace Letter exchange process. It’s pretty simple. Please read and follow these basic steps below to make sure the process go smoothly.</p>

                <p>The program consists of three rounds of letters. Each of the letters will discuss different topics and there are lessons that you as the teacher will go through. Please take the time to implement the lesson plans, as they are a vital part of ensuring a valuable exchange experience for you and your students. On this page you will find both the downloadable letter templates and the instructions for each of the letters. Please make sure you read the instructions for each letter carefully.</p>
                <InstructionsAccordion
                    letterURLs={letterURLs}
                    classRole={classRole}
                    exchangeClass={exchangeClass}
                />
                {/*<Menu
                    content={content}
                    match={match}
                    location={location}
                />
                <Route
                    path={`${match.path}/:path`}
                    render={({ match }) => (
                        <TabContent
                            letterURLs={letterURLs}
                            content={content}
                            classRole={classRole}
                            match={match}
                        />
                    )}
                />*/}
            </div>
        );
    };
}


const mapStateToProps = ({ exchange }) => {
    return { exchange }
};

export default connect(mapStateToProps, { fetchLetterTemplates })(Materials);
