import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const StartPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/test/list');
  };
  return (
    <Container>
      <InnerContainer>
        <img src="../../../public/images/testStartImg.png" />
        <ContBox>
          <span>이 테스트는 여러분의 관심사와 현재 상황을 파악해</span>
          <span>딱 맞는 프로그램을 추천하기 위한 퀴즈 입니다.</span>{' '}
          <span>솔직하게 체크해 주세요!</span>
        </ContBox>
      </InnerContainer>
      <button onClick={handleClick}>테스트 시작하기</button>
    </Container>
  );
};

export default StartPage;
const Container = styled.div`
  height: calc(100dvh - 72px);
  button {
    width: 90%;
    height: 50px;
    background-color: #fe6e6e;
    color: #ffffff;
    border-radius: 12px;
  }
`;
const InnerContainer = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  img {
    width: 70%;
  }
  p {
    color: #ffffff;
  }
`;
const ContBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #ffffff;
`;
