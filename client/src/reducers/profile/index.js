import boards from './board';
import favourites from './favourite';
import posts from './post';
import profile from './profile';

const initialState = {
    boards: {},
    favourites: {},
    posts: {},
    profile: {},
    user: {},
    tab: 0
};

export default (state = initialState, action) => {
    return {
        ...boards(state, action),
        favourites: favourites(state.favourites, action),
        ...posts(state, action),
        ...profile(state, action)
    };
};
