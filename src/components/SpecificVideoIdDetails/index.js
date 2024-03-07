import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import ReactPlayer from 'react-player'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {PiListPlusBold} from 'react-icons/pi'

import Header from '../Header'
import Sidebar from '../Sidebar'
import PremiumAd from '../PremiumAd'
import NxtContext from '../../context/NxtContext'
import {
  NormalContainer,
  TrendingContainer,
  ErrHeading,
  ErrDescription,
  RetryButton,
  VideoTitle,
  Details,
  Details1,
  Hr,
  ChannelName,
  SubscriberCount,
  VideoDescription,
  ActionButton,
} from '../StyledComponents'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class SpecificVideoDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videoDetails: {},
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const formattedData = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
      }

      this.setState({
        apiStatus: apiStatusConstants.success,
        videoDetails: formattedData,
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

  renderSuccessView = value => {
    const {videoDetails} = this.state

    const {
      dark,
      savedVideos,
      likedVideos,
      dislikedVideos,
      saveVideo,
      likeVideo,
      dislikeVideo,
    } = value

    const onClickLike = () => likeVideo(videoDetails)
    const onClickDislike = () => dislikeVideo(videoDetails)
    const onClickSave = () => saveVideo(videoDetails)

    const isLiked = likedVideos.filter(
      eachItem => eachItem.id === videoDetails.id,
    )
    const isDisliked = dislikedVideos.filter(
      eachItem => eachItem.id === videoDetails.id,
    )
    const isSaved = savedVideos.filter(
      eachItem => eachItem.id === videoDetails.id,
    )
    console.log(isSaved.length)

    const {
      title,
      videoUrl,
      channel,
      viewCount,
      publishedAt,
      description,
    } = videoDetails
    const {name, profileImageUrl, subscriberCount} = channel

    const formatDistance = formatDistanceToNow(new Date(publishedAt)).split(' ')
    const timeGap = `${formatDistance[1]} ${formatDistance[2]} ago`

    return (
      <TrendingContainer
        data-testid="videoItemDetails"
        dark={dark}
        extraSpacing
      >
        <div className="react-player-container">
          <ReactPlayer url={videoUrl} height="600px" width="99.5%" controls />
        </div>
        <div className="video-info-container">
          <VideoTitle dark={dark} mtTop="20px" size="20px" space>
            {title}
          </VideoTitle>
          <ul className="video-item-list-container">
            <div className="likes-container">
              <Details1 key="views" dark={dark}>
                {viewCount} views
              </Details1>
              <Details key="published at" dark={dark} disc>
                {timeGap}
              </Details>
            </div>
            <div className="likes-container">
              <Details1 key="like">
                <ActionButton
                  type="button"
                  onClick={onClickLike}
                  isActive={isLiked.length !== 0}
                >
                  <AiOutlineLike size={20} />
                  <p className="action-title">Like</p>
                </ActionButton>
              </Details1>
              <Details1 key="dislike">
                <ActionButton
                  type="button"
                  onClick={onClickDislike}
                  isActive={isDisliked.length !== 0}
                >
                  <AiOutlineDislike size={20} />
                  <p className="action-title">Dislike</p>
                </ActionButton>
              </Details1>
              <Details1 key="save">
                <ActionButton
                  type="button"
                  onClick={onClickSave}
                  isActive={isSaved.length !== 0}
                >
                  <PiListPlusBold size={20} />
                  <p className="action-title">
                    {isSaved.length !== 0 ? 'Saved' : 'Save'}
                  </p>
                </ActionButton>
              </Details1>
            </div>
          </ul>
          <Hr dark={dark} />
          <div className="video-item-detail-container">
            <img
              src={profileImageUrl}
              alt="channel logo"
              className="video-channel-img"
            />
            <div className="video-item-info-container">
              <ChannelName dark={dark}>{name}</ChannelName>
              <SubscriberCount dark={dark}>
                {subscriberCount} subscribers
              </SubscriberCount>
              <VideoDescription dark={dark}>{description}</VideoDescription>
            </div>
          </div>
        </div>
      </TrendingContainer>
    )
  }

  renderSpecificView = value => {
    const {dark} = value
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView(dark)
      case apiStatusConstants.failure:
        return this.renderFailureView(dark)
      case apiStatusConstants.success:
        return this.renderSuccessView(value)
      default:
        return null
    }
  }

  render() {
    return (
      <NxtContext.Consumer>
        {value => {
          const {dark} = value

          return (
            <NormalContainer>
              <Header />
              <div className="home-container">
                <Sidebar location="None" />
                <div className="home-info-container">
                  <PremiumAd />
                  <TrendingContainer data-testid="videoItemDetails" dark={dark}>
                    {this.renderSpecificView(value)}
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

export default SpecificVideoDetails
