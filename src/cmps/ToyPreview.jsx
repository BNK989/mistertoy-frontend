// const { Link } = ReactRouterDOM

import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    return (
        <article className="flex">
            <span className="stockStatus">{toy.inStock ? 'In Stock' : 'Out of Stock'}</span>
            <h4>{toy.title}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <ul className="labels clean-list flex">{toy.labels.map((label) => <li key={label}>{label}</li>)}</ul>
            {toy.owner && <p>Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>}
            <hr />
            <div className="actions">
                <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
                <Link to={`/toy/${toy._id}`}>Details</Link>
            </div>
        </article>
    )
}