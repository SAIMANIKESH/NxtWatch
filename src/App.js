import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Gaming from './components/Gaming'
import NotFound from './components/NotFound'
import Trending from './components/Trending'
import NxtContext from './context/NxtContext'
import SavedVideos from './components/SavedVideos'
import ProtectedRoute from './components/ProtectedRoute'
import SpecificVideoIdDetails from './components/SpecificVideoIdDetails'
import {Container1} from './components/StyledComponents'

import './App.css'

// Replace your code here

class App extends Component {
  state = {
    dark: false,
    display: true,
    savedVideos: [],
    likedVideos: [],
    dislikedVideos: [],
    // activeOpacity: false,
  }

  changeTheme = () => {
    this.setState(prevState => ({dark: !prevState.dark}))
  }

  closePremiumAd = () => {
    this.setState({display: false})
  }

  /* opacityBackground = () => {
    this.setState(prevState => ({activeOpacity: !prevState.activeOpacity}))
  } */

  saveVideo = video => {
    const {savedVideos} = this.state

    const isSaved = savedVideos.filter(eachItem => eachItem.id === video.id)

    if (isSaved.length === 0) {
      this.setState(prevState => ({
        savedVideos: [...prevState.savedVideos, video],
      }))
    } else {
      const updateSavedVideos = savedVideos.filter(
        eachItem => eachItem.id !== video.id,
      )
      this.setState({savedVideos: updateSavedVideos})
    }
  }

  likeVideo = video => {
    const {likedVideos, dislikedVideos} = this.state

    const isLiked = likedVideos.filter(eachItem => eachItem.id === video.id)
    const isDisliked = dislikedVideos.filter(
      eachItem => eachItem.id === video.id,
    )

    if (isLiked.length === 0 && isDisliked.length === 0) {
      this.setState(prevState => ({
        likedVideos: [...prevState.likedVideos, video],
      }))
    } else if (isLiked.length === 0 && isDisliked.length !== 0) {
      const updateDislikedVideos = dislikedVideos.filter(
        eachItem => eachItem.id !== video.id,
      )
      this.setState(prevState => ({
        dislikedVideos: updateDislikedVideos,
        likedVideos: [...prevState.likedVideos, video],
      }))
    } else {
      const updateLikedVideos = likedVideos.filter(
        eachItem => eachItem.id !== video.id,
      )
      this.setState({likedVideos: updateLikedVideos})
    }
  }

  dislikeVideo = video => {
    const {likedVideos, dislikedVideos} = this.state

    const isLiked = likedVideos.filter(eachItem => eachItem.id === video.id)
    const isDisliked = dislikedVideos.filter(
      eachItem => eachItem.id === video.id,
    )

    if (isLiked.length === 0 && isDisliked.length === 0) {
      this.setState(prevState => ({
        dislikedVideos: [...prevState.dislikedVideos, video],
      }))
    } else if (isLiked.length !== 0 && isDisliked.length === 0) {
      const updateLikedVideos = likedVideos.filter(
        eachItem => eachItem.id !== video.id,
      )
      this.setState(prevState => ({
        likedVideos: updateLikedVideos,
        dislikedVideos: [...prevState.dislikedVideos, video],
      }))
    } else {
      const updateDislikedVideos = dislikedVideos.filter(
        eachItem => eachItem.id !== video.id,
      )
      this.setState({dislikedVideos: updateDislikedVideos})
    }
  }

  render() {
    const {
      dark,
      display,
      savedVideos,
      likedVideos,
      dislikedVideos,
      // activeOpacity,
    } = this.state

    return (
      <NxtContext.Provider
        value={{
          dark,
          display,
          savedVideos,
          likedVideos,
          dislikedVideos,
          // activeOpacity,
          saveVideo: this.saveVideo,
          likeVideo: this.likeVideo,
          changeTheme: this.changeTheme,
          dislikeVideo: this.dislikeVideo,
          closePremiumAd: this.closePremiumAd,
          // opacityBackground: this.opacityBackground,
        }}
      >
        <Container1 dark={dark}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={SpecificVideoIdDetails}
            />
            <ProtectedRoute exact path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </Container1>
      </NxtContext.Provider>
    )
  }
}

export default App
