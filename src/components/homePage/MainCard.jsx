import { useState } from 'react';
import styled from 'styled-components';
const MainCard = () => {
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  const renderData = !isTestCompleted ? (
    <Container>
      <h1>잃어버린 도전과 열정을 되찾아 보세요!</h1>
      <p>테스트 결과를 통해 내게 꼭 필요한 정보들을 알려줘요.</p>
      <button>되찾으러 가기</button>
    </Container>
  ) : (
    <OuterBox>
      <h1>이번주 이런 도전은 어때요?</h1>
      <ImgBox>
        <img
          style={{ width: '100%', height: '100%', borderRadius: '12px' }}
          src={'../../../public/images/examImg.png'}
        />
      </ImgBox>
      <button>
        새로운 도전들 추천받기
        <img
          className="maincard__img"
          src="../../../public/images/rightArrow.png"
        />
      </button>
    </OuterBox>
  );

  return renderData;
};

const Container = styled.div`
  width: 90%;
  box-sizing: border-box;
  border: 1px solid #fe6e6e;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 16px 12px;
  border-radius: 12px;
  color: #ffffff;
  h1 {
    font-size: 1rem;
    margin: 0%;
  }
  p {
    font-size: 0.8rem;
    margin: 0;
    margin-top: 12px;
  }
  button {
    color: white;
    width: 100%;
    border-radius: 12px;
    background-color: #fe6e6e;
    height: 50px;
    border: none;
    margin-top: 40px;
  }
`;

const OuterBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  color: #ffffff;

  h1 {
    font-size: 1rem;
    margin: 0%;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 31px;
    border-radius: 8px;
    border: none;
    background-color: #fff5a0;
    color: #000000;
    padding: 9px 12px;
    font-size: 0.7rem;
  }
  .maincard__img {
    width: 8%;
  }
`;
const ImgBox = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  border: 1px solid #fe6e6e;
`;

export default MainCard;
