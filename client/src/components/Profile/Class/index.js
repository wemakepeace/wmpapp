import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import ClassForm from './ClassForm';
import SchoolForm from './SchoolForm';
import { saveClass, removeCurrentClass } from '../../../redux/actions/class';


class ClassFormsContainer extends Component {
    constructor(props) {
        super(props);
        const { currentClass } = props;
        this.state = this.getDefaultStateOrProps(currentClass, currentClass.school);
    }

    getDefaultStateOrProps = (currentClass, school) => {
        let defaultState = {
            class: {
                id: null,
                name: '',
                size: '',
                age_group: null,
                term: '',
                language: '',
            },
            school: {
                id: null,
                schoolName: '',
                address1: '',
                address2: '',
                city: '',
                zip: '',
                state: '',
                country: ''
            }
        };

        if (currentClass && currentClass.id) {
            defaultState.class = { ...currentClass };
        }

        if (school) {
            defaultState.school = { ...school };
        }

        return defaultState;
    }

    onInputChange = (value, key, objName) => {
        console.log('rendering')
        console.log('value', value)
        console.log('key', key)
        console.log('objName', objName)
        this.setState({
            [ objName ]: {
                ...this.state[ objName ],
                [ key ]: value
            }
        });
    }

    fetchSchool = (ev) => {
        if (!ev || ev.value === 'newaddress') {
            this.setState(this.getDefaultStateOrProps(this.state.class))
        } else {
            const schoolId = ev.value;
            return axios.get(`/school/${schoolId}`)
                .then(({ data }) => this.setState({ school: data }));
        }
    }

    submitData = () => {
        let classData = this.state.class;
        let schoolData = this.state.school;
        classData.teacherId = this.props.teacher.id;
        this.props.saveClass(classData, schoolData);
    }

    componentWillReceiveProps({ currentClass }) {
        if (currentClass && (currentClass.id !== this.state.class.id)) {
            this.setState(this.getDefaultStateOrProps(currentClass, currentClass.school));
        }
    }

    render() {
        const { currentClass, teacher: { id } } = this.props;

        return (
            <div className='profile-segment'>
                <div>
                    { currentClass && currentClass.id ?
                        <h2>Information & Settings for Class {currentClass.name}</h2> :
                        <h2> Register New Class </h2> }
                    <ClassForm
                        classData={this.state.class}
                        onInputChange={this.onInputChange}
                    />
                    <SchoolForm
                        school={this.state.school}
                        onInputChange={this.onInputChange}
                        teacherId={id}
                        fetchSchool={this.fetchSchool}
                    />
                    <div className='form-row'>
                        <Button
                            className='large-custom-btn'
                            size='large'
                            onClick={this.submitData}>SAVE</Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ teacher, currentClass }) => {
    return { teacher, currentClass };
};

const toBeDispatched = { saveClass, removeCurrentClass };

export default connect(mapStateToProps, toBeDispatched )(ClassFormsContainer);


