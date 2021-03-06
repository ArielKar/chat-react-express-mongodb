import * as actions from '../actions';
import * as serverAPI from "../../serverApi/serverAPI";
import * as thunks from "./index";

export function login(name, password) {
    return async (dispatch) => {
        const loginData = await serverAPI.login(name, password);
        dispatch(actions.setUser(loginData.user));
        dispatch(actions.setToken(loginData.token));
        dispatch(thunks.getPrivateGroups());
        dispatch(thunks.getTree());
    }
}

export function getTree() {
    return async (dispatch, getState) => {
        const {token, user} = getState().usersRdcr;
        const getTreeRes = await serverAPI.getTree(token, user);
        dispatch(actions.setTree(getTreeRes));
    }
}

//users related actions
export function addUser(newUser) {
    return async (dispatch, getState) => {
        const {token} = getState().usersRdcr;
        const createdUser = await serverAPI.addUser(newUser, token);
        const users = await serverAPI.getPrivateGroups(token);
        dispatch(actions.setUsers(users));
    }
}

export function updateUser(changedUser) {
    return async (dispatch, getState) => {
        const {token} = getState().usersRdcr;
        const updatedUser = await serverAPI.updateUser(changedUser, token);
        const users = await serverAPI.getPrivateGroups(token);
        dispatch(actions.setUsers(users));
    }
}

export function deleteUser(userId) {
    return async (dispatch, getState) => {
        const {token} = getState().usersRdcr;
        const deleted = await serverAPI.deleteUser(userId, token);
        const users = await serverAPI.getPrivateGroups(token);
        dispatch(actions.setUsers(users));
    }
}

// group related actions
export function addNewGroup(newGroup) {
    return async (dispatch, getState) => {
        const {token} = getState().usersRdcr;
        const addedGroup = await serverAPI.postGroup(newGroup, token);
        dispatch(thunks.getTree());
    }
}

export function updateGroup(groupToUpdate: object) {
    return async (dispatch, getState) => {
        const {token} = getState().usersRdcr;
        const {conversation} = getState().groupsRdcr;
        const updatedGroup = await serverAPI.updateGroup(groupToUpdate, token, conversation);
        dispatch(thunks.getTree());
    }
}

export function deleteGroup() {
    return async (dispatch, getState) => {
        const {token} = getState().usersRdcr;
        const {conversation} = getState().groupsRdcr;
        await serverAPI.deleteGroup(token, conversation);
        dispatch(thunks.getTree());
    }
}

export function setConversation(selectedElementID: number) {
    return async (dispatch, getState) => {
        dispatch(actions.setConversation(selectedElementID));
        const {token} = getState().usersRdcr;
        const {conversation} = getState().groupsRdcr;
        const messages = await serverAPI.getMessages(token, conversation);
        dispatch(actions.setMessages(messages));
    }
}

// export function setConversationUsers(selectedElement) {
//     return async (dispatch, getState) => {
//         const {token} = getState();
//         const users = await serverAPI.getUserOfGroup(selectedElement.id, token);
//         dispatch(actions.setUsersGroup(users));
//     }
// }


// messages related actions
export function addNewMessage(msgArray) {
    return async () => {
        await serverAPI.postMessage(msgArray);
    }
}

export function getPrivateGroups() {
    return async (dispatch, getState) => {
        const {token} = getState().usersRdcr;
        const users = await serverAPI.getPrivateGroups(token);
        dispatch(actions.setUsers(users));
    }
}