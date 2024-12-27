import styled from 'styled-components';
import MainCard from '../components/homePage/MainCard';
import HashTags from '../components/homePage/HashTags';
import axiosInstance from '../apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export default function HomePage() {
  const { data, error, isLoading, isError } = useQuery({
    querykey: ['home'],
    queryFn: () =>
      axiosInstance.get().then((res) => {
        return res.data;
      }),
  });

  return (
    <PageWrapper>
      <MainCard />
      <span>지금 핫한 열정들</span>
      <HashTagWrapper>
        <HashTags />
        <HashTags />
        <HashTags />
        <HashTags />
        <HashTags />
        <HashTags />
      </HashTagWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  height: calc(100dvh - 72px);
  padding-top: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  & > span {
    color: white;
    margin-top: 44px;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 600;
    width: 90%;
    text-align: left;
  }
`;

const HashTagWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 20px 0;
`;
