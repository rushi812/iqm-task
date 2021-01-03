import React from 'react'
import PropTypes from 'prop-types'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import { formatedDate } from '../../../utils'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow)

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: '100vh'
  },
  table: {
    minWidth: 650
  },
  spinner: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
}))

const Home = ({ questions, viewDetailsBtnHandler }) => {
  const classes = useStyles()
  return (
    <>
      <CssBaseline />
      {questions && questions.length > 0 ? (
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table
              stickyHeader
              className={classes.table}
              aria-label='simple table'
            >
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Author</StyledTableCell>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell>Creation Date</StyledTableCell>
                  <StyledTableCell>View Details</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {questions.map((question) => (
                  <StyledTableRow key={question.question_id}>
                    <StyledTableCell component='th' scope='row'>
                      {question.owner.display_name}
                    </StyledTableCell>
                    <StyledTableCell>{question.title}</StyledTableCell>
                    <StyledTableCell>
                      {formatedDate(question.creation_date)}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={(e) => viewDetailsBtnHandler(e, question)}
                      >
                        View
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <div className={classes.spinner}>
          <CircularProgress color='secondary' />
        </div>
      )}
    </>
  )
}

Home.propTypes = {
  questions: PropTypes.instanceOf(Array)
}

Home.defaultProps = {
  questions: []
}

export default Home
