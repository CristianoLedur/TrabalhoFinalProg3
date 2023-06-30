import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'user',
  initialState: {
    nome: '',
    email: '',
    tipoUsuario: '',
    status: '',
    isLogged: false,
  },
  reducers: {
    changeUser(state, { payload }) {
      const { nome, email, tipoUsuario, status } = payload;
      return {
        ...state,
        isLogged: true,
        nome,
        email,
        tipoUsuario,
        status,
      };
    },
    logout(state){
      return {...state, isLogged: false, name: ''}
    }
  }
})

export const { changeUser, logout } = slice.actions

export const selectUser = state => state.user

export default slice.reducer