import React, { Component } from 'react';
// import PDF from 'react-pdf-js';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

class PDFViewer extends Component {
    state = {};

    onDocumentComplete = (pages) => {
        this.setState({ page: 1, pages });
    }

    onPageComplete = (page) => {
        this.setState({ page });
    }

    handlePrevious = () => {
        this.setState({ page: this.state.page - 1 });
    }

    handleNext = () => {
        this.setState({ page: this.state.page + 1 });
    }

    renderPagination = (page, pages) => {
        let previousButton = <Button onClick={this.handlePrevious}><Icon name='angle left' /></Button>;
        let nextButton = <Button onClick={this.handleNext}><Icon name='angle right' /></Button>;

        if (page === 1) {
            previousButton = <Button disabled onClick={this.handlePrevious}><Icon name='angle right' /></Button>;
        }

        if (page === pages) {
            nextButton = <Button disabled onClick={this.handleNext}><Icon name='angle right' /></Button>;
        }

        return (
            <nav>
                <ul className="pager">
                    {previousButton}
                    {nextButton}
                </ul>
            </nav>
        );
    }

    render() {
        const { pages, page } = this.state;
        let pagination = null;

        if (pages) {
            pagination = this.renderPagination(page, pages);
        }

        return (
            <div style={{ marginBottom: '20px' }}>
                <PDF
                    file={this.props.URL}
                    onDocumentComplete={this.onDocumentComplete}
                    onPageComplete={this.onPageComplete}
                    page={page}
                    fillWidth
                />
                {pagination}
            </div>
        );
    }

}

// PDFViewer.propTypes = {
//     URL: PropTypes.string,
// };


export default PDFViewer;
