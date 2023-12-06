import axios from 'axios';
import React, {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IDepartment } from 'screens/Department';
import { User } from 'screens/Home';
import { getError } from 'core/helpers/getError';
import { TypeCommon } from 'types/Common';

const AppInfoContext = createContext({
  user: undefined as User | undefined,
  departments: undefined as IDepartment[] | undefined,
  setUser: undefined as
    | React.Dispatch<React.SetStateAction<User | undefined>>
    | undefined,
  getUser: undefined as () => Promise<void> | undefined,
  getDepartment: undefined as any,
});

type Props = {
  children: ReactNode;
};
const AppInfoProvider = ({ children }: Props): ReactElement => {
  const [user, setUser] = useState<User | undefined>();
  const [departments, setDepartments] = useState<IDepartment[]>([]);

  const getUser = async () => {
    const res = await axios.get('/user/profile');
    setUser(res.data.user);
    return res.data;
  };

  const getDepartment = async () => {
    try {
      const res = await axios.get('/company/department');
      setDepartments(res.data.departments);
    } catch (error) {
      getError(error);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin' && user?.managedBy) {
      getDepartment();
    }
  }, [user]);

  return (
    <AppInfoContext.Provider
      value={{ user, setUser, getUser, departments, getDepartment }}
    >
      {children}
    </AppInfoContext.Provider>
  );
};

export { AppInfoProvider };

export const useAppInfo = (): TypeCommon => useContext(AppInfoContext);
