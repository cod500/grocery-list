import React, { Fragment } from 'react';
import Splash from './Spash';
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
