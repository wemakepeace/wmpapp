import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Redirect } from 'react-router-dom';
import { fetchLetterTemplates } from '../../../redux/actions/exchange';
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
        const { classRole, letterURLs, status } = this.props.exchange;
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
            <div>
                <h2>Materials & Instructions</h2>
                <Menu
                    content={content}
                    match={match}
                    location={location}
                />
                <Route
                    path={`${match.path}/:route`}
                    render={({ match }) => (
                        <TabContent
                            letterURLs={letterURLs}
                            content={content}
                            classRole={classRole}
                            match={match}
                        />
                    )}
                />
            </div>
        );
    };
}


const mapStateToProps = ({ exchange }) => {
    return { exchange }
};

export default connect(mapStateToProps, { fetchLetterTemplates })(Materials);
