import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as action from '../redux/action'
import Home from './Home'
import { noop } from '../../../utils'
import QuestionDetailsModal from './QuestionDetailsModal/QuestionDetailsModal'

const HomeContainer = ({
  questions,
  getQuestions,
  setSelectedQuestion,
  selectedQuestion,
  getQuestionsLoading
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    getQuestions(currentPage)
  }, [])

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  const viewDetailsBtnHandler = async (e, question) => {
    console.log('RB:: question', question)
    await setSelectedQuestion(question)
    handleModal()
  }

  return (
    <>
      <Home
        questions={questions}
        viewDetailsBtnHandler={viewDetailsBtnHandler}
        getQuestionsLoading={getQuestionsLoading}
        getQuestions={getQuestions}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <QuestionDetailsModal
        open={isOpen}
        handleModal={handleModal}
        selectedQuestion={selectedQuestion}
      />
    </>
  )
}

HomeContainer.propTypes = {
  questions: PropTypes.instanceOf(Object),
  getQuestions: PropTypes.func,
  setSelectedQuestion: PropTypes.func,
  selectedQuestion: PropTypes.instanceOf(Object),
  getQuestionsLoading: PropTypes.bool
}

HomeContainer.defaultProps = {
  questions: {},
  getQuestions: noop,
  setSelectedQuestion: noop,
  selectedQuestion: {},
  getQuestionsLoading: false
}

const mapStateToProps = (state) => ({
  questions: state.app.questions,
  selectedQuestion: state.app.selectedQuestion,
  getQuestionsLoading: state.app.getQuestionsLoading
})

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (pageNumber) => dispatch(action.getQuestions(pageNumber)),
  setSelectedQuestion: (question) =>
    dispatch(action.setSelectedQuestion(question))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
