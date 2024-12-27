import styled from 'styled-components';
import MainCard from '../components/homePage/MainCard';
import HashTags from '../components/homePage/HashTags';
import axiosInstance from '../apis/axiosInstance';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

export default function HomePage() {
  const [processedData, setProcessedData] = useState([]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['hotHashTags'],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await axiosInstance.get(
          `/api/program/home?page=${pageParam}`
        );
        return response.data.result; // 응답 데이터 구조 확인 필요
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.hasNextPage ? allPages.length + 1 : undefined;
      },
      staleTime: 1000 * 60 * 5,
    });

  useEffect(() => {
    if (data) {
      const flatData = data.pages.flatMap((page) => page || []); // 안전한 접근
      const transformedData = flatData.map((item) => ({
        title: item.title || '제목 없음', // 누락 시 기본값 제공
        region: item.region || '지역 정보 없음',
        category: item.category || '카테고리 없음',
        target: item.target || '대상 정보 없음',
        type: item.type || '타입 정보 없음',
        content: item.content || '내용 없음',
      }));
      setProcessedData(transformedData);
    }
  }, [data]);

  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <PageWrapper>
      <MainCard />
      <span>지금 핫한 열정들</span>
      <HashTagWrapper>
        {processedData.map((hashtag, index) => (
          <HashTags key={index} hashtag={hashtag} />
        ))}
      </HashTagWrapper>
      {isFetchingNextPage && <Loading>로딩 중...</Loading>}
      <Observer ref={observerRef}>da</Observer>
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

const Loading = styled.div`
  color: white;
  margin: 20px 0;
  font-size: 14px;
  text-align: center;
`;

const Observer = styled.div`
  height: 10px;
  width: 10px;
  background-color: black;
`;
