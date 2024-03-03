import React from 'react'

const NxtContext = React.createContext({
  dark: '',
  display: '',
  // activeOpacity: '',
  savedVideos: [],
  likedVideos: [],
  dislikedVideos: [],
  saveVideo: () => {},
  likeVideo: () => {},
  changeTheme: () => {},
  dislikeVideo: () => {},
  closePremiumAd: () => {},
  // opacityBackground: () => {},
})

export default NxtContext
