import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoIosSearch} from 'react-icons/io'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Sidebar from '../Sidebar'
import PremiumAd from '../PremiumAd'
import VideoItemDetails from '../VideoItemDetails'
import NxtContext from '../../context/NxtContext'
import {
  NormalContainer,
  HomeContainer,
  SearchInput,
  SearchButton,
  ErrHeading,
  ErrDescription,
  RetryButton,
} from '../StyledComponents'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    videosList: [],
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const {searchInput} = this.state
    const token = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const formattedData = data.videos.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        thumbnailUrl: eachItem.thumbnail_url,
        channel: {
          name: eachItem.channel.name,
          profileImageUrl: eachItem.channel.profile_image_url,
        },
        viewCount: eachItem.view_count,
        publishedAt: eachItem.published_at,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        videosList: formattedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickSearch = () => {
    this.getVideoDetails()
  }

  onPressEnter = event => {
    if (event.key === 'Enter') {
      this.getVideoDetails()
    }
  }

  renderLoadingView = dark => (
    <div data-testid="loader" className="loader-container">
      <Loader
        type="ThreeDots"
        color={dark ? '#ffffff' : '#000000'}
        height="50"
        width="50"
      />
    </div>
  )

  onClickRetry = () => {
    this.getVideoDetails()
  }

  renderFailureView = dark => {
    const errImage = dark
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

    return (
      <div className="exception-container">
        <img alt="failure view" src={errImage} className="exception-image" />
        <ErrHeading dark={dark}>Oops! Something Went Wrong</ErrHeading>
        <ErrDescription dark={dark}>
          We are having some trouble to complete your request. <br />
          Please try again.
        </ErrDescription>
        <RetryButton type="button" onClick={this.onClickRetry}>
          Retry
        </RetryButton>
      </div>
    )
  }

  renderSuccessView = dark => {
    const {videosList} = this.state

    return (
      <>
        {videosList.length === 0 ? (
          <div className="exception-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
              className="exception-image"
            />
            <ErrHeading dark={dark}>No Search results found</ErrHeading>
            <ErrDescription dark={dark}>
              Try different key words or remove search filter.
            </ErrDescription>
            <RetryButton
              type="button"
              onClick={this.onClickRetry}
              className="retry-button"
            >
              Retry
            </RetryButton>
          </div>
        ) : (
          <ul className="videos-list-container">
            {videosList.map(eachItem => (
              <VideoItemDetails
                key={eachItem.id}
                details={eachItem}
                location="Home"
              />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderSpecificView = dark => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView(dark)
      case apiStatusConstants.failure:
        return this.renderFailureView(dark)
      case apiStatusConstants.success:
        return this.renderSuccessView(dark)
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <NxtContext.Consumer>
        {value => {
          const {dark} = value

          return (
            <NormalContainer>
              <Header />
              <div className="home-container">
                <Sidebar location="Home" />
                <div className="home-info-container">
                  <PremiumAd />
                  <HomeContainer data-testid="home" dark={dark}>
                    <div className="search-input-container">
                      <SearchInput
                        type="search"
                        value={searchInput}
                        onChange={this.onChangeSearch}
                        onKeyDown={this.onPressEnter}
                        placeholder="Search"
                        dark={dark}
                      />
                      <SearchButton
                        data-testid="searchButton"
                        type="button"
                        onClick={this.onClickSearch}
                        dark={dark}
                      >
                        <IoIosSearch size={18} />
                      </SearchButton>
                    </div>
                    {this.renderSpecificView(dark)}
                  </HomeContainer>
                </div>
              </div>
            </NormalContainer>
          )
        }}
      </NxtContext.Consumer>
    )
  }
}

export default Home
