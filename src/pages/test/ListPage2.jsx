import styled from 'styled-components';
import { useState, useEffect } from 'react';
import datas from '../../constant/testData';
import Progressbar from './Progressbar';
import listStore from '../../store/listStore';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../apis/test/apis';
const QusData = [
  'most_needed',
  'needed_help_field',
  'residence_area',
  'program_method',
  'participation_period',
  'current_activity',
  'activity_type',
  'learning_method',
  'expected_result',
  'additional_support',
];

const ListPage2 = () => {
  const [answers, setAnswers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { page, nextPage } = listStore();
  const navigate = useNavigate();
  const choicedAns = (idx) => {
    if (page < 10) {
      const newAnswers = [...answers];
      newAnswers.push({
        question: datas[page].qus,
        answer: datas[page].ans[idx],
      });
      setAnswers(newAnswers);
      setIsDropdownOpen(false);
      if (page < 9) nextPage();
    }
    if (page === 9) {
      console.log(answers);
      console.log('pageL:', page);
    }
  };
  useEffect(() => {
    if (answers.length === 10) {
      const sendData = { user_id: 0 };

      QusData.forEach((key, index) => {
        sendData[key] = answers[index]?.answer || null;
      });
      console.log(sendData);

      (async () => {
        await postData(sendData);
        navigate('/test/result');
      })();
    }
  }, [answers]);
  return (
    <Container>
      <Progressbar />
      <QuestionBox>
        <Qus>
          <span>{datas[page]?.qus}</span>
        </Qus>
      </QuestionBox>
      <AnsBox>
        {page === 2 ? (
          <Dropdown>
            <DropdownHeader onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              지역을 선택하세요
            </DropdownHeader>
            <DropdownList isOpen={isDropdownOpen}>
              {datas[page]?.ans.map((location, index) => (
                <DropdownItem key={index} onClick={() => choicedAns(index)}>
                  {location}
                </DropdownItem>
              ))}
            </DropdownList>
          </Dropdown>
        ) : (
          datas[page]?.ans.map((e, idx) => (
            <AnswerBtn key={idx} onClick={() => choicedAns(idx)}>
              {e}
            </AnswerBtn>
          ))
        )}
      </AnsBox>
      <NextButton>다음</NextButton>
    </Container>
  );
};

export default ListPage2;

// Styled Components
const Container = styled.div`
  height: calc(100dvh - 72px);
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const QuestionBox = styled.div`
  height: 35%;
`;

const Qus = styled.div`
  height: 53%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  background-image: url('../../../public/images/fireBgImg.png');
  background-repeat: no-repeat;
  background-size: 75%;
  background-position: center center;
  color: white;
  font-size: 17px;
  font-weight: 700;
`;

const AnsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 40%;
`;

const AnswerBtn = styled.button`
  width: 100%;
  color: white;
  height: 6vh;
  background-color: #2e2e2e;
  border-radius: 8px;
  font-size: 0.8rem;
`;

const Dropdown = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownHeader = styled.div`
  width: 100%;
  height: 6vh;
  background-color: #2e2e2e;
  color: white;
  border-radius: 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #3e3e3e;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 120%;
  width: 100%;
  max-height: ${({ isOpen }) => (isOpen ? '200px' : '0')};
  border-radius: 8px;
  overflow: hidden;
  margin: 0;
  padding: 0;
  list-style: none;
  transition: max-height 0.3s ease-in-out;
  z-index: 10;
  border: ${({ isOpen }) => (isOpen ? '2px solid #555' : 'none')};
`;

const DropdownItem = styled.li`
  padding: 12px;
  text-align: center;
  color: white;
  cursor: pointer;
  border-bottom: 1px solid #444;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #3e3e3e;
  }
`;

const NextButton = styled.button`
  width: 100%;
  height: 6vh;
  font-size: 0.8rem;
  background-color: #fe6e6e;
  border-radius: 8px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #ff5a5a;
  }
`;
