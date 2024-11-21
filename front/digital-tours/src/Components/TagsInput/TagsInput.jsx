import { useState } from "react";
import "./TagsInput.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const TagsInput = ({ onChange, color }) => {
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])

    const handleChange = e => {
        const { value } = e.target
        setTag(value)
    }

    const handleKeyDown = e => {
        const { key } = e
        const newTag = tag.trim()

        if ((key === ',' || key === 'Enter' || key === 'Tab') && newTag.length && !tags.includes(newTag)) {
            e.preventDefault()
            setTags(prevTags => {
                const latesTags = [...prevTags, newTag]
                onChange(latesTags)
                return latesTags
            })
            setTag('')
        } else if (key === 'Backspace' && !newTag.length && tags.length) {
            e.preventDefault()

            const tagsCopy = [...tags]
            const lastTag = tagsCopy.pop()

            setTags(tagsCopy)
            onChange(tagsCopy)
            setTag(lastTag)
        }
    }

    const removeTag = index => {
        setTags(prevTags => {
            const latestTags = prevTags.filter((tag, i) => i !== index)
            onChange(latestTags)
            return latestTags
        })
    }

    const getColor = () => {
        const colors = ['color-default', 'color-green', 'color-red', 'color-blue', 'color-yellow']

        return colors.includes(`color-${color}`) ? `color-${color}` : `color-default`
    }

    return (
        <div className="tags-input-wrapper">
            {tags.map((tag, index) => (
                <div key={index} className={`tag-item ${getColor()}`}>
                    <span className="title">{tag}</span>
                    <button className="remove-btn" onClick={() => removeTag(index)}><FontAwesomeIcon icon={faXmark} /></button>
                </div>
            ))}
            <input value={tag} onChange={handleChange} className="tag-input" onKeyDown={handleKeyDown} placeholder="Ingresa las caracteristicas (separadas por coma)" />
        </div>
    )
}

export default TagsInput