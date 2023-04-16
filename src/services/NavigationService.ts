import { TypeCommon } from 'types/Common';
import { CommonActions, StackActions } from '@react-navigation/native';

export type Params = {
  name: string;
  params?: object;
};

type Navigator = {
  navigate: ({ name, params }: Params) => void;
  dispatch: TypeCommon;
  getRootState: TypeCommon;
  reset: () => void;
};

type CurrentRouter = {
  state?: TypeCommon;
  params: object;
};

let navigator: Navigator;

const setNavigator = (navigatorRef: TypeCommon): void => {
  navigator = navigatorRef;
};

const navigate = (name: string, params?: object): void => {
  navigator.navigate({
    name,
    params,
  });
};

const back = (): void => {
  navigator.dispatch(CommonActions.goBack());
};

const reset = (name: string, params?: object): void => {
  navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name,
          params: {
            hideBack: true,
            ...params,
          },
        },
      ],
    }),
  );
};

const replace = (name: string, params?: Params): void => {
  navigator.dispatch(StackActions.replace(name, params));
};

const navigatepopToTop = (): void => {
  navigator.dispatch(StackActions.popToTop());
};

const dispatch = (params: TypeCommon): void => {
  navigator.dispatch(params);
};

const getRootState = (): TypeCommon => {
  return navigator.getRootState();
};

const push = (name: string, params?: TypeCommon): void => {
  navigator.dispatch(StackActions.push(name, params));
};

const NavigationService = {
  setNavigator,
  navigate,
  back,
  reset,
  replace,
  navigatepopToTop,
  dispatch,
  getRootState,
  push,
};

export { NavigationService };
