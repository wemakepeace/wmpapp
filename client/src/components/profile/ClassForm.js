import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Async } from 'react-select';

import { updateClass } from '../../redux/actions/class';
import { updateSchool } from '../../redux/actions/school';

import { fetchDataForSelectDropdown } from '../../utils/helpers';

import Feedback from '../Feedback';
import SelectClass from '../SelectClass';
import SchoolForm from './SchoolForm';


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

    createSelectObject = (label, value) => {
        return {
            label,
            value
        }
    }

    renderComponent = props => {
        if (props.classes && props.classes.list) {
            const classes = props.classes.list;
            const currentClass = classes[props.classes.currentClass];

            this.setState(currentClass);

            if (currentClass && currentClass.age_group ) {
                const age_group = this.createSelectObject(currentClass.age_group.name, currentClass.age_group.id)

                this.setState({ age_group });
            }

            if (currentClass && currentClass.term ) {
                const term = this.createSelectObject(currentClass.term.name, currentClass.term.id);

                this.setState({ term });
            }
        }
    }

    componentDidMount() {
        return this.renderComponent(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.feedback && nextProps.feedback.type) {
            this.setState({ showFeedback: true });
        }

        if (nextProps.classes.currentClass !== this.props.classes.currentClass) {
            return this.renderComponent(nextProps);
        }
    }

    submitAllData = (schoolData) => {
        let classData = this.state;
        classData.id = this.props.classes.currentClass;
        return this.props.updateSchool(schoolData)
        .then(res => {
            this.props.updateClass(classData);
        });
    }

    render() {

        const { name, size, age_group, term, showFeedback } = this.state;
        const { feedback, classes } = this.props;


        return (
            <div className='profile-segment'>
                <div>
                { !classes.currentClass
                    ? <div className='container-center-content'>
                        <Button
                            onClick={()=> console.log('click')}
                            size='massive'
                            className='add-class'>Register New Class</Button>
                    </div>
                    :
                    <div>
                        <h4>Class Information</h4>
                        <p>This information will be used to facilitate the Exchange.</p>
                        <div className='form-row'>
                            <label className='form-label'>Class name</label>
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
                                    className='select-country'
                                    name='form-field-name'
                                    value={term && term.value}
                                    onChange={(value) => this.onSelectOptionChange(value, 'term')}
                                    loadOptions={() => fetchDataForSelectDropdown('terms')}
                                />
                            </span>
                        </div>
                        <SchoolForm submitAllData={this.submitAllData}/>
                    </div>
                    }
                    { showFeedback && (feedback && feedback.type)
                        ? <Feedback {...feedback} />
                        : null }
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

export default connect(mapStateToProps, { updateClass, updateSchool })(ClassForm);
