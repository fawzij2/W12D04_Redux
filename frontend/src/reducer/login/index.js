
const initialState ={
    token:'',
};

export const setToken = (token) =>{
    return{
        type :'SET_TOKEN',
        payload : token,
    }
}

const login = (state = initialState, {type, payload})=>{
    switch (type){
        case 'SET_TOKEN':
        return {token:payload}
    }
}

export default login;