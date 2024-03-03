import {HiMiniFire} from 'react-icons/hi2'

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
  MainHeading,
  TitleContainer,
  ReactIconBackgroundColor,
} from '../StyledComponents'

import './index.css'

const SavedVideos = () => (
  <NxtContext.Consumer>
    {value => {
      const {dark, savedVideos} = value

      return (
        <NormalContainer>
          <Header />
          <div className="home-container">
            <Sidebar location="Saved videos" />
            <div className="home-info-container">
              <PremiumAd />
              <TrendingContainer data-testid="savedVideos" dark={dark}>
                {savedVideos.length === 0 ? (
                  <div className="exception-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                      alt="no saved videos"
                      className="exception-image"
                    />
                    <ErrHeading dark={dark}>No saved videos found</ErrHeading>
                    <ErrDescription dark={dark}>
                      You can save your videos while watching them
                    </ErrDescription>
                  </div>
                ) : (
                  <div className="trending-success-view-container">
                    <TitleContainer dark={dark}>
                      <ReactIconBackgroundColor dark={dark}>
                        <HiMiniFire
                          size={35}
                          color="#ff0000"
                          className="react-icon"
                        />
                      </ReactIconBackgroundColor>
                      <MainHeading dark={dark}>Saved Videos</MainHeading>
                    </TitleContainer>
                    <ul className="common-videos-list-container">
                      {savedVideos.map(eachItem => (
                        <VideoItemDetails
                          key={eachItem.id}
                          details={eachItem}
                          location="Saved videos"
                        />
                      ))}
                    </ul>
                  </div>
                )}
              </TrendingContainer>
            </div>
          </div>
        </NormalContainer>
      )
    }}
  </NxtContext.Consumer>
)

export default SavedVideos
