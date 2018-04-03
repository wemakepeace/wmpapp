import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import Select from 'react-select';
import { Async } from 'react-select';


import { updateClass } from '../../redux/actions/teacher';

import WMPHeader from '../WMPHeader';
import Feedback from '../Feedback';

const fetchAgeGroups = () => {
    return axios.get('/resources/agegroups')
        .then(response => response.data)
        .then(data => {

            return { options: data }
        });
}



class ClassForm extends Component {
    state = {
        name: '',
        size: '',
        age_group: null,
        requestedTerm: '',
        languageProficiency: '',
        language: '',
        showFeedback: false,
        ageGroups: []
    }

    onInputChange = (ev, key) => this.setState({ [key]: ev.target.value })

    onSelectOptionChange = (value) => {
        this.setState({ age_group: value });
    }

    componentDidMount() {
        const classes = this.props.classes.list;
        const currentClass = classes[this.props.classes.currentClass];

        this.setState(currentClass);

        if(currentClass && currentClass.age_group ) {
            const age_group = {
                label: currentClass.age_group.label,
                value: currentClass.age_group.id
            }

            this.setState({ age_group });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.feedback && nextProps.feedback.type) {
            this.setState({ showFeedback: true });
        }
    }

    onSubmit = () => {
        const data = this.state;
        data.id = this.props.classes.currentClass;
        // fetch new id from this.state.age_group
        this.props.updateClass(data);
    }

    render() {
        const { name, size, age_group, showFeedback } = this.state;
        const { feedback } = this.props;

        return (
           <div className='profile-form'>
                <div className='profile-segment'>
                    <h4>Class Information</h4>
                    <p>This information will be used to facilitate the Exchange.</p>
                    {
                        showFeedback && (feedback && feedback.type)
                        ? <Feedback {...feedback} />
                        : null
                    }
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
                        <label className='form-label'>Age Group</label>
                        <span className='form-input-span'>
                            <Async
                                name='form-field-name'
                                value={age_group && age_group.value}
                                onChange={this.onSelectOptionChange}
                                loadOptions={fetchAgeGroups}
                            />
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
                    <div className='form-row'>
                        <Button
                            className='large-custom-btn'
                            size='large'
                            onClick={()=>this.onSubmit()}>SAVE</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        teacher: state.teacher,
        feedback: state.feedback,
        classes: state.classes
    }
}

export default connect(mapStateToProps, { updateClass })(ClassForm);
