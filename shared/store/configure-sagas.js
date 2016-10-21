// @flow
import createSagaMiddleware from 'redux-saga'
import deviceSaga from '../actions/devices'
import favoriteSaga from '../actions/favorite'
import gregorSaga from '../actions/gregor'
import kbfsSaga from '../actions/kbfs'
import loginSaga from '../actions/login/saga'
import notificationsSaga from '../actions/notifications'
import pgpSaga from '../actions/pgp'
import planBillingSaga from '../actions/plan-billing'
import profileSaga from '../actions/profile'
import settingsSaga from '../actions/settings'
import {call} from 'redux-saga/effects'

import type {SagaGenerator} from '../constants/types/saga'

function * mainSaga (): SagaGenerator<any, any> {
  yield [
    call(deviceSaga),
    call(favoriteSaga),
    call(gregorSaga),
    call(kbfsSaga),
    call(loginSaga),
    call(notificationsSaga),
    call(pgpSaga),
    call(planBillingSaga),
    call(profileSaga),
    call(settingsSaga),
  ]
}

let middleWare
function create (crashHandler: (err: any) => void) {
  if (middleWare) {
    throw new Error('Only create one saga middleware!')
  }
  middleWare = createSagaMiddleware({onError: crashHandler})
  return middleWare
}

function run () {
  middleWare.run(mainSaga)
}

export {
  create,
  run,
}
