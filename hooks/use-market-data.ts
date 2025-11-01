"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useMarketData() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/market-data",
    fetcher,
    {
      refreshInterval: 60000, // Refresh every 60 seconds
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    data,
    isLoading,
    isError: error,
    refresh: mutate,
    lastUpdated: data?.lastUpdated ? new Date(data.lastUpdated) : null,
  };
}

export function useNews(source?: string, sentiment?: string) {
  const params = new URLSearchParams();
  if (source) params.append("source", source);
  if (sentiment) params.append("sentiment", sentiment);

  const { data, error, isLoading, mutate } = useSWR(
    `/api/news?${params.toString()}`,
    fetcher,
    {
      refreshInterval: 120000, // Refresh every 2 minutes
      revalidateOnFocus: true,
    }
  );

  return {
    news: data?.news || [],
    total: data?.total || 0,
    isLoading,
    isError: error,
    refresh: mutate,
    lastUpdated: data?.lastUpdated ? new Date(data.lastUpdated) : null,
  };
}

export function useFearGreed() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/fear-greed",
    fetcher,
    {
      refreshInterval: 300000, // Refresh every 5 minutes
      revalidateOnFocus: true,
    }
  );

  return {
    data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}

export function useStock(symbol: string) {
  const { data, error, isLoading, mutate } = useSWR(
    symbol ? `/api/stock/${symbol}` : null,
    fetcher,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
    }
  );

  return {
    data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}
