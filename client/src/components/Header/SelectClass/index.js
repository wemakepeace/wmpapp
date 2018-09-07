import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Async } from 'react-select';
import { fetchClass, removeCurrentClass } from '../../../redux/actions/class';

class SelectClass extends Component  {
    state = {
        selected: '',
        options: []
    }

    onClassSelect = (selected) => {
        if (selected === null) {
            this.setState({ selected })
            return this.props.removeCurrentClass();
        }

        this.props.fetchClass(selected.value);

        if (this.props.history.location.pathname !== '/profile/overview') {
            this.props.history.push('/profile/overview');
        }
    }

    setSelected = (options, id) => {
        let selected = '';

        if(options && id) {
            selected = options.find(option => {
                return option.value === id
            });
        }

        this.setState({ selected, options });
    }

    componentDidMount() {
        const options = this.props.teacher.classes;
        const { currentClass: { id } } = this.props;
        this.setSelected(options, id);
    }

    componentWillReceiveProps({ teacher, currentClass}) {
        const options = teacher.classes;
        const { id } = currentClass;
        this.setSelected(options, id);
    }

    render() {
        const { selected, options } = this.state;
        const value = selected && selected.value;

        return (
            <Select
                className='header-menu-item select-class'
                name='form-field-name'
                value={value}
                placeholder='Select class'
                onChange={this.onClassSelect}
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
