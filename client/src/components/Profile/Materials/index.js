import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
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
import Overview from './Overview';
import TabContent from './TabContent';


const materials = [
    {
        name: 'Overview',
        component: Overview,
        sub: 'overview'
    },
    {
        name: 'Letter 1',
        component: Letter1,
        sub: 'letter-1'
    },
    {
        name: 'Letter 2',
        component: Letter2,
        sub: 'letter-2'
    },
    {
        name: 'Letter 3',
        component: Letter3,
        sub: 'letter-3'
    }
];


class Materials extends Component  {
    state = {
        activeItem: 'Overview',
        letterURLs: []
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    componentDidMount = () => this.props.fetchLetterTemplates()

    render() {
        const { letterURLs, classRole } = this.props.exchange;
        const { activeItem } = this.state

        return (
            <div>
                <div>
                    <Menu
                        materials={materials}
                        activeItem={activeItem}
                        handleItemClick={this.handleItemClick}
                        match={this.props.match}
                    />
                    <Route
                        path={`${this.props.match.path}/:sub`}
                        render={(props) => (
                            <TabContent
                                materials={materials}
                                letterURLs={letterURLs}
                                classRole={classRole}
                                {...props}
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
