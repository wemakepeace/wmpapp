import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { fetchClass, removeClass } from '../redux/actions/class';


class SelectClass extends Component  {
    state = {
        selected: '',
        options: []
    }

    onClassSelect = (selected) => {

        if (selected === null) {
            this.setState({selected})
            return this.props.removeClass();
        }

        const fetchClassFromServer = this.props.classes && this.props.classes.list && this.props.classes.list[selected.value] ? false : true

        this.props.fetchClass(selected.value, fetchClassFromServer);
    }

    setSelected = (classes, options) => {

        let selected = null;
        if(classes && classes.currentClass) {
            selected = options.find(option => {
                return option.value === classes.currentClass
            });
        }

        if (selected) {
            this.setState({ selected, options });
        } else {
            // why does it not rerender?
            this.setState({ options });
        }
    }

    componentDidMount() {
        const classes = this.props.classes;
        const options = this.props.teacher.classes;

        this.setSelected(classes, options)
    }

    componentWillReceiveProps(nextProps) {
        const classes = nextProps.classes;
        const options = nextProps.teacher.classes || [];

        this.setSelected(classes, options);
    }

    render() {
        const { selected, options } = this.state;
        const value = selected && selected.value;

        return (
            <div className='select-class'>
                <h5>Class</h5>
                <Select
                    name='form-field-name'
                    value={value}
                    onChange={this.onClassSelect}
                    options={options}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        teacher: state.teacher,
        classes: state.classes
    }
}

export default connect(mapStateToProps, { fetchClass, removeClass })(SelectClass);
