import { useState } from "react"

export const Accordion = ({ title, children }) => {
    console.log('children:', children)
    const [isOpen, setIsOpen] = useState(false)

    function onToggleOpen() {
        setIsOpen(isOpen => !isOpen)
    }
    const openClass = isOpen ? 'open' : ''
    return (
        <section className="accordion">
            <section onClick={onToggleOpen} className="title-container">
                <h2>{title}</h2>
                <span className="arrow">⌄</span>
            </section>
            <section className={`content ${openClass}`}>
                <section>{children}</section>
            </section>
        </section >
    )
}