import { useCallback, useEffect, useState } from "react";

export const fetchAPI = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options);
    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (contentType?.includes("application/json")) {
      return await response.json();
    } else {
      const text = await response.text();
      throw new Error(`Invalid JSON response: ${text.substring(0, 100)}...`);
    }
  } catch (error) {
    throw error;
  }
};

export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchAPI(url, options);

      setData(result.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
