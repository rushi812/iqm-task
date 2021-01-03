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
  selectedQuestion
}) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    getQuestions()
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
        questions={questions.items}
        viewDetailsBtnHandler={viewDetailsBtnHandler}
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
  questions: PropTypes.instanceOf(Array),
  getQuestions: PropTypes.func,
  setSelectedQuestion: PropTypes.func
}

HomeContainer.defaultProps = {
  questions: [],
  getQuestions: noop,
  setSelectedQuestion: noop
}

const mapStateToProps = (state) => ({
  questions: state.app.questions,
  selectedQuestion: state.app.selectedQuestion
})

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(action.getQuestions()),
  setSelectedQuestion: (question) =>
    dispatch(action.setSelectedQuestion(question))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
