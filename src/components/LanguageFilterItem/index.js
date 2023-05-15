import './index.css'

const LanguageFilterItem = props => {
  const {item, handleActiveLanguage, activeLanguageId} = props
  const {id, language} = item
  const isLanguageActive = id === activeLanguageId ? 'active-btn' : ''

  const changeActiveLanguage = () => {
    handleActiveLanguage(id)
  }

  return (
    <li>
      <button
        className={`language-btn ${isLanguageActive}`}
        onClick={changeActiveLanguage}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
