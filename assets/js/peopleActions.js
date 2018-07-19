export const SELECT_ROW = "SELECT_ROW"
export const selectRow = rowId => ({
  type: SELECT_ROW,
  rowId: rowId
});

export const SHOW_NONE = 'SHOW_NONE'
export const SHOW_UNIQUE_CHARACTERS = 'SHOW_UNIQUE_CHARACTERS'
export const SHOW_POSSIBLE_DUPLICATES = 'SHOW_POSSIBLE_DUPLICATES'

export const showNone = () => ({
  type: SHOW_NONE,
  show: "NONE"
});

export const showUniqueCharacters = () => ({
  type: SHOW_UNIQUE_CHARACTERS,
  show: "UNIQUE_CHARACTERS"
});

export const showPossibleDuplicates = () => ({
  type: SHOW_NONE,
  show: "POSSIBLE_DUPLICATES"
});

export const FETCH_PEOPLE = 'FETCH_PEOPLE'
export const FETCH_PEOPLE_SUCCESS = 'FETCH_PEOPLE_SUCCESS'
export const FETCH_PEOPLE_FAILURE = 'FETCH_PEOPLE_FAILURE'

export const fetchPeople = () => ({
  type: FETCH_PEOPLE
});

export const fetchPeopleSuccess = people => ({
  type: FETCH_PEOPLE_SUCCESS,
  people: people
});

export const fetchPeopleFailure = error => ({
  type: FETCH_PEOPLE_FAILURE,
  error: error
});

export function getPeople() {
  return dispatch => {
    dispatch(fetchPeople())
    return fetch("http://localhost:4000/people").then(response => response.json()).then(
      (result) => {
        dispatch(fetchPeopleSuccess(JSON.parse(result)))
      },
      (error) => {
        dispatch(fetchPeopleFailure(error))
      }
    )
  }
}