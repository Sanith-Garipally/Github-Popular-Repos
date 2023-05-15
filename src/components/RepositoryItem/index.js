import './index.css'

const RepositoryItem = props => {
  const {item} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = item

  return (
    <li className="list-item">
      <div className="avatar-container">
        <img className="repo-avatar" alt={name} src={avatarUrl} />
        <h1 className="repo-name">{name}</h1>
      </div>
      <div className="rxn-container">
        <img
          className="rxn-img"
          alt="stars"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
        />
        <p className="rxn-para">{starsCount} stars</p>
      </div>
      <div className="rxn-container">
        <img
          className="rxn-img"
          alt="forks"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
        />
        <p className="rxn-para">{forksCount} forks</p>
      </div>
      <div className="rxn-container">
        <img
          className="rxn-img"
          alt="open issues"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
        />
        <p className="rxn-para">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
