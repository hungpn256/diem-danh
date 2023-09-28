import axios from 'axios';
import React, {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import { User } from 'screens/Home';
import { TypeCommon } from 'types/Common';

const AppInfoContext = createContext({
  user: undefined as User | undefined,
  setUser: undefined as
    | React.Dispatch<React.SetStateAction<User | undefined>>
    | undefined,
});

type Props = {
  children: ReactNode;
};
const AppInfoProvider = ({ children }: Props): ReactElement => {
  const [user, setUser] = useState<User | undefined>();

  const getUser = async () => {
    const res = await axios.get('/user/profile');
    setUser(res.data.user);
    return res.data;
  };

  return (
    <AppInfoContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </AppInfoContext.Provider>
  );
};

export { AppInfoProvider };

export const useAppInfo = (): TypeCommon => useContext(AppInfoContext);
