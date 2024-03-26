import { useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service.js'
import { useEffectUpdate } from '../customHooks/useEffectUpdate.js'
import { useParams, useSearchParams } from 'react-router-dom'

export function ToyFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  const debounceOnSetFilter = useRef(utilService.debounce(onSetFilter, 500))
  const [searchParams, setSearchParams] = useSearchParams()

  useEffectUpdate(() => {
    setSearchParams(filterByToEdit)
    const searchObj = {
      txt: searchParams.get('txt'),
      maxPrice: +searchParams.get('maxPrice'),
    }
    console.log('searchParams:', searchObj)
    debounceOnSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    value = type === 'number' ? +value : value
    if (type === "select-one"){
        if(value === 'false') value = false
        if(value === 'true') value = true
    }
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  return (
    <section className="toy-filter full main-layout">
      <form>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="txt"
          placeholder="By title"
          value={filterByToEdit.txt}
          onChange={handleChange}
        />

        <label htmlFor="maxPrice">Max price:</label>
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          placeholder="By max price"
          value={filterByToEdit.maxPrice || ''}
          onChange={handleChange}
        />
        <label htmlFor="inStock">in Stock:</label>
        <select type="boolean" id="inStock" name="inStock" onChange={handleChange}>
          <option value="">All</option>
          <option value='true'>In Stock</option>
          <option value='false'>Out of stock</option>
        </select>
      </form>
    </section>
  )
}
