import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Async } from 'react-select';
import { fetchClass, removeCurrentClass } from '../../redux/actions/class';

class SelectClass extends Component  {
    constructor(props) {
        super(props);
        this.state = this.getDefaultState(props)
    }

    getDefaultState = (props) => {
        const options = props.teacher.classes;
        const { currentClass: { id } } = props;
        return this.setSelected(options, id);
    }

    setSelected = (options, id) => {
        let selected = '';

        if(options && id) {
            selected = options.find(option => {
                return option.value === id
            });
        }

        return { selected, options };
    }

    componentWillReceiveProps = ({ teacher, currentClass}) => {
        const options = teacher.classes;
        const { id } = currentClass;
        const state = this.setSelected(options, id);
        this.setState(state);
    }

    render() {
        const { selected, options } = this.state;
        const value = selected && selected.value;
        const { onClassSelect } = this.props;

        return (
            <Select
                className='select-class'
                name='form-field-name'
                value={value}
                placeholder='Select class'
                onChange={onClassSelect}
                options={options}
                clearable={false}
                searchable={false}
            />
        );
    };
};

const mapStateToProps = ({ teacher, currentClass }) => {
    return { teacher, currentClass };
};

export default connect(mapStateToProps, { fetchClass, removeCurrentClass })(SelectClass);
