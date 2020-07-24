import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const QUESTIONS_ASYNC_SUCCESS = 'ADMIN/QUESTIONS_ASYNC_SUCCESS'
export const QUESTION_ASYNC_SUCCESS = 'ADMIN/QUESTION_ASYNC_SUCCESS'
export const QUESTION_RESET_SELECTED = 'ADMIN/QUESTION_RESET_SELECTED'
export const QUESTIONS_ASYNC_FAIL = 'ADMIN/QUESTIONS_ASYNC_FAIL'
export const QUESTIONS_UPDATE_PAGE = 'ADMIN/QUESTIONS_UPDATE_PAGE'
export const QUESTIONS_UPDATE_FILTERS = 'ADMIN/QUESTIONS_UPDATE_FILTERS'
export const QUESTION_CREATE_SUCCESS = 'ADMIN/QUESTION_CREATE_SUCCESS'
export const QUESTION_DELETE_SUCCESS = 'ADMIN/QUESTION_DELETE_SUCCESS'

function questionsAsyncSuccess(questions) {
  return {
    type: QUESTIONS_ASYNC_SUCCESS,
    payload: questions
  }
}

function questionAsyncSuccess(questions) {
  return {
    type: QUESTION_ASYNC_SUCCESS,
    payload: questions
  }
}

function questionsAsyncFail(error) {
  return {
    type: QUESTIONS_ASYNC_FAIL,
    payload: error
  }
}

export function questionResetSelected() {
  return {
    type: QUESTION_RESET_SELECTED
  }
}

export function questionsUpdatePage(page) {
  return {
    type: QUESTIONS_UPDATE_PAGE,
    payload: page
  }
}

export function questionsUpdateFilters(search) {
  return {
    type: QUESTIONS_UPDATE_FILTERS,
    payload: {
      search
    }
  }
}

export function questionsFunnelAsyncRequest(funnelId) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/funnels/:funnelId/questions',
        method: 'GET',
        force: true,
        pathParams: {
          funnelId
        },
        body: null
      })

      await dispatch(questionsAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(questionsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function questionAsyncRequest(questionId) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/questions/:questionId',
        method: 'GET',
        force: true,
        pathParams: {
          questionId
        },
        queryParams: {
          include: [
            { relation: 'domains' },
            { relation: 'type' },
            { relation: 'category' }
          ]
        }
      })

      await dispatch(questionAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(questionsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function questionEditRequest(questionId, question) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      await service.api({
        path: '/questions/:questionId',
        method: 'PATCH',
        pathParams: {
          questionId
        },
        body: question
      })

      const savedQuestion = await dispatch(questionAsyncRequest(questionId))
      return savedQuestion
    } catch (errorMessage) {
      dispatch(questionsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}


export function questionCreateRequest(funnelId, question) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/funnels/:funnelId/questions',
        pathParams: {
          funnelId
        },
        method: 'POST',
        body: question
      })

      const createdQuestion = await dispatch(questionAsyncRequest(response.id))
      return createdQuestion
    } catch (errorMessage) {
      dispatch(questionsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
