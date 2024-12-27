import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Nav>
        <Logo onClick={() => navigate('/')}>
          <img src="/images/logo.png" alt="logo" />
          <h1>EMBER</h1>
        </Logo>
        <img src="/images/user.png" alt="user" />
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  position: fixed;
  height: 72px;
  width: 100%;
  background-color: black;
  padding: 16px 20px;
  box-sizing: border-box;
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  h1 {
    margin-top: 10px;
    margin-left: 8px;
    font-weight: 600;
    font-size: 25px;
    color: white;
  }
`;
