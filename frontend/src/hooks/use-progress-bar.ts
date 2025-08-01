import { useIsFetching } from '@tanstack/react-query';
import NProgress from 'nprogress';
import { useEffect, useRef } from 'react';
import 'nprogress/nprogress.css';

NProgress.configure({
  showSpinner: false,
  speed: 400,
  minimum: 0.1,
  trickleSpeed: 200,
});

export const usePageProgress = () => {
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const isFetching = useIsFetching({
    predicate: (query) =>
      query.state.fetchStatus === 'fetching' &&
      !query.queryKey.includes('authUser') &&
      !query.queryKey.includes('health'),
  });

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isFetching > 0) {
      if (!NProgress.isStarted()) {
        NProgress.start();
      }
    } else {
      timeoutRef.current = setTimeout(() => {
        if (NProgress.isStarted()) {
          NProgress.done();
        }
      }, 200);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isFetching]);
};
