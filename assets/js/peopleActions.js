export const FETCH_PEOPLE = 'FETCH_PEOPLE'
export const FETCH_PEOPLE_SUCCESS = 'FETCH_PEOPLE_SUCCESS'
export const FETCH_PEOPLE_FAILURE = 'FETCH_PEOPLE_FAILURE'

export const fetchPeople = () => ({
  type: FETCH_PEOPLE
});

export const fetchPeopleSuccess = people => ({
  type: FETCH_PEOPLE_SUCCESS,
  people: JSON.parse(people)
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
        dispatch(fetchPeopleSuccess(result))
      },
      (error) => {
        dispatch(fetchPeopleFailure(error))
      }
    )
  }
}