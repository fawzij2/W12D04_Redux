import token from "../login";

const initialState = {
    article:[],
};

const articles = (state = initialState, {type, payload})=>{
    switch(type){
        case 'SET_ARTICLES':
            return {article:[...payload]};

        case 'ADD_ARTICLE':
            return {article:[...state.article, payload]};

        case 'UPDATE_ARTICLE':
            return {article:state.article.map((elem,i)=>{
                if (elem._id === payload._id) {return payload};
                return elem
            })};

        case 'DELETE_ARTICLE':
            return {article:state.article.filter((elem,i)=>{
                return elem._id !== payload; 
            })};

        default:
            return state
    };
};

export default articles

export const setArticles = (articles)=>{
    return{
        type: 'SET_ARTICLES',
        payload: articles
    };
};

export const addArticle = (newArticle)=>{
    return{
        type: 'ADD_ARTICLE',
        payload: newArticle,
    };
};

export const updateArticle = (articleUpdate)=>{
    return {
        type: 'UPDATE_ARTICLE',
        payload: articleUpdate,
    };
};

export const deleteArticle = (deletedArticle)=>{
    return {
        type: 'DELETE_ARTICLE',
        payload: deletedArticle,
    };
};

