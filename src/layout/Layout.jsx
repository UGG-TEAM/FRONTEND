import Header from './Navbar';
import { Outlet } from 'react-router-dom';
import { MainContainer } from '../styles/MainContainer';
export default function Layout() {
  return (
    <>
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
}
