import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { storageService } from './async-storage.service.js'

const BASE_URL = 'toy/'
const KEY = 'toyDB'

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy: getEmptyToy,
  getDefaultFilter,
}
//e.g filter{txt: 'srt', maxPrice: 99}
function query(filterBy = {}) {
  // return httpService.get(BASE_URL, filterBy)
  console.log('filterBy from query:', filterBy)
  return storageService.query(KEY).then((toys) => {
    const reg = new RegExp(filterBy.txt, 'i')
    return toys.filter(toy => (reg ? reg.test(toy.title) : true) &&
                              (filterBy.maxPrice ? toy.price <= filterBy.maxPrice : true) && 
                              (filterBy.inStock !== '' ? toy.inStock === filterBy.inStock : true))

  })
}

function getById(toyId) {
  // return httpService.get(BASE_URL + toyId)
  return storageService.get(BASE_URL + toyId)
}
function remove(toyId) {
  // return httpService.delete(BASE_URL + toyId)
  return storageService.remove(KEY, toyId)
}

function save(toy) {
  if (toy._id) {
    // return httpService.put(BASE_URL, toy)
    return storageService.put(KEY, toy)
  } else {
    // return httpService.post(BASE_URL, toy)
    return storageService.post(KEY, toy)
  }
}

function getEmptyToy() {
  return {
    title: 'Toy-' + utilService.getRandomIntInclusive(10, 99),
    price: utilService.getRandomIntInclusive(10, 900),
    labels: ['Doll', 'Battery Powered', 'Baby'],
    inStock: Math.random() > 0.3 ? true : false,
  }
}

function getDefaultFilter() {
  return { txt: '', maxPrice: '', inStock: '' }
}
