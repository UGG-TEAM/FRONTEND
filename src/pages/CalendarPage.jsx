import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import axiosInstance from '../apis/axiosInstance';

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState('check'); // 기본값을 'check'로 설정
  const [achievedDates, setAchievedDates] = useState([]);
  const [checkList, setCheckList] = useState([
    {
      id: 1,
      programId: 1,
      programName: '체크리스트',
      checked: false,
    },
    {
      id: 2,
      programId: 1,
      programName: '체크리스트',
      checked: false,
    },
    {
      id: 3,
      programId: 1,
      programName: '체크리스트',
      checked: true,
    },
    {
      id: 4,
      programId: 1,
      programName: '체크리스트',
      checked: true,
    },
  ]);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = `--${String(date.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(date.getDate()).padStart(2, '0')}`;
    }
    return null;
  };

  const handleCheckboxToggle = (id) => {
    setCheckList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  useEffect(() => {
    axiosInstance.get('/api/checklist/checklistall').then((res) => {
      const achieved = res.data.result
        .filter((item) => item.checked)
        .map((item) => item.date);
      setAchievedDates(achieved);
    });
  }, []);

  useEffect(() => {
    // 초기 체크리스트 데이터 가져오기
    axiosInstance
      .post(
        `/api/checklist/checklistdate?monthDay=${
          '--' + (date.getMonth() + 1) + '-' + date.getDate()
        }`
      )
      .then((res) => {
        setCheckList(res.data.result);
      });
  }, [date]);

  console.log(achievedDates);

  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = `--${String(date.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(date.getDate()).padStart(2, '0')}`;
      if (achievedDates.includes(formattedDate)) {
        return 'achieved-date'; // 달성된 날짜에 클래스 추가
      }
    }
    const day = date.getDay(); // 요일 가져오기
    if (day === 0) return 'sunday';
    if (day === 6) return 'saturday';
    return '';
  };

  const handleSelect = (type) => {
    setSelected(type); // 선택된 상태 변경
  };

  const onDateClick = (date) => {
    axiosInstance
      .post(
        `/api/checklist/checklistdate?monthDay=${
          '--' + (date.getMonth() + 1) + '-' + date.getDate()
        }`
      )
      .then((res) => {
        setCheckList(res.data.result);
      });

    setDate(date); // 선택된 날짜 변경
  };

  // 필터링된 체크리스트 데이터
  const filteredCheckList = checkList.filter(
    (item) => item.checked === (selected === 'check')
  );

  return (
    <CalendarWrapper>
      <Calendar
        onChange={onDateClick}
        value={date}
        prevLabel={<img src="/images/left.png" />}
        nextLabel={<img src="/images/right.png" />}
        prev2Label={null}
        next2Label={null}
        formatDay={(locale, date) =>
          date.toLocaleString('en', { day: 'numeric' })
        }
        tileContent={tileContent}
        tileClassName={getTileClassName} // 요일에 따른 클래스 추가
      />
      <CheckList>
        <h2>체크리스트</h2>
        <CheckOrNot>
          <NonCheck
            onClick={() => handleSelect('noncheck')}
            $isSelected={selected === 'noncheck'} // 상태 전달
          >
            미달성
          </NonCheck>
          <Check
            onClick={() => handleSelect('check')}
            $isSelected={selected === 'check'} // 상태 전달
          >
            달성
          </Check>
        </CheckOrNot>
        {filteredCheckList.map((item) => (
          <ItemContainer key={item.id}>
            <CheckboxWrapper
              onClick={() => handleCheckboxToggle(item.id)}
              checked={item.checked}
            >
              {item.checked && <CheckMark>✔</CheckMark>}
            </CheckboxWrapper>
            <ItemText checked={item.checked}>{item.programName}</ItemText>
            <RemoveButton onClick={() => {}}>✖</RemoveButton>
          </ItemContainer>
        ))}
      </CheckList>
    </CalendarWrapper>
  );
}

const CalendarWrapper = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  .react-calendar {
    background-color: #2e2e2e;
    border: none;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    width: 350px;
    max-width: 100%;
    font-family: Arial, sans-serif;
  }

  .react-calendar__tile.achieved-date {
    background-image: url('/images/fire.png'); /* 이미지 경로 */
    background-size: 20px, 20px; /* 이미지가 전체 타일을 덮도록 설정 */
    background-position: center; /* 중앙에 배치 */
    background-repeat: no-repeat; /* 반복 금지 */
    color: white; /* 텍스트 색상 설정 (필요 시) */
  }

  .react-calendar__navigation {
    background-color: #2e2e2e;
    color: white;
    border-radius: 10px 10px 0 0;
    padding: 5px;
    margin: 16px 0;

    button:hover {
      background-color: #2e2e2e;
    }
  }

  .react-calendar__navigation__label {
    font-size: 18px;
    font-weight: 600;
    color: white;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.5;
  }

  .react-calendar__month-view__weekdays__weekday {
    color: white;

    &:first-child {
      color: #fe6e6e;
    }

    &:last-child {
      color: #455be8;
    }
  }

  .react-calendar__tile {
    color: white;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    width: 36px;
    height: 50px;
    text-shadow: -1px -1px 0px black, /* 좌상 */ 1px -1px 0px black,
      /* 우상 */ -1px 1px 0px black, /* 좌하 */ 1px 1px 0px black; /* 우하 */
  }

  .react-calendar__tile--now {
    color: #ffbb0e;
    background-color: #2e2e2e;
  }

  .react-calendar__tile--active {
    background-color: #101010 !important;
    border: 1px solid #fe6e6e;
    border-radius: 50%;
    width: 36px;
    height: 50px;
  }

  .react-calendar__tile--hover {
    background-color: #e0e0e0;
  }

  /* 토요일 스타일 */
  .react-calendar__tile.saturday {
    color: #455be8; /* 파란색 */
  }

  /* 일요일 스타일 */
  .react-calendar__tile.sunday {
    color: #fe6e6e; /* 빨간색 */
  }
`;

const CheckList = styled.div`
  margin-top: 44px;
  width: 90%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  h2 {
    font-size: 18px;
    font-weight: 600;
    color: white;
    width: 100%;
    text-align: left;
  }
`;

const CheckOrNot = styled.div`
  width: 100%;
  display: flex;
`;

const NonCheck = styled.button`
  width: 50%;
  background-color: ${({ $isSelected }) => ($isSelected ? 'black' : '#2E2E2E')};
  color: ${({ $isSelected }) => ($isSelected ? '#fe6e6e' : '#818181')};
  padding: 8px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 12px 0 0 12px;
  border: ${({ $isSelected }) =>
    $isSelected ? '1px solid #fe6e6e' : '1px solid #818181'};
`;

const Check = styled.button`
  width: 50%;
  background-color: ${({ $isSelected }) => ($isSelected ? 'black' : '#2E2E2E')};
  color: ${({ $isSelected }) => ($isSelected ? '#fe6e6e' : '#818181')};
  padding: 8px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 0 12px 12px 0;
  border: ${({ $isSelected }) =>
    $isSelected ? '1px solid #fe6e6e' : '1px solid #818181'};
`;

const ItemContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: #2e2e2e;
  padding: 10px;
  border-radius: 12px;
  margin: 8px 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const CheckboxWrapper = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid ${({ checked }) => (checked ? '#fe6e6e' : '#818181')};
  background-color: ${({ checked }) => (checked ? '#fe6e6e' : '#2e2e2e')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const CheckMark = styled.span`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

const ItemText = styled.span`
  flex: 1;
  margin-left: 12px;
  color: white;
  font-size: 16px;
  transition: color 0.3s ease, text-decoration 0.3s ease;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #818181;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #fe6e6e;
  }
`;
