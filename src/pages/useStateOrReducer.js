import { useCallback, useEffect, useReducer, useState } from 'react';
// ------使用useState还是useReducer

// 使用useState实现主题色的自定义hook
const useDarkMode = () => {
  const preferDarkQuery = '(prefers-color-scheme: dark)';
  const [mode, setMode] = useState(() => window.localStorage.getItem('colorMode') || window.matchMedia(preferDarkQuery).matches ? 'dark' : 'light');
  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);
    const handleChange = () => setMode(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener(handleChange);
    return () => mediaQuery.removeEventListener(handleChange);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('colorMode', mode);
  }, [mode]);

  return [mode, setMode];
}

// 使用useReducer实现主题色自定义hook

const preferDarkQuery = '(prefers-color-scheme: dark)';
const modeDarkReducer = (state, action) => {
  switch(action.type) {
    case 'MEDIA_CHANGE':
      return { ...state, mode: action.mode };
    case 'SET_MODE':
      return { ...state, mode: action.mode};
    default:
      throw new Error(`unhandle action type:${action.type}`);
  }
}

const init = () => ({ mode: window.localStorage.getItem('colorMode') || window.matchMedia(preferDarkQuery).matches ? 'dark' : 'light' });

const useDarkMode2 = () => {
  const [state, dispatch] = useReducer(modeDarkReducer, { mode: 'light' }, init);
 
  const { mode } = state;
  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);
    const handleChange = () => dispatch({
      type: 'MEDIA_CHANGE',
      mode: mediaQuery.matches ? 'dark' : 'light',
    });
    mediaQuery.addEventListener(handleChange);
    return () => mediaQuery.removeEventListener(handleChange);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('colorMode', mode);
  }, [mode]);

  const setMode = useCallback((newMode) => {
    dispatch({
      type: 'SET_MODE',
      mode: newMode,
    });
  }, []);

  return [mode, setMode];
}