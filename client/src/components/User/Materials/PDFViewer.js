// import React from 'react';
// import PDF from 'react-pdf-js';

// class PDFViewer extends React.Component {
//   state = {};

//   onDocumentComplete = (pages) => {
//     this.setState({ page: 1, pages });
//   }

//   handlePrevious = () => {
//     this.setState({ page: this.state.page - 1 });
//   }

//   handleNext = () => {
//     this.setState({ page: this.state.page + 1 });
//   }

//   renderPagination = (page, pages) => {
//     let previousButton = <li className="previous" onClick={this.handlePrevious}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
//     if (page === 1) {
//       previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
//     }
//     let nextButton = <li className="next" onClick={this.handleNext}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
//     if (page === pages) {
//       nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
//     }
//     return (
//       <nav>
//         <ul className="pager">
//           {previousButton}
//           {nextButton}
//         </ul>
//       </nav>
//       );
//   }

//   render() {
//     let pagination = null;
//     if (this.state.pages) {
//       pagination = this.renderPagination(this.state.page, this.state.pages);
//     }
//     return (
//       <div>
//         <PDF
//           file={this.props.URL}
//           onDocumentComplete={this.onDocumentComplete}
//           page={this.state.page}
//         />
//         {pagination}
//       </div>
//     )
//   }
// }

// export default PDFViewer;


// // import React, { Component } from 'react';
// // import PropTypes from 'prop-types';
// // import { Button, Icon } from 'semantic-ui-react';
// // // import { Document, Page } from 'react-pdf';

// // class PDFViewer extends Component {
// //   state = {
// //     numPages: null,
// //     pageNumber: 1,
// //   }

// //   onDocumentLoad = ({ numPages }) => {
// //     this.setState({ numPages });
// //   }

// //   render() {
// //     const { pageNumber, numPages } = this.state;

// //     return (
// //       <div>
// //         <Document
// //             file={this.props.URL}
// //           onLoadSuccess={this.onDocumentLoad}
// //         >
// //           <Page pageNumber={pageNumber} />
// //         </Document>
// //         <p>Page {pageNumber} of {numPages}</p>
// //       </div>
// //     );
// //   }
// // }


// // // PDFViewer.propTypes = {
// // //     URL: PropTypes.string,
// // // };


// // export default PDFViewer;
