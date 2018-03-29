import React, { Component } from 'react';
import { connect } from 'react-redux';

import WMPHeader from './WMPHeader';

class ClassForm extends Component {
    state = {
        name: '',
        size: '',
        age_group: '',
        requestedTerm: '',
        languageProficiency: '',
        language: '',
        showFeedback: false
    }

    onInputChange = (ev, key) => this.setState({ [key]: ev.target.value })

    componentDidMount() {
        this.setState(this.props.session.classes);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.feedback && nextProps.feedback.type) {
            this.setState({showFeedback: true})
        }
    }

    onSubmit = () => {
        const data = this.state;
        data.id = this.props.session.classes.id;
        // this.props.updateClass(data);
    }

    render() {
        const { name, size, age_group } = this.state;


        return (
           <div className='profile-form'>
                <div className='profile-segment'>
                    <h4>Class Information</h4>
                    <p>This information will be used to facilitate the Exchange.</p>
                    <div className='form-row'>
                        <label className='form-label'>Class ID</label>
                        <span className='form-input-span'>
                            <input
                                value={name || ''}
                                className='form-input'
                                placeholder='. . . . . .'
                                name='name'
                                onChange={(ev)=>this.onInputChange(ev, 'name')}/>
                        </span>
                    </div>
                    <div className='form-row'>
                        <label className='form-label'>Class size</label>
                        <span className='form-input-span'>
                            <input
                                value={size || ''}
                                className='form-input'
                                placeholder='. . . . . .'
                                name='size'
                                onChange={(ev)=>this.onInputChange(ev, 'size')}/>
                        </span>
                    </div>
                    <div className='form-row'>
                        <label className='form-label'>Age of students</label>
                        <span className='form-input-span'>
                            <input
                                type='number'
                                className='form-input'
                                placeholder='. . . . . .'
                                name='age'
                                onChange={(ev)=>this.onInputChange(ev, 'age')}/>
                        </span>
                    </div>
                    <div className='form-row'>
                        <label className='form-label-wide'>When would you like to participate in the Exchange Program?</label>
                        <span className=''>
                            [DROPDOWN / CHECKBOXES]
                        </span>
                    </div>
                    <div className='form-row'>
                        <label className='form-label-wide'>What language would you like your class to use in the Exchange?</label>
                        <span className=''>
                            [DROPDOWN]
                        </span>
                    </div>
                    <div className='form-row'>
                        <label className='form-label-wide'>How proficient are your students in the selected language?</label>
                        <span className=''>
                            [SCALE]
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        session: state.session
    }
}

export default connect(mapStateToProps)(ClassForm);
