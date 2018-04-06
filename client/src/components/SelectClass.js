import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { fetchClass } from '../redux/actions/class';


class SelectClass extends Component  {
    state = {
        selected: '',
        options: []
    }

    onClassSelect = (selected) => {
        this.setState({ selected });

        if (this.props.classes && this.props.classes.list && this.props.classes.list[selected.value]) {
            this.props.fetchClass(selected.value, false)
        } else {
            this.props.fetchClass(selected.value, true);
        }
    }

    componentDidMount() {
        const classes = this.props.teacher.classes;
        const options = classes.map(_class => {
            return {
                label: _class.name,
                value: _class.id
            }
        });

        this.setState({ options });

        if(this.props.classes && this.props.classes.currentClass) {
            const selected = options.find(option => {
                return option.value === this.props.classes.currentClass
            });

            this.setState({ selected });
        }
    }

    render() {
        const { selected, options } = this.state;
        let currentClass;

        if (this.props.classes && this.props.classes.currentClass) {
            currentClass = this.props.classes.list[this.props.classes.currentClass];
        }

        const value = selected && selected.value;


        return (
            <div>
                <h5>Select a class</h5>
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

export default connect(mapStateToProps, { fetchClass })(SelectClass);
