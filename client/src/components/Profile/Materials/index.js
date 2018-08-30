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
import Letter1 from './Letter1';
import Letter2 from './Letter2';
import Letter3 from './Letter3';
import Instructions from './Instructions';
import TabContent from './TabContent';


const content = [
    {
        name: 'Instructions',
        component: Instructions,
        route: 'instructions'
    },
    {
        name: 'Letter 1',
        component: Letter1,
        route: 'letter-1'
    },
    {
        name: 'Letter 2',
        component: Letter2,
        route: 'letter-2'
    },
    {
        name: 'Letter 3',
        component: Letter3,
        route: 'letter-3'
    }
];


class Materials extends Component  {
    state = {
        letterURLs: []
    }

    componentDidMount = () => {
        this.props.fetchLetterTemplates();
    }

    render() {
        const { classRole, letterURLs } = this.props.exchange;
        const { match, location } = this.props;

        return (
            <div>
                <div>
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
            </div>
        );
    };
}


const mapStateToProps = ({ exchange }) => {
    return { exchange }
};

export default connect(mapStateToProps, { fetchLetterTemplates })(Materials);
