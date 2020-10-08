import { db, storage } from '../../config/fbConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";

//Add item to list 
export const addItem = (item, listInfo) => {
    return (dispatch) => {
        dispatch({ type: "ADD_ITEM", payload: item })
        dispatch({ type: "FETCH_LIST_INFO_SUCCESS", payload: listInfo })
    }
}

//Delete item in list
export const deleteItem = (listId, listInfo) => {
    return (dispatch) => {
        dispatch({ type: "DELETE_ITEM", payload: listId })
        dispatch({ type: "FETCH_LIST_INFO_SUCCESS", payload: listInfo })
    }
}

// Edit item in list
export const updateItem = (item, id, listInfo) => {
    return (dispatch) => {
        let update = {
            item,
            id
        }
        dispatch({ type: "UPDATE_ITEM", payload: update })
        dispatch({ type: "FETCH_LIST_INFO_SUCCESS", payload: listInfo })
    }
}

//Submit grocerylist to database
export const submitList = (data, title, userId, displayName) => {
    return (dispatch) => {


        const groceryList = {};


        //Get user profile image
        const response = storage.ref(`/users/${userId}/profile.jpg`).getDownloadURL();

        response
            .then(img => {
                // save feed data
                groceryList.username = displayName;
                groceryList.userId = userId;
                groceryList.userImage = img;
                groceryList.title = title;
                groceryList.list = data;
                groceryList.createdAt = new Date().toString();
            })
            .then(() => {
                return db.collection("grocery").add(groceryList);
            })
            .then(() => {
                toast.success("Grocery list saved successfully", {
                    onClose: () => (window.location.href = "/lists")
                });
            })
    };
}

//Get grocerylists
export const fetchLists = (userId) => {
    return (dispatch) => {
        dispatch({ type: "LOADING" });
        let lists = [];
        const response = db.collection("grocery").where("userId", "==", userId).get();
        response.then((data) => {
            data.forEach((doc) => {
                const allLists = {
                    title: doc.data().title,
                    listId: doc.id,
                    userImage: doc.data().userImage,
                    createdAt: moment(doc.data().createdAt).fromNow(),
                    list: doc.data().list
                };
                lists.unshift(allLists);
            });
            dispatch({ type: "STOP_LOADING" });
            return dispatch({ type: "FETCH_LISTS_SUCCESS", payload: lists });
        })
            .catch((err) => {
                console.log(err)
            })
    };
};

//Get single list 
export const fetchSingleList = (listId) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING' });
        let list = [];
        let listInfo = {};
        const response = db.doc(`/grocery/${listId}`).get();

        response.then((doc) => {
            doc.data().list.forEach((item) => {
                return list.unshift(item)
            });
            listInfo.title = doc.data().title;
            listInfo.id = doc.id
            console.log(listInfo.title)
            dispatch({ type: "FETCH_LIST_SUCCESS", payload: list });
            dispatch({ type: "FETCH_LIST_INFO_SUCCESS", payload: listInfo })
        }).then(() => {
            dispatch({ type: "STOP_LOADING" })
        }).catch((err) => {
            console.log(err)
        });
    };
};


//Update grocery list
export const updateList = (data, title, listId) => {
    console.log(data)
    return (dispatch) => {
        dispatch({ type: "LOADING" });
        const response = db.doc(`/grocery/${listId}`).get()
        response.then((doc) => {
            return doc.ref.update({ title: title, list: data });
        }).then(() => {
            return dispatch({ type: "STOP_LOADING" });
        })
            .then(() => {
                toast.success("Grocery list updated successfully", {
                    onClose: () => (window.location.href = "/")
                });
            })
            .catch((err) => {
                console.log(err)
            })
    };
};



//Delete grocery list
export const deleteList = (listId) => {
    return (dispatch) => {
        dispatch({ type: "LOADING" });

        const response = db.doc(`/grocery/${listId}`).delete();
        response.then((doc) => {
            toast.success("Grocery list deleted successfully", {
                onClose: () => (window.location.href = "/lists")
            });
        });
    }
}

//refresh grocery list on add list page
export const newState = () => {
    return (dispatch) => {
        dispatch({ type: "NEW_STATE", payload: [] })
    }
}