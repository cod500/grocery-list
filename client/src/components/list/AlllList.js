import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import ListTitle from './ListTitle';
import LoadingSpinner from '../spinner/LoadingSpinner';
import { fetchLists } from '../../store/actions/list-actions';

function AllLists({ lists = [], isLoading, getLists }) {

    const token = jwt_decode(localStorage.getItem('token'));
    let user;
    if (token) {
        user = token;
    }
    const { uid } = user.user;

    useEffect(() => {
        getLists(uid);
    }, [getLists, uid]);

    return (
        <div className="h-screen">
            {isLoading ? (<LoadingSpinner />) : (
                <div className="h-full">
                    <div className="text-center mt-12">
                        <h1 className="mt-2 text-gray-700">Your Grocery Lists.</h1>
                        <p className="text-gray-800 text-lg">Edit, delete, or text a list you have created any time!</p>
                    </div>
                    <div className="flex justify-between">
                        {lists.map((list, i) => {
                            return (
                                <div key={i}>
                                    <ListTitle lists={list} />
                                </div>
                            )
                        })}

                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        lists: state.list.groceryLists,
        isLoading: state.list.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getLists: (userId) => {
            dispatch(fetchLists(userId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllLists);

