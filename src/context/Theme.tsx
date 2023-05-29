import React, {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';
import { TypeCommon } from 'types/Common';

const ThemeContext = createContext({
  theme: '' as string | undefined | null,
  setTheme: () => {
    //
  },
});

type Props = {
  children: ReactNode;
};
const ThemeProvider = ({ children }: Props): ReactElement => {
  const color = useColorScheme();

  const [theme, setStateTheme] = useState(color);

  useEffect(() => {
    setStateTheme(color);
  }, [color]);

  const setTheme = (): void => {
    setStateTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider };

export const useTheme = (): TypeCommon => useContext(ThemeContext);
