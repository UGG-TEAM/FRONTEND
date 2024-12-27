import styled from 'styled-components';

export default function HashTags() {
  return (
    <Wrapper>
      <h2>사업 이름</h2>
      <HashTagWrapper>
        <HashTag>#해시태그</HashTag>
        <HashTag>#해시태그</HashTag>
        <HashTag>#해시태그</HashTag>
        <HashTag>#해시태그</HashTag>
      </HashTagWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-sizing: border-box;
  border: 1px solid #fff5a0;
  padding: 16px 12px;
  border-radius: 12px;
  width: 100%;

  h2 {
    width: 100%;
    text-align: left;
    font-size: 15px;
    font-weight: 600;
    color: white;
    margin-bottom: 12px;
  }
`;

const HashTagWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const HashTag = styled.div`
  border-radius: 100px;
  background-color: #4c4c4c;
  width: 77px;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 13px;
`;
