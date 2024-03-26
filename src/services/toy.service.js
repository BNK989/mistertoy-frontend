import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { storageService } from './async-storage.service.js'

const BASE_URL = 'toy/'

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy: getEmptyToy,
  getDefaultFilter,
}

function query(filterBy = {}) {
  // return httpService.get(BASE_URL, filterBy)
  return storageService.get(BASE_URL, filterBy)
}

function getById(toyId) {
  // return httpService.get(BASE_URL + toyId)
  return storageService.get(BASE_URL + toyId)
}
function remove(toyId) {
  // return httpService.delete(BASE_URL + toyId)
  return storageService.delete(BASE_URL + toyId)
}

function save(toy) {
  if (toy._id) {
    // return httpService.put(BASE_URL, toy)
    return storageService.put(BASE_URL, toy)
  } else {
    // return httpService.post(BASE_URL, toy)
    return storageService.post(BASE_URL, toy)
  }
}

function getEmptyToy() {
  return {
    title: 'Toy-123',
    price: utilService.getRandomIntInclusive(10, 900),
    labels: ['Doll', 'Battery Powered', 'Baby'],
    inStock: true,
  }
}

function getDefaultFilter() {
  return { txt: '', maxPrice: '' }
}
