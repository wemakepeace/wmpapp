import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Async } from 'react-select';
import { fetchClass, removeCurrentClass } from '../redux/actions/class';


class SelectClass extends Component  {
    state = {
        selected: '',
        options: []
    }

    onClassSelect = (selected) => {

        if (selected === null) {
            this.setState({selected})
            return this.props.removeCurrentClass();
        }

        const fetchClassFromServer = this.props.classes && this.props.classes.list && this.props.classes.list[selected.value] ? false : true;

        this.props.fetchClass(selected.value, fetchClassFromServer);
    }

    setSelected = (classes, options) => {

        let selected = '';

        if(classes && classes.currentClass) {
            selected = options.find(option => {
                return option.value === classes.currentClass
            });
        }

        this.setState({ selected, options });

    }

    componentDidMount() {
        const classes = this.props.classes;
        const options = this.props.teacher.classes;

        this.setSelected(classes, options)
    }

    componentWillReceiveProps(nextProps) {
        const classes = nextProps.classes;
        const options = nextProps.teacher.classes;

        this.setSelected(classes, options);
    }

    render() {
        const { selected, options } = this.state;
        const value = selected && selected.value;

        return (
            <Select
                className='header-menu-item select-class'
                name='form-field-name'
                value={value}
                placeholder='Browse'
                onChange={this.onClassSelect}
                options={options}
                clearable={false}
                searchable={false}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        teacher: state.teacher,
        classes: state.classes
    }
}

export default connect(mapStateToProps, { fetchClass, removeCurrentClass })(SelectClass);
