import styled from 'styled-components';

export default function HashTags() {
  return (
    <Wrapper>
      <h2>사업 이름</h2>
      <HashTag></HashTag>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid #fff5a0;
  padding: 16px 12px;
  border-radius: 12px;
  width: 80%;

  h2 {
    font-size: 15px;
    font-weight: 600;
    color: white;
  }
`;

const HashTag = styled.div``;
