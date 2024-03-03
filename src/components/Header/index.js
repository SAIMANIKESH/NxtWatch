import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {FiSun, FiLogOut} from 'react-icons/fi'
import {FaMoon} from 'react-icons/fa6'
import {IoMenu} from 'react-icons/io5'
import Popup from 'reactjs-popup'

import NxtContext from '../../context/NxtContext'
import {
  Navbar,
  HeaderButton,
  TransparentButton,
  HeaderPopupContainer,
  HeaderPopupDescription,
  CancelButton,
  ConfirmButton,
} from '../StyledComponents'

import './index.css'

const Header = props => {
  const onClickConfirm = () => {
    const {history} = props

    Cookies.remove('jwtToken')
    history.replace('/login')
  }

  const onClickMenu = () => {}

  return (
    <NxtContext.Consumer>
      {value => {
        const {dark, changeTheme} = value

        const onClickLogout = () => {}

        const image = !dark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

        const onClickTheme = () => {
          changeTheme()
        }

        return (
          <Navbar dark={dark}>
            <Link to="/" className="link-item">
              <img
                src={image}
                alt="website logo"
                className="header-nxt-watch-logo-img"
              />
            </Link>
            <ul className="header list-container">
              <li className="list-item">
                <TransparentButton
                  data-testid="theme"
                  type="button"
                  onClick={onClickTheme}
                  dark={dark}
                >
                  {dark && <FiSun size={32} />}
                  {!dark && <FaMoon size={32} />}
                </TransparentButton>
              </li>
              <ul className="small list-container">
                <li className="list-item">
                  <TransparentButton
                    type="button"
                    onClick={onClickMenu}
                    dark={dark}
                  >
                    <IoMenu size={15} />
                  </TransparentButton>
                </li>
                <li className="list-item">
                  <Popup
                    modal
                    trigger={
                      <HeaderButton
                        type="button"
                        onClick={onClickLogout}
                        dark={dark}
                      >
                        <FiLogOut size={15} />
                      </HeaderButton>
                    }
                  >
                    {close => (
                      <HeaderPopupContainer dark={dark}>
                        <HeaderPopupDescription dark={dark}>
                          Are you sure you want to logout?
                        </HeaderPopupDescription>
                        <div>
                          <CancelButton type="button" onClick={() => close()}>
                            Cancel
                          </CancelButton>
                          <ConfirmButton type="button" onClick={onClickConfirm}>
                            Confirm
                          </ConfirmButton>
                        </div>
                      </HeaderPopupContainer>
                    )}
                  </Popup>
                </li>
              </ul>
              <ul className="large list-container">
                <li className="list-item">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    className="profile-image"
                  />
                </li>
                <li className="list-item">
                  <Popup
                    modal
                    trigger={
                      <HeaderButton
                        type="button"
                        onClick={onClickLogout}
                        dark={dark}
                      >
                        Logout
                      </HeaderButton>
                    }
                  >
                    {close => (
                      <HeaderPopupContainer dark={dark}>
                        <HeaderPopupDescription dark={dark}>
                          Are you sure you want to logout?
                        </HeaderPopupDescription>
                        <div>
                          <CancelButton type="button" onClick={() => close()}>
                            Cancel
                          </CancelButton>
                          <ConfirmButton type="button" onClick={onClickConfirm}>
                            Confirm
                          </ConfirmButton>
                        </div>
                      </HeaderPopupContainer>
                    )}
                  </Popup>
                </li>
              </ul>
            </ul>
          </Navbar>
        )
      }}
    </NxtContext.Consumer>
  )
}

export default withRouter(Header)
