import * as actionTypes from './actionTypes'

const INITIAL_STATE = {
  questions: [],
  selectedQuestion: {},
  getQuestionsLoading: false
}

const appReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case actionTypes.GET_QUESTIONS_LOADING:
      return {
        ...state,
        getQuestionsLoading: true
      }
    case actionTypes.GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        getQuestionsLoading: false,
        questions: payload
      }
    case actionTypes.GET_QUESTIONS_ERROR:
      return {
        ...state,
        getQuestionsLoading: false
      }
    case actionTypes.SET_SELECTED_QUESTION:
      return {
        ...state,
        selectedQuestion: payload
      }
    default:
      return state
  }
}

export default appReducer
