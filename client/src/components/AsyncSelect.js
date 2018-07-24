import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

class AsyncSelect extends Component {

    state = {
        selected: {}
    }

    componentWillMount() {
        this.setState({ selected: this.props.value });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ selected: nextProps.value });
    }

    handleChange = (selected) => {
        const { name, handleAddValues } = this.props;

        this.setState({ selected });
        handleAddValues({ name, selected });
    }

    render() {
        const { asyncFetch, name } = this.props;
        const { selected } = this.state;

        return (
            <Select.Async
                value={selected}
                name={name}
                inputProps={{ type: 'react-type' }}
                loadingPlaceholder="Loading..."
                loadOptions={asyncFetch}
                onChange={this.handleChange}
                search
                cache={false}
            />
        );
    }

}

AsyncSelect.propTypes = {
    name: PropTypes.string,
    value: PropTypes.object,
    disabled: PropTypes.bool,
    asyncFetch: PropTypes.func,
    handleAddValues: PropTypes.func
};

export default AsyncSelect;
