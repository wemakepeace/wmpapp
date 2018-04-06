import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Async } from 'react-select';


import { updateClass } from '../../redux/actions/class';
import { fetchDataForSelectDropdown } from '../../utils/helpers';

import WMPHeader from '../WMPHeader';
import Feedback from '../Feedback';
import SelectClass from '../SelectClass';


class ClassForm extends Component {
    state = {
        name: '',
        size: '',
        age_group: null,
        term: '',
        languageProficiency: '',
        language: '',
        showFeedback: false
    }

    onInputChange = (ev, key) => this.setState({ [key]: ev.target.value, showFeedback: false })

    onSelectOptionChange = (value, key) => this.setState({ [key] : value, showFeedback: false })

    componentDidMount() {

        if (this.props.classes && this.props.classes.list) {
            const classes = this.props.classes.list;
            const currentClass = classes[this.props.classes.currentClass];

            this.setState(currentClass);

            if (currentClass && currentClass.age_group ) {
                const age_group = {
                    label: currentClass.age_group.name,
                    value: currentClass.age_group.id
                }

                this.setState({ age_group });
            }

            if (currentClass && currentClass.term ) {
                const term = {
                    label: currentClass.term.name,
                    value: currentClass.term.id
                }

                this.setState({ term });
            }
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

        const { name, size, age_group, term, showFeedback } = this.state;
        const { feedback, classes } = this.props;


        return (
           <div className='profile-form'>
                <div className='profile-segment'>
                    {
                        !this.props.classes || !this.props.classes.currentClass
                        ? <SelectClass />
                        : <div>
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
                                        onChange={(value) => this.onSelectOptionChange(value, 'age_group')}
                                        loadOptions={() => fetchDataForSelectDropdown('agegroups')}
                                    />
                                </span>
                            </div>
                            <div className='form-row'>
                                <label className='form-label-wide'>When would you like to participate in the Exchange Program?</label>
                                <span className='form-input-span'>
                                    <Async
                                        name='form-field-name'
                                        value={term && term.value}
                                        onChange={(value) => this.onSelectOptionChange(value, 'term')}
                                        loadOptions={() => fetchDataForSelectDropdown('terms')}
                                    />
                                </span>
                            </div>
                            <div className='form-row'>
                                <Button
                                    className='large-custom-btn'
                                    size='large'
                                    onClick={()=>this.onSubmit()}>SAVE</Button>
                            </div>
                        </div>
                    }
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
