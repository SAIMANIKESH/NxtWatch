import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'

import NxtContext from '../../context/NxtContext'
import {VideoTitle, VideoTitle1, Name, Details} from '../StyledComponents'

import './index.css'

const VideoItemDetails = props => {
  const {details, location} = props

  const renderHomeView = dark => {
    const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = details
    const {name, profileImageUrl} = channel

    const formatDistance = formatDistanceToNow(new Date(publishedAt)).split(' ')
    const timeGap = `${formatDistance[1]} ${formatDistance[2]} ago`

    return (
      <Link to={`/videos/${id}`} className="link-item">
        <li className="video-list-item-container">
          <img
            src={thumbnailUrl}
            alt="video thumbnail"
            className="thumbnail-img"
          />
          <div className="video-detail-container">
            <img
              src={profileImageUrl}
              alt="channel logo"
              className="channel-img"
            />
            <div className="video-info-container">
              <VideoTitle dark={dark}>{title}</VideoTitle>
              <Name dark={dark}>{name}</Name>
              <ul className="video-list-container">
                <Details key="views" dark={dark}>
                  {viewCount} views
                </Details>
                <Details key="published at" dark={dark} disc>
                  {timeGap}
                </Details>
              </ul>
            </div>
          </div>
        </li>
      </Link>
    )
  }

  const renderCommonView = dark => {
    const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = details
    const {name} = channel

    const formatDistance = formatDistanceToNow(new Date(publishedAt)).split(' ')
    const timeGap = `${formatDistance[1]} ${formatDistance[2]} ago`

    return (
      <Link to={`/videos/${id}`} className="link-item">
        <li className="common-video-list-item-container">
          <img
            src={thumbnailUrl}
            alt="video thumbnail"
            className="common-thumbnail-img"
          />
          <div className="common-video-info-container">
            <VideoTitle1 dark={dark}>{title}</VideoTitle1>
            <Name dark={dark}>{name}</Name>
            <ul className="video-list-container">
              <Details key="views" dark={dark}>
                {viewCount} views
              </Details>
              <Details key="published at" dark={dark} disc>
                {timeGap}
              </Details>
            </ul>
          </div>
        </li>
      </Link>
    )
  }

  const renderGamingView = dark => {
    const {id, title, thumbnailUrl, viewCount} = details

    return (
      <Link to={`/videos/${id}`} className="link-item">
        <li className="gaming-video-list-item-container">
          <img
            src={thumbnailUrl}
            alt="video thumbnail"
            className="gaming-thumbnail-img"
          />
          <div className="video-info-container">
            <VideoTitle dark={dark} bold space>
              {title}
            </VideoTitle>
            <ul className="video-list-container">
              <Details key="views" dark={dark} space>
                {viewCount} Watching Worldwide
              </Details>
            </ul>
          </div>
        </li>
      </Link>
    )
  }

  const renderSpecificView = dark => {
    switch (location) {
      case 'Home':
        return renderHomeView(dark)
      case 'Trending':
        return renderCommonView(dark)
      case 'Gaming':
        return renderGamingView(dark)
      case 'Saved videos':
        return renderCommonView(dark)
      default:
        return null
    }
  }

  return (
    <NxtContext.Consumer>
      {value => {
        const {dark} = value

        return renderSpecificView(dark)
      }}
    </NxtContext.Consumer>
  )
}

export default VideoItemDetails
