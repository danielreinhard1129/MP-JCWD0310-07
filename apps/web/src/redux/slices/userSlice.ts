import { User } from '@/types/user.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { number } from 'yup';

interface Point {
  total: number;
}

const initialState: User = {
  id: 0,
  fullName: '',
  email: '',
  password: '',
  role: '',
  referralCode: '',
  points: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.referralCode = action.payload.referralCode;
      state.role = action.payload.role;
      state.points = action.payload.points;

    },
    logoutAction: (state) => {
      state.id = 0;
      (state.fullName = ''), (state.email = '');
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;


export default userSlice.reducer;
