import Loader from 'react-loader-spinner'
import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    repoList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getReposList()
  }

  onApiSuccess = data => {
    this.setState({
      repoList: data,
      apiStatus: apiStatusConstants.success,
    })
  }

  onApiFailure = response => {
    console.log(response)
    this.setState({
      apiStatus: apiStatusConstants.failure,
    })
  }

  getReposList = async () => {
    try {
      this.setState({
        apiStatus: apiStatusConstants.inProgress,
      })
      const {activeLanguageId} = this.state
      const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
      const response = await fetch(apiUrl)

      if (response.ok) {
        const data = await response.json()
        const formattedData = data.popular_repos.map(object => ({
          id: object.id,
          name: object.name,
          issuesCount: object.issues_count,
          forksCount: object.forks_count,
          starsCount: object.stars_count,
          avatarUrl: object.avatar_url,
        }))
        this.onApiSuccess(formattedData)
      } else {
        this.onApiFailure(response)
      }
    } catch (error) {
      this.onApiFailure(error)
    }
  }

  handleActiveLanguage = id => {
    this.setState(
      {
        activeLanguageId: id,
      },
      this.getReposList,
    )
  }

  renderLanguageList = () => {
    const {activeLanguageId} = this.state
    return (
      <ul className="language-list-container">
        {languageFiltersData.map(object => (
          <LanguageFilterItem
            key={object.id}
            item={object}
            handleActiveLanguage={this.handleActiveLanguage}
            activeLanguageId={activeLanguageId}
          />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepoList = () => {
    const {repoList} = this.state
    return (
      <ul className="repo-list-container">
        {repoList.map(object => (
          <RepositoryItem key={object.id} item={object} />
        ))}
      </ul>
    )
  }

  renderDataFailure = () => (
    <div className="failure-img-container">
      <img
        className="failure-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
      <p className="failure-para">Something Went Wrong</p>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    return (
      <div className="bg-container">
        <h1 className="title">Popular</h1>
        {this.renderLanguageList()}
        {(() => {
          switch (apiStatus) {
            case apiStatusConstants.inProgress:
              return this.renderLoader()

            case apiStatusConstants.success:
              return this.renderRepoList()

            case apiStatusConstants.failure:
              return this.renderDataFailure()

            default:
              return null
          }
        })()}
      </div>
    )
  }
}

export default GithubPopularRepos
