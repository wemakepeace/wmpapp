import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMaterials } from '../../../redux/actions/exchange';
import {
    Header,
    Image,
    Form,
    Segment,
    Message,
    Button,
    Icon
} from 'semantic-ui-react';
import InstructionMenu from './Menu';
import Letter1 from './Letter1';
import Letter2 from './Letter2';
import Letter3 from './Letter3';
import Overview from './Overview';

class Materials extends Component  {
    state = {
        activeItem: 'Overview',
        letterURLs: [],
        CurrentComponent: Letter1
    }

    handleItemClick = (e, { component }) => {
        this.setState({ activeItem: component })
    }

    componentDidMount() {
        return this.props.getMaterials()
    }

    render() {
        const { letterURLs } = this.props.exchange;
        const { activeItem, CurrentComponent } = this.state
        const components = { Overview, Letter1, Letter2, Letter3 };

        const Component = components[ activeItem ];

        return (
            <div>
                <div>
                    <InstructionMenu
                        activeItem={activeItem}
                        handleItemClick={this.handleItemClick}
                    />
                    <Segment attached='bottom'>
                        {<Component letterURLs={letterURLs}/>}
                    </Segment>
                </div>
            </div>
        );
    }
}


const mapStateToProps = ({ exchange }) => {
    return {
        exchange
    }
}

export default connect(mapStateToProps, { getMaterials })(Materials);
