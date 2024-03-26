import { ToyPreview } from './ToyPreview.jsx'
import PropTypes from 'prop-types'

export function ToyList({ toys, onRemoveToy, onEditToy, addToCart }) {
  console.log('List rendered')

  return (
    <ul className="toy-list clean-list">
      {toys.map((toy) => (
        <li className="toy-preview" key={toy._id}>
          <ToyPreview toy={toy} />

          <div>
            <button onClick={() => onRemoveToy(toy._id)}>x</button>
            <button onClick={() => onEditToy(toy)}>Edit</button>
          </div>

          <button className="buy" onClick={() => addToCart(toy)}>
            Add to Cart
          </button>
        </li>
      ))}
    </ul>
  )
}

ToyList.propTypes = {
  txt(props, propName, cmpName) {
    if (typeof props[propName] !== 'string') {
      return new Error('Not A String!')
    }
  },
  nums: PropTypes.arrayOf(PropTypes.number),
  baba: PropTypes.string.isRequired,
}
