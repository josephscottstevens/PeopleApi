import {
  FETCH_PEOPLE,
  FETCH_PEOPLE_SUCCESS,
  FETCH_PEOPLE_FAILURE
} from './peopleActions';

const initialState =
{
  error: null,
  isLoaded: false,
  people: []
};

export default function peopleReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PEOPLE:
      return Object.assign({}, state, {
        isLoaded: false,
        error: null
      });

    case FETCH_PEOPLE_SUCCESS:
      return Object.assign({}, state, {
        isLoaded: true,
        people: action.people
      });

    case FETCH_PEOPLE_FAILURE:
      return Object.assign({}, state, {
        isLoaded: true,
        error: action.error
      });

    default:
      return state;
  }
}