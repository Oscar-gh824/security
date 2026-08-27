import { useEffect, useState } from "react";

/** 로그인 없이 브라우저 로컬 저장소에 값을 유지하는 훅 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // 저장 실패(예: 시크릿 모드 용량 제한)는 조용히 무시
    }
  }, [key, value]);

  return [value, setValue] as const;
}
