import React, { Fragment, useEffect } from 'react';
import Splash from './Spash';
import LoadingSpinner from '../spinner/LoadingSpinner';
import { connect } from 'react-redux';

function Home({ isLoading }) {

    return (
        <Fragment>
            <Splash />
        </Fragment>
    );
};
const mapStateToProps = (state) => {
    return {
        isLoading: state.list.loading,
    }
};

export default connect(mapStateToProps, null)(Home);
