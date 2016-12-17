import * as bookActions from '../../actions/bookActions';
import BookList from './BookList';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export class BookCatalogPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {books} = this.props;

        return (
            <div>
                <h1>Book Catalog</h1>
                <BookList books={books} />
            </div>
        );
    }
}

BookCatalogPage.propTypes = {
    actions: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        books: state.books
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(bookActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookCatalogPage);
