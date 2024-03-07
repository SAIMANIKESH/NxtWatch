import styled from 'styled-components'

export const Container1 = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: #0f0f0f;
`
export const Container2 = styled(Container1)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.dark ? '#212121' : '#f9f9f9')};
  width: 70vw;
  min-height: 100vh;
  padding: 5%;
  font-family: 'Roboto';
`
export const Container3 = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.dark ? '#181818' : '#f8fafc')};
  border-radius: 8px;
  box-shadow: 0px 8px 40px rgba(7, 7, 7, 0.08);
  padding: 5%;
  min-height: 60vh;
  width: 28vw;
`
export const Label = styled.label`
  margin-top: 22px;
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 13px;
  line-height: 16px;
  color: ${props => (props.dark ? '#ffffff' : '#64748b')};
`
export const Label1 = styled.label`
  font-weight: 500;
  margin-top: 2px;
  margin-left: 3px;
  font-size: 15px;
  width: 100%;
  color: ${props => (props.dark ? '#ffffff' : '#000000')};
`
export const Input = styled.input`
  font-size: 15px;
  height: 40px;
  border: 1px solid #d7dfe9;
  background-color: ${props => (props.dark ? '#ffffff' : '#e2e8f0')};
  color: #000000;
  border-radius: 3px;
  margin-top: 5px;
  padding: 8px 16px 8px;
  outline: none;
`
export const Button = styled.button`
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 14px;
  color: #ffffff;
  height: 40px;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 2px;
  background-color: #3b82f6;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  outline: none;
`
// ----> Normal Container **** --------------------------------------------------
export const NormalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000000;
  width: 95vw;
  height: 100%;
  font-family: 'Roboto';
  opacity: ${props => (props.activeOpacity ? 0.33 : 1)};
`
export const Navbar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 28px 3px 40px;
  width: 100%;
  background-color: ${props => (props.dark ? '#212121' : '#ffffff')};
`
export const HeaderButton = styled.button`
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 15px;
  color: ${props => (props.dark ? '#ffffff' : '#3b82f6')};
  padding: 7px 22px 7px;
  background-color: transparent;
  border-radius: 3px;
  border: 2px solid ${props => (props.dark ? '#ffffff' : '#3b82f6')};
  cursor: pointer;
  outline: none;
`
export const HeaderPopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 430px;
  height: 200px;
  border-radius: 10px;
  background-color: ${props => (props.dark ? '#231f20' : '#ffffff')};
`
export const HeaderPopupDescription = styled.p`
  font-family: 'Roboto';
  margin-top: 40px;
  font-size: 20px;
  color: ${props => (props.dark ? '#f9f9f9' : '#00306e')};
  line-height: 1.5;
`
export const CancelButton = styled.button`
  font-family: 'Roboto';
  text-align: center;
  background-color: transparent;
  border: 2px solid #94a3b8;
  border-radius: 3px;
  padding: 14px 23px 14px;
  color: #94a3b8;
  cursor: pointer;
  outline: none;
  font-size: 18px;
  font-weight: 500;
  margin-top: 20px;
  margin-right: 20px;
`
export const ConfirmButton = styled(CancelButton)`
  background-color: #3b82f6;
  border: none;
  padding: 15px 23px 15px;
  color: #ffffff;
  margin-left: 20px;
  margin-right: 0px;
`
export const TransparentButton = styled(HeaderButton)`
  color: ${props => (props.dark ? '#ffffff' : '#000000')};
  padding: 2px 0px 7px;
  border: none;
`
// ----> Home Container **** ----------------------------------------------------
export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.dark ? '#181818' : '#f9f9f9')};
  width: 100%;
  height: 10vh;
  padding: 21px 0px 30px 21px;
  overflow-y: auto;
  flex-grow: 1;
`
export const HomePopupContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  alt: 'Banner Background image';
  display: ${props => (props.display ? 'flex' : 'none')};
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2%;
`
export const SearchInput = styled.input`
  font-family: 'Roboto';
  color: ${props => (props.dark ? '#ffffff' : '#000000')};
  background-color: ${props => (props.dark ? 'transparent' : '#ffffff')};
  font-size: 16px;
  font-weight: 400;
  height: 38px;
  border: 2px solid ${props => (props.dark ? '#424242' : '#cbd5e1')};
  padding: 8px 16px 8px;
  outline: none;
  width: 42%;
`

export const SearchButton = styled.button`
  height: 38px;
  width: 83px;
  padding-top: 5px;
  background-color: ${props => (props.dark ? '#212121' : 'transparent')};
  color: ${props => (props.dark ? '#606060' : '#313131')};
  border: 2px solid ${props => (props.dark ? '#424242' : '#cbd5e1')};
  border-left: 1px solid ${props => (props.dark ? '#424242' : '#cbd5e1')};
  cursor: pointer;
  outline: none;
`
export const ErrHeading = styled.h1`
  color: ${props => (props.dark ? '#ffffff' : '#000000')};
  font-weight: ${props => (props.size ? '500' : '600')};
  font-size: ${props => (props.size ? '45px' : '30px')};
  margin-top: 45px;
  margin-bottom: 5px;
`
export const ErrDescription = styled.p`
  color: ${props => (props.dark ? '#94a3b8' : '#475569')};
  font-size: 20px;
  text-align: center;
  line-height: 1.5;
`
export const RetryButton = styled(HeaderButton)`
  align-self: center;
  color: #ffffff;
  margin-top: 4px;
  padding: 10px 25px 10px;
  background-color: #4f46e5;
  border: none;
`
export const VideoTitle = styled(ErrHeading)`
  font-weight: ${props => (props.bold ? '500' : '400')};
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 0px;
  margin-top: ${props => (props.space ? '16px' : '12px')};
  margin-top: ${props => props.mtTop};
  font-size: ${props => props.size};
`
export const VideoTitle1 = styled(VideoTitle)`
  font-weight: 500;
  font-size: 25px;
  width: 410px;
  margin-top: 0px;
`
export const Name = styled.p`
  color: ${props => (props.dark ? '#94a3b8' : '#475569')};
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
`
export const Details = styled.li`
  list-style-type: ${props => (props.disc ? 'disc' : 'none')};
  color: ${props => (props.dark ? '#94a3b8' : '#475569')};
  font-size: 17px;
  margin-right: 30px;
  margin-top: ${props => (props.space ? '5px' : '0px')};
`
export const Details1 = styled(Details)`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${props => (props.isActive ? '#2563eb' : '#64748b')};
`
// ----> Sidebar Container **** -------------------------------------------------
export const SidebarContainer = styled.div`
  background-color: ${props => (props.dark ? '#212121' : '#ffffff')};
  display: flex;
  flex-direction: column;
  height: 100vh; // 87vh, 89.5vh
  flex-grow: 1;
`
export const List = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${props => (props.isActive ? '#ff0000' : '')};
  color: ${props => props.inActiveLight};
  color: ${props => props.inActiveDark};
  background-color: ${props => props.activeDark};
  background-color: ${props => props.activeLight};
  padding: 0px 0px 0px 26px;
  height: 50px;
  width: 100%;
  border-radius: 1px;
`
export const Title = styled.p`
  color: ${props => props.activeLight};
  color: ${props => props.activeDark};
  color: ${props => props.inActiveLight};
  color: ${props => props.inActiveDark};
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
  font-size: ${props => (props.isActive ? '18px' : '17px')};
  margin-left: 25px;
`
export const ContactUsTitle = styled.h1`
  color: ${props => (props.dark ? '#ffffff' : '#1e293b')};
  font-weight: 500;
  font-size: 22px;
`
export const ContactUsDescription = styled.p`
  color: ${props => (props.dark ? '#ebebeb' : '#1e293b')};
  font-weight: 500;
  font-size: 19px;
  width: 220px;
  line-height: 1.5;
  margin-top: 10px;
`
export const TrendingContainer = styled(HomeContainer)`
  background-color: ${props => (props.dark ? '#0f0f0f' : '#f9f9f9')};
  padding: ${props => (props.spacing ? '21px 0px 0px 21px' : '0px')};
  padding: ${props => (props.extraSpacing ? '38px 12px 5px 30px' : '0px')};
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2.5% 0% 2.5% 6%;
  background-color: ${props => (props.dark ? '#181818' : '#f4f4f4')};
`

export const ReactIconBackgroundColor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
  border-radius: 50px;
  background-color: ${props => (props.dark ? '#000000' : '#e2e8f0')};
`
export const MainHeading = styled.h1`
  color: ${props => (!props.dark ? '#000000' : '#ffffff')};
  font-weight: bold;
  font-size: 35px;
  margin-left: 15px;
`
export const Hr = styled.hr`
  width: 100%;
  border-radius: 3px;
  border: 1.6px solid ${props => (props.dark ? '#475569' : '#ebebeb')};
`
export const ChannelName = styled(Name)`
  color: ${props => (!props.dark ? '#000000' : '#ffffff')};
`
export const SubscriberCount = styled.p`
  color: ${props => (props.dark ? '#94a3b8' : '#475569')};
  margin-top: 0px;
  margin-bottom: 0px;
`
export const VideoDescription = styled.p`
  color: ${props => (props.dark ? '#fbfbfb' : '#475569')};
  font-size: 18px;
  margin-top: 25px;
  margin-bottom: 80px;
  line-height: 1.5;
`
export const ActionButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  color: ${props => (props.isActive ? '#2563eb' : '#64748b')};
`
