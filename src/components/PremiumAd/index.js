import {IoIosClose} from 'react-icons/io'

import NxtContext from '../../context/NxtContext'
import {HomePopupContainer} from '../StyledComponents'

import './index.css'

const PremiumAd = () => (
  <NxtContext.Consumer>
    {value => {
      const {display, closePremiumAd} = value

      const onClickClose = () => {
        closePremiumAd()
      }

      return (
        <HomePopupContainer data-testid="banner" display={display}>
          <div className="home-popup-info-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="nxt watch logo"
              className="banner-logo-image"
            />
            <p className="home-upi-description">
              Buy Nxt Watch Premium prepaid plans with UPI
            </p>
            <button type="button" className="get-now-button">
              GET IT NOW
            </button>
          </div>
          <button
            data-testid="close"
            type="button"
            onClick={onClickClose}
            className="close-button"
          >
            {' '}
            <IoIosClose size={40} />
          </button>
        </HomePopupContainer>
      )
    }}
  </NxtContext.Consumer>
)

export default PremiumAd
