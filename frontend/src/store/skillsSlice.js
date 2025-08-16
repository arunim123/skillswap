import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  skills: [],
  loading: false,
  error: null,
};

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    fetchSkillsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSkillsSuccess: (state, action) => {
      state.skills = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchSkillsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addSkill: (state, action) => {
      state.skills.push(action.payload);
    },
    updateSkill: (state, action) => {
      const index = state.skills.findIndex((skill) => skill.id === action.payload.id);
      if (index !== -1) {
        state.skills[index] = action.payload;
      }
    },
    deleteSkill: (state, action) => {
      state.skills = state.skills.filter((skill) => skill.id !== action.payload);
    },
  },
});

export const {
  fetchSkillsStart,
  fetchSkillsSuccess,
  fetchSkillsFailure,
  addSkill,
  updateSkill,
  deleteSkill,
} = skillsSlice.actions;

export default skillsSlice.reducer; 