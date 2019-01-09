import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Redirect } from 'react-router-dom';
import {
    Header,
    Image,
    Form,
    Segment,
    Message,
    Button,
    Icon
} from 'semantic-ui-react';
import Menu from './Menu';
import TabContent from './TabContent';
import content from './content';
import { fetchLetterTemplates } from '../../../../../redux/actions/exchange';
import Accordion from './Accordion';

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
                <Accordion
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
