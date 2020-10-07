const initialState = {
    list: [],

    listInfo: [],

    groceryLists: [],

    loading: false
};


const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            return {
                list: [
                    ...state.list, action.payload
                ]
            }
        case "DELETE_ITEM":
            return {
                list: [
                    ...state.list.filter((item) => item.id !== action.payload)
                ]
            }
        case "UPDATE_ITEM":
            return {
                list: [
                    ...state.list.map((item) => item.id === action.payload.id ? action.payload.item : item)
                ]
            };
        case "FETCH_LISTS_SUCCESS":
            return {
                groceryLists: [
                    action.payload
                ]
            };
        case "FETCH_LIST_SUCCESS":
            return {
                ...state,
                list: action.payload

            };
        case "FETCH_LIST_INFO_SUCCESS":
            return {
                ...state,
                listInfo: action.payload

            };
        case "LOADING":
            return {
                ...state,
                loading: true

            };
        case "STOP_LOADING":
            return {
                ...state,
                loading: false

            };

        case "NEW_STATE":
            return {
                ...state,
                list: action.payload,
                loading: false

            };
        default:
            return state;
    }
};

export default listReducer;
