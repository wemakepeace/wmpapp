import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import axios from 'axios';
import { getMaterials } from '../../redux/actions/exchange';

class Materials extends Component  {

    componentDidMount() {
        console.log('here')
        return this.props.getMaterials()
        .then(urls => console.log(urls))
    }

    render() {
        const { letterURLs } = this.props.exchange;
        console.log('letterURLs', letterURLs)
        return (
            <div className='profile-form'>
                <div className='profile-segment'>
                    <h3>Letter Exchange Materials</h3>
                    { letterURLs && letterURLs.length ?
                        <div>
                            <span><a href={letterURLs[0]} target='_blank'>Letter 1</a></span>
                        </div>
                    : null
                    }
                </div>
            </div>
        )

    }
}


const mapStateToProps = ({ exchange }) => {
    return {
        exchange
    }
}

export default connect(mapStateToProps, { getMaterials })(Materials);
