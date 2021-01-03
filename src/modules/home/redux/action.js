import * as actionTypes from './actionTypes'
import { getQuestionsAPI } from '../../../utils/api'

export const getQuestions = (pageNumber) => ({
  type: actionTypes.GET_QUESTIONS,
  payload: getQuestionsAPI(pageNumber)
})

export const setSelectedQuestion = (question) => ({
  type: actionTypes.SET_SELECTED_QUESTION,
  payload: question
})
