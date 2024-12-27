import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';
import listStore from '../../store/listStore';
const Progressbar = () => {
  const { page } = listStore();
  return (
    <Container>
      <IconBox>
        <IoIosArrowBack />
      </IconBox>
      <ProgressContainer>
        {Array.from({ length: 10 }).map((_, index) => (
          <Circle key={index} isActive={index <= page} />
        ))}
      </ProgressContainer>
    </Container>
  );
};

export default Progressbar;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconBox = styled.span`
  color: white;
  svg {
    width: 30px;
    height: 35px;
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  margin: 0 20px;
  gap: 8px;
  position: relative;
  left: -7px;
`;

const Circle = styled.div`
  width: ${({ isActive }) => (isActive ? '10px' : '5px')};
  aspect-ratio: 1/1;
  border-radius: 50%;
  border: ${({ isActive }) => (isActive ? 'none' : '2px solid #444')};
  background-color: ${({ isActive }) => (isActive ? '#FE6E6E' : 'black')};
  transition: background-color 0.3s ease, border 0.3s ease;
`;
