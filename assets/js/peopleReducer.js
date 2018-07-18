import {
  FETCH_PEOPLE,
  FETCH_PEOPLE_SUCCESS,
  FETCH_PEOPLE_FAILURE,
  SHOW_NONE,
  SHOW_UNIQUE_CHARACTERS,
  SHOW_POSSIBLE_DUPLICATES,
  SELECT_ROW
} from './peopleActions';

const initialState =
{
  error: null,
  isLoaded: false,
  people: [],
  show: "NONE",
  selectedRow: null
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

    case SHOW_NONE:
      return Object.assign({}, state, {
        show: action.show
      });

    case SHOW_UNIQUE_CHARACTERS:
      return Object.assign({}, state, {
        show: action.show
      });

    case SHOW_POSSIBLE_DUPLICATES:
      return Object.assign({}, state, {
        show: action.show
      });

    case SELECT_ROW:
      return Object.assign({}, state, {
        rowId: action.rowId
      });

    default:
      return state;
  }
}