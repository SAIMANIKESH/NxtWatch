import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiFire} from 'react-icons/hi'

import Header from '../Header'
import Sidebar from '../Sidebar'
import PremiumAd from '../PremiumAd'
import VideoItemDetails from '../VideoItemDetails'
import NxtContext from '../../context/NxtContext'
import {
  NormalContainer,
  TrendingContainer,
  ErrHeading,
  ErrDescription,
  RetryButton,
  MainHeading,
  TitleContainer,
  ReactIconBackgroundColor,
} from '../StyledComponents'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Trending extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosList: [],
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const token = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/videos/trending'
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
      <div className="trending-success-view-container">
        <TitleContainer dark={dark}>
          <ReactIconBackgroundColor dark={dark}>
            <HiFire size={35} color="#ff0000" className="react-icon" />
          </ReactIconBackgroundColor>
          <MainHeading dark={dark}>Trending</MainHeading>
        </TitleContainer>
        <ul className="common-videos-list-container">
          {videosList.map(eachItem => (
            <VideoItemDetails
              key={eachItem.id}
              details={eachItem}
              location="Trending"
            />
          ))}
        </ul>
      </div>
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
    // const {} = this.state

    return (
      <NxtContext.Consumer>
        {value => {
          const {dark} = value

          return (
            <NormalContainer>
              <Header />
              <div className="home-container">
                <Sidebar location="Trending" />
                <div className="home-info-container">
                  <PremiumAd />
                  <TrendingContainer data-testid="trending" dark={dark}>
                    {this.renderSpecificView(dark)}
                  </TrendingContainer>
                </div>
              </div>
            </NormalContainer>
          )
        }}
      </NxtContext.Consumer>
    )
  }
}

export default Trending
