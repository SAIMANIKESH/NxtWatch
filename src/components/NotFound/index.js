import Header from '../Header'
import PremiumAd from '../PremiumAd'
import Sidebar from '../Sidebar'
import NxtContext from '../../context/NxtContext'
import {
  NormalContainer,
  HomeContainer,
  ErrHeading,
  ErrDescription,
} from '../StyledComponents'

import './index.css'

const NotFound = () => (
  <NxtContext.Consumer>
    {value => {
      const {dark} = value

      const image = dark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      return (
        <NormalContainer>
          <Header />
          <div className="home-container">
            <Sidebar location="NotFound" />
            <div className="home-info-container">
              <PremiumAd />
              <HomeContainer data-testid="notFound" dark={dark}>
                <div className="not-found-page">
                  <img src={image} alt="not found" className="not-found-img" />
                  <ErrHeading dark={dark} size>
                    Page Not Found
                  </ErrHeading>
                  <ErrDescription dark={dark}>
                    We are sorry, the page you requested could not be found
                  </ErrDescription>
                </div>
              </HomeContainer>
            </div>
          </div>
        </NormalContainer>
      )
    }}
  </NxtContext.Consumer>
)

export default NotFound
