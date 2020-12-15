import type {
  default as ViewPager,
  ViewPagerOnPageSelectedEvent,
  ViewPagerOnPageScrollEvent,
  PageScrollStateChangedNativeEvent,
} from '@react-native-community/viewpager';
import { createPage, CreatePage } from '../utils';
import { useCallback, useMemo, useRef, useState } from 'react';

export type UseNavigationPanelProps = ReturnType<typeof useNavigationPanel>;

export interface EventLog {
  event: 'scroll' | 'select' | 'statusChanged';
  text: string;
  timestamp: Date;
}

const getBasePages = (pages: number) =>
  new Array(pages).fill('').map((_v, index) => createPage(index));

export function useNavigationPanel(pagesAmount: number = 10) {
  const ref = useRef<ViewPager>(null);
  const [pages, setPages] = useState<CreatePage[]>(
    useMemo(() => getBasePages(pagesAmount), [pagesAmount])
  );
  const [activePage, setActivePage] = useState(0);
  const [isAnimated, setIsAnimated] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [scrollState, setScrollState] = useState('idle');
  const [dotsEnabled, setDotsEnabled] = useState(false);
  const [logs, setLogs] = useState<EventLog[]>([]);
  const [progress, setProgress] = useState({ position: 0, offset: 0 });
  const setPage = useCallback(
    (page: number) =>
      isAnimated
        ? ref.current?.setPage(page)
        : ref.current?.setPageWithoutAnimation(page),
    [isAnimated]
  );

  const addLog = useCallback((log: EventLog) => {
    setLogs((logs) => [log, ...logs].slice(0, 100));
  }, []);

  const addPage = useCallback(
    () => setPages((prevPages) => [...prevPages, createPage(prevPages.length)]),
    []
  );
  const removePage = useCallback(
    () => setPages((prevPages) => prevPages.slice(0, prevPages.length - 1)),
    []
  );
  const toggleAnimation = useCallback(
    () => setIsAnimated((animated) => !animated),
    []
  );
  const toggleScroll = useCallback(
    () => setScrollEnabled((enabled) => !enabled),
    []
  );
  const toggleDots = useCallback(
    () => setDotsEnabled((enabled) => !enabled),
    []
  );

  const onPageScroll = useCallback(
    (e: ViewPagerOnPageScrollEvent) => {
      addLog({
        event: 'scroll',
        text: `Position: ${e.nativeEvent.position} Offset: ${e.nativeEvent.offset}`,
        timestamp: new Date(),
      });
      setProgress({
        position: e.nativeEvent.position,
        offset: e.nativeEvent.offset,
      });
    },
    [addLog]
  );
  const onPageSelected = useCallback(
    (e: ViewPagerOnPageSelectedEvent) => {
      addLog({
        event: 'select',
        text: `Page: ${e.nativeEvent.position}`,
        timestamp: new Date(),
      });
      setActivePage(e.nativeEvent.position);
    },
    [addLog]
  );
  const onPageScrollStateChanged = useCallback(
    (e: PageScrollStateChangedNativeEvent) => {
      addLog({
        event: 'statusChanged',
        text: `State: ${e.nativeEvent.pageScrollState}`,
        timestamp: new Date(),
      });
      setScrollState(e.nativeEvent.pageScrollState);
    },
    [addLog]
  );

  return {
    ref,
    activePage,
    isAnimated,
    pages,
    scrollState,
    scrollEnabled,
    dotsEnabled,
    progress,
    setPage,
    addPage,
    removePage,
    toggleScroll,
    toggleDots,
    toggleAnimation,
    setProgress,
    onPageScroll,
    onPageSelected,
    onPageScrollStateChanged,
    logs,
  };
}
