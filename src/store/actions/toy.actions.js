import { toyService } from '../../services/toy.service.js'
import { showSuccessMsg } from '../../services/event-bus.service.js'
import {
  ADD_TOY,
  TOY_UNDO,
  REMOVE_TOY,
  SET_TOYS,
  SET_FILTER_BY,
  SET_IS_LOADING,
  UPDATE_TOY,
} from '../reducers/toy.reducer.js'
import { store } from '../store.js'

export const toyActions = {
  saveToy,
  loadToys,
  removeToyOptimistic,
  setFilterBy,
}

export function loadToys() {
  const filterBy = store.getState().toyModule.filterBy
  //console.log('loadtoys from actions filterBy:', filterBy)
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  return toyService
    .query(filterBy)
    .then((toys) => {
      //console.log('toys28:', toys)
      store.dispatch({ type: SET_TOYS, toys })
    })
    .catch((err) => {
      console.log('toy action -> Cannot load toys', err)
      throw err
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    })
}

export function removeToy(toyId) {
  return toyService
    .remove(toyId)
    .then(() => {
      store.dispatch({ type: REMOVE_TOY, toyId })
    })
    .catch((err) => {
      console.log('toy action -> Cannot remove toy', err)
      throw err
    })
}

export function removeToyOptimistic(ToyId) {
  store.dispatch({ type: REMOVE_Toy, ToyId })
  return toyService
    .remove(ToyId)
    .then(() => {
      showSuccessMsg('Removed Toy')
    })
    .catch((err) => {
      store.dispatch({ type: TOY_UNDO })
      console.log('toy action -> Cannot remove toy', err)
      throw err
    })
}

export function saveToy(toy) {
  console.log('toy action -> save toy', toy)
  const type = toy._id ? UPDATE_TOY : ADD_TOY
  return toyService
    .save(toy)
    .then((savedToy) => {
      store.dispatch({ type, toy: savedToy })
      return savedToy
    })
    .catch((err) => {
      console.log('toy action -> Cannot save toy', err)
      throw err
    })
}

export function setFilterBy(filterBy) {
  store.dispatch({ type: SET_FILTER_BY, filterBy })
}
