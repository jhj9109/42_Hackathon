import { atom } from 'recoil';

interface IUserInfoAtom {
  id: number;
  nickname: string;
}

const userInfoAtom = atom<IUserInfoAtom>({
  key: 'userInfo',
  default: {
    id: -1,
    nickname: '',
  }
});

export default userInfoAtom;
