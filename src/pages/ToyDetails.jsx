import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'

// const { useEffect, useState } = React
// const { Link, useParams } = ReactRouterDOM

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()

  useEffect(() => {
    console.log('toyId:', toyId)
    if (toyId) loadToy()
  }, [toyId])

  function loadToy() {
    toyService
      .getById(toyId)
      .then((toy) => setToy(toy))
      .catch((err) => {
        console.log('Had issues in toy details', err)
        navigate('/toy')
      })
  }
  if (!toy) return <div>Loading...</div>
  return (
    <section className="toy-details">
      <h1>Toy Title : {toy.title}</h1>
      <h5>Price: ${toy.price}</h5>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas
        cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat
        perferendis tempora aspernatur sit, explicabo veritatis corrupti
        perspiciatis repellat, enim quibusdam!
      </p>
      <div className="actions">
        <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
        <Link to={`/toy`}>Back</Link>
      </div>
      <p>
        {/* <Link to="/toy/lqIQG">Next Toy</Link> */}
      </p>
    </section>
  )
}
