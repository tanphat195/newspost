export const POSTS_HOME = 'POSTS_HOME';

const initialState = {
  posts_home: [],
}

const mapActions = {
  [POSTS_HOME]: (state, payload) => {
    return {
      ...state,
      posts_home: [...payload],
    }
  },
};

export default (state = initialState, action) => {
  const fn = mapActions[action.type];
  return fn ? fn(state, action.payload) : state;
};