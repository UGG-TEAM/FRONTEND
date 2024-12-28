import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function HashTags({ hashtag }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  console.log(hashtag);

  const handleToggle = () => {
    setIsOpen((prev) => !prev); // 클릭 시 상태 반전
  };

  return (
    <Wrapper $isOpen={isOpen} onClick={handleToggle}>
      <h2>{hashtag.title}</h2>
      <HashTagWrapper>
        {hashtag.region !== 'NULL' && <HashTag>#{hashtag.region}</HashTag>}
        {hashtag.category !== 'NULL' && <HashTag>#{hashtag.category}</HashTag>}
        {hashtag.target !== 'NULL' && <HashTag>#{hashtag.target}</HashTag>}
        {hashtag.type !== 'NULL' && <HashTag>#{hashtag.type}</HashTag>}
      </HashTagWrapper>
      <Details $isOpen={isOpen}>
        <p>{hashtag.content}</p>
      </Details>
      <Button
        onClick={() => (window.location.href = 'https://www.pie-edu.com')}
        $isOpen={isOpen}
      >
        바로가기
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-sizing: border-box;
  border: 1px solid ${({ $isOpen }) => ($isOpen ? '#FE6E6E' : '#fff5a0')}; // 열릴 때 border 색 변경
  padding: 16px 12px;
  border-radius: 12px;
  width: 100%;
  cursor: pointer;
  transition: border-color 0.3s ease; // border 색 전환 애니메이션

  h2 {
    width: 100%;
    text-align: left;
    font-size: 15px;
    line-height: 22px;
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
  padding: 2px 12px;
  border-radius: 100px;
  background-color: #4c4c4c;
  min-width: 50px;
  width: auto !important;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 10px;
`;

const Details = styled.div`
  height: 200px;
  overflow-y: scroll;
  margin-top: ${({ $isOpen }) =>
    $isOpen ? '12px' : '0'}; // 열릴 때 margin-top 추가
  max-height: ${({ $isOpen }) => ($isOpen ? '100px' : '0')}; // 높이 애니메이션
  transition: max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease; // 부드러운 전환 효과
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)}; // 투명도 전환

  p {
    overflow-y: auto;
    color: white;
    font-size: 13px;
    line-height: 19px;
  }
`;

const Button = styled.button`
  border: none;
  background-color: #fe6e6e;
  color: white;
  font-size: 15px;
  font-weight: 600;
  border-radius: 12px;
  padding: ${({ $isOpen }) =>
    $isOpen ? '8px 16px' : '0'}; // 열릴 때 padding 추가
  width: 100%;
  margin-top: ${({ $isOpen }) => ($isOpen ? '12px' : '0')}; // 열릴 때 margin
  cursor: pointer;
  max-height: ${({ $isOpen }) => ($isOpen ? '100px' : '0')}; // 높이 애니메이션
  transition: max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease,
    padding-top 0.3s ease; // 부드러운 전환 효과
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)}; // 투명도 전환
`;
