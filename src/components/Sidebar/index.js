import {Component} from 'react'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {PiListPlusBold} from 'react-icons/pi'
import {Link} from 'react-router-dom'

import NxtContext from '../../context/NxtContext'
import {
  SidebarContainer,
  List,
  Title,
  ContactUsTitle,
  ContactUsDescription,
} from '../StyledComponents'

import './index.css'

const initialItemsList = [
  {
    id: 1,
    path: '/',
    image: <AiFillHome size={22} />,
    title: 'Home',
    isActive: null,
  },
  {
    id: 11,
    path: '/trending',
    image: <HiFire size={22} />,
    title: 'Trending',
    isActive: null,
  },
  {
    id: 111,
    path: '/gaming',
    image: <SiYoutubegaming size={22} />,
    title: 'Gaming',
    isActive: null,
  },
  {
    id: 1111,
    path: '/saved-videos',
    image: <PiListPlusBold size={22} />,
    title: 'Saved videos',
    isActive: null,
  },
]

class Sidebar extends Component {
  state = {itemsList: initialItemsList}

  componentDidMount() {
    const {location} = this.props

    this.setState(prevState => ({
      itemsList: prevState.itemsList.map(eachItem => {
        if (eachItem.title === location) {
          return {...eachItem, isActive: true}
        }
        return {...eachItem, isActive: false}
      }),
    }))
  }

  onClickItem = id => {
    this.setState(prevState => ({
      itemsList: prevState.itemsList.map(eachItem => {
        if (eachItem.id === id) {
          const updateIsActive = !eachItem.isActive
          return {...eachItem, isActive: updateIsActive}
        }
        return eachItem
      }),
    }))
  }

  render() {
    const {itemsList} = this.state

    return (
      <NxtContext.Consumer>
        {value => {
          const {dark} = value

          const renderListItems = prop => {
            const {id, path, title, image, isActive} = prop

            const backgroundColorActiveDark = dark && isActive ? '#424242' : ''
            const backgroundColorActiveLyt = !dark && isActive ? '#f1f5f9' : ''

            const textActiveDark = dark && isActive ? '#ffffff' : ''
            const textActiveLight = !dark && isActive ? '#000000' : ''
            const textInActiveDark = dark && !isActive ? '#ebebeb' : ''
            const textInactiveLight = !dark && !isActive ? '#1e293b' : ''

            const iconInactiveDark = dark && !isActive ? '#909090' : ''
            const iconInactiveLight = !dark && !isActive ? '#616e7c' : ''

            return (
              <Link to={path} className="link-item">
                <List
                  key={id}
                  dark={dark}
                  isActive={isActive}
                  inActiveDark={iconInactiveDark}
                  inActiveLight={iconInactiveLight}
                  activeDark={backgroundColorActiveDark}
                  activeLight={backgroundColorActiveLyt}
                >
                  {image}
                  <Title
                    dark={dark}
                    isActive={isActive}
                    activeDark={textActiveDark}
                    activeLight={textActiveLight}
                    inActiveDark={textInActiveDark}
                    inActiveLight={textInactiveLight}
                  >
                    {title}
                  </Title>
                </List>
              </Link>
            )
          }

          return (
            <SidebarContainer dark={dark}>
              <ul className="items-list-container">
                {itemsList.map(eachItem => renderListItems(eachItem, dark))}
              </ul>
              <div className="contacts-container">
                <ContactUsTitle dark={dark}>CONTACT US</ContactUsTitle>
                <ul className="contacts-list-container">
                  <li key="facebook" className="contact-list-item">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                      alt="facebook logo"
                      className="contacts-icon-image"
                    />
                  </li>
                  <li key="twitter" className="contact-list-item">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                      alt="twitter logo"
                      className="contacts-icon-image"
                    />
                  </li>
                  <li key="linkedIn" className="contact-list-item">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                      alt="linked in logo"
                      className="contacts-icon-image"
                    />
                  </li>
                </ul>
                <ContactUsDescription dark={dark}>
                  Enjoy! Now to see your channels and recommendations!
                </ContactUsDescription>
              </div>
            </SidebarContainer>
          )
        }}
      </NxtContext.Consumer>
    )
  }
}

export default Sidebar
