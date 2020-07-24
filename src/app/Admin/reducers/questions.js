import { Record } from 'immutable'
import BaseList, { toEntityList } from 'base/BaseList'
import Question from 'models/Question'

import {
  QUESTIONS_ASYNC_SUCCESS,
  QUESTION_ASYNC_SUCCESS,
  QUESTIONS_ASYNC_FAIL,
  QUESTIONS_UPDATE_PAGE,
  QUESTION_RESET_SELECTED,
  QUESTION_CREATE_SUCCESS
} from 'admin/actions/questions'

const QuestionsOptions = new Record({
  currentPageIndex: 0,
  limit: 16,
  selected: null
})

const QuestionsFilters = new Record({
  search: null
})

const initialState = new BaseList({
  errorMessage: '',
  count: 0,
  results: toEntityList([], Question),
  options: QuestionsOptions(),
  filters: QuestionsFilters()
})

const actionsMap = {
  [QUESTION_CREATE_SUCCESS]: (state, action) => {
    const { payload: funnel } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', new Question(funnel))
    })
  },
  [QUESTION_ASYNC_SUCCESS]: (state, action) => {
    const { payload: funnel } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', new Question(funnel))
    })
  },
  [QUESTIONS_ASYNC_SUCCESS]: (state, action) => {
    const { payload } = action

    return state.merge({
      results: toEntityList(payload, Question)
    })
  },
  [QUESTION_RESET_SELECTED]: (state) => {
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', null)
    })
  },
  [QUESTIONS_ASYNC_FAIL]: (state, action) => {
    const { payload } = action
    return state.merge({
      errorMessage: payload
    })
  },
  [QUESTIONS_UPDATE_PAGE]: (state, action) => {
    const { payload: page } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('currentPageIndex', page)
    })
  }
}

export default function questions(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
