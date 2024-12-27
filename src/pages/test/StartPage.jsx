import styled from 'styled-components';
const StartPage = () => {
  return (
    <Container>
      <InnerContainer></InnerContainer>
      <button>테스트 시작하기</button>
    </Container>
  );
};

export default StartPage;
const Container = styled.div`
  height: calc(100dvh);
`;
const InnerContainer = styled.div``;
