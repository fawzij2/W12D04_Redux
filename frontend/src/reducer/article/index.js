import token from "../login";

const initialState = {
    article:[],
};

const articles = (state = initialState, {type, payload})=>{
    switch(type){
        case 'SET_ARTICLES':
            return {articles:[...payload]};

        case 'ADD_ARTICLE':
            return {articles:[...state.article, payload]};

        case 'UPDATE_ARTICLE':
            return {articles:state.article.map((elem,i)=>{
                if (elem.id === payload.id) return payload;
                return elem
            })};

        case 'DELETE_ARTICLE':
            return {articles:state.article.filter((elem,i)=>{
                return elem.id !== payload.id; 
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

