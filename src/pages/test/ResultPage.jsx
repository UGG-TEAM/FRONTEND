import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useNavigate } from 'react-router-dom';
ChartJS.register(ArcElement, Tooltip, ChartDataLabels, Legend);

const ResultPage = () => {
  const chartData = [30, 28, 20, 14, 8];
  const choicedIdx = 0;
  const navigate=useNavigate();
  return (
    <Container>
      <TopBox>
        <img src="../../../public/images/resultImg.png" />
        <div>
          당신은 <span>외로움</span>을 많이 겪고 있군요
        </div>
      </TopBox>
      <ContBox>
        <Tag>#당신의 유형</Tag>
        <Cont>
          <DoughnutChart data={chartData} choicedIdx={choicedIdx} />
          <BottomText>
            회원님과 같은 유형에 해당하는
            <br /> 엠버 유저는 <span>{chartData[choicedIdx]}%</span>가 있어요.
          </BottomText>
        </Cont>
      </ContBox>
      <ContBox>
        <Tag>#유형 상세 분석</Tag>
        <Cont></Cont>
      </ContBox>
      <ContBox>
        <Tag>#추천 활동</Tag>
        <Cont>sf</Cont>
      </ContBox>
      <ImgBox>
        <Item $imgSrc="../../../public/images/imgsrc1.png">
          <span>은둔하는 사람책도서관</span>
        </Item>
        <Item $imgSrc="../../../public/images/imgsrc2.png">
          <span>두더지땅굴</span>
        </Item>
        <Item $imgSrc="../../../public/images/imgsrc3.png">
          <span>
            서울시 고립.은둔청년
            <br />
            지원사업
          </span>
        </Item>
      </ImgBox>
      <EndBtn onClick={()=>navigate("/")}>테스트 마치기</EndBtn>
    </Container>
  );
};

const DoughnutChart = ({ data, choicedIdx }) => {
  const backgroundColors = data.map((_, index) =>
    index === choicedIdx ? '#FE6E6E' : '#2C2C2C'
  );

  const chartData = {
    labels: ['Type 1', 'Type 2', 'Type 3', 'Type 4'],
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColors,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        formatter: (value, context) => {
          const data = context.chart.data.datasets[0].data;
          const index = context.dataIndex;
          return index === choicedIdx ? `${Math.round(value)}%` : '';
        },
        color: '#fff',
        font: {
          size: 14,
        },
      },
    },
    cutout: '0',
  };

  return (
    <ChartContainer>
      <Doughnut data={chartData} options={options} />
      <CenterText></CenterText>
    </ChartContainer>
  );
};

export default ResultPage;

const Container = styled.div`
  padding: 10px 20px 40px 20px;
`;
const TopBox = styled.div`
  width: 100%;
  height: 23vh;
  img {
    width: 160px;
    height: 160px;
    position:relative;
    left: 5px;
  }
  div {
    color: white;
    font-weight: 600;
    span {
      color: #fe6e6e;
    }
  }
`;

const ContBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 12px;
  margin-top: 32px;
`;

const Tag = styled.span`
  display: inline-block;
  padding: 6px 12px 4px 12px;
  background-color: #fe6e6e;
  border-radius: 100px;
  color: white;
`;

const Cont = styled.div`
  border-radius: 12px;
  border: 1px solid #fe6e6e;
  width: 100%;
  background-color: #2e2e2e;
  padding: 24px 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ChartContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  margin-bottom: 20px;
  border: 1px solid #4c4c4c;
  border-radius: 50%;
  box-shadow: 0px 7px 15px rgba(0, 0, 0, 0.5);
`;

const CenterText = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  font-size: 20px; /* 텍스트 크기 조정 */
  font-weight: bold;
`;

const BottomText = styled.div`
  text-align: center;
  font-size: 12px;
  color: white;

  span {
    color: #fe6e6e;
    font-weight: bold;
  }
`;

const ImgBox = styled.div`
  width: 100%;
  overflow-x: scroll;
  display: flex;
  gap: 12px;
  padding-bottom: 8px;
  margin-top: 16px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.div`
  width: 50vw;
  height: 146px;
  flex: 0 0 auto;
  background-color: aliceblue;
  border-radius: 12px;
  position: relative;
  background-image: url(${(props) => props.$imgSrc});
  background-size: cover;
  background-position: center;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
    border-radius: 12px;
    pointer-events: none;
  }

  span {
    position: absolute;
    bottom: 15px;
    left: 8px;
    color: white;
    z-index: 1;
    font-weight: 600;
  }
`;
const EndBtn = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 12px;
  background-color: #fe6e6e;
  font-size: 0.8rem;
  color: white;
  margin-top: 48px;
`;
