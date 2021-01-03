import * as actionTypes from './actionTypes'

const INITIAL_STATE = {
  questions: {},
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
    case actionTypes.GET_QUESTIONS_SUCCESS: {
      let tempItems
      if (state.questions.items && state.questions.items.length > 0) {
        tempItems = [...state.questions.items, ...payload.items]
      } else {
        tempItems = payload.items
      }
      return {
        ...state,
        getQuestionsLoading: false,
        questions: {
          ...payload,
          items: tempItems
        }
      }
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
