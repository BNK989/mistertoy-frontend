import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// const { useSelector, useDispatch } = ReactRedux
import { useEffect } from 'react'
// const { Link } = ReactRouterDOM

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { toyActions } from '../store/actions/toy.actions.js'
import { ADD_TOY_TO_CART } from '../store/reducers/toy.reducer.js'

export function ToyIndex() {
  const dispatch = useDispatch()
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

  useEffect(() => {
    toyActions.loadToys().catch((err) => {
      showErrorMsg('Cannot load toys!(toyIndex.jsx:22)')
    })
  }, [filterBy])

  function onSetFilter(filterBy) {
    //console.log('27: searching for:', filterBy)
    toyActions.setFilterBy(filterBy)
  }

  function onRemoveToy(ToyId) {
    toyActions.removeToyOptimistic(ToyId)
      .then(() => {
        showSuccessMsg('toy removed')
      })
      .catch((err) => {
        showErrorMsg('Cannot remove toy')
      })
  }

  function onAddToy() {
    const toyToSave = toyService.getEmptyToy()
    console.log('toyToSave:', toyToSave)
    toyActions
      .saveToy(toyToSave)
      .then((savedToy) => {
        console.log('savedToy:', savedToy)
        showSuccessMsg(`Toy added (id: ${savedToy._id})`)
      })
      .catch((err) => {
        showErrorMsg('Cannot add toy')
      })
  }

  function onEditToy(toy) {
    const price = +prompt('New price?')
    const toyToSave = { ...toy, price }

    toyActions.saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
      })
      .catch((err) => {
        showErrorMsg('Cannot update toy')
      })
  }

  function addToCart(toy) {
    console.log(`Adding ${toy.title} to Cart`)
    dispatch({ type: ADD_TOY_TO_CART, toy })
    showSuccessMsg('Added to Cart')
  }

  return (
    <div>
      <h3>Toy Store</h3>
      <main>
        <Link to="/toy/edit">Add Toy</Link>
        <button className="add-btn" onClick={onAddToy}>
          Add Random Toy
        </button>
        <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        {!isLoading ? (
          <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy}
            onEditToy={onEditToy}
            addToCart={addToCart}
            txt={'123'}
            nums={[1, 2, 3]}
            baba="hello"
          />
        ) : (
          <div>Loading...</div>
        )}
        <hr />
      </main>
    </div>
  )
}
