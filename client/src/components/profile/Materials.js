import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import axios from 'axios';
import { getMaterials } from '../../redux/actions/exchange';
import PDFViewer from '../PDFViewer';

class Materials extends Component  {

    componentWillMount() {
        return this.props.getMaterials()
    }

    render() {
        const { letterURLs } = this.props.exchange;

        return (
            <div className='profile-form'>
                <div className='profile-segment'>
                    <h3>Letter Exchange Materials</h3>
                    { letterURLs && letterURLs.length ?
                        <div>
                            <span><a href={letterURLs[0]} target='_blank'>Letter 1</a></span>
                            <PDFViewer URL={letterURLs[0]} />
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
