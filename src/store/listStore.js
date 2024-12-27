import { create } from 'zustand';
const listStore = create((set) => ({
  page: 0,
  ids: [],
  answers: [],
  addIdAndAnswer: (id, answer) =>
    set((state) => {
      const newIds = [...state.ids];
      const newAnswers = [...state.answers];
      newIds[state.page] = id;
      newAnswers[state.page] = answer;
      return { ids: newIds, answers: newAnswers };
    }),

  nextPage: () => set((state) => ({ page: state.page + 1 })),
  prevPage: () =>
    set((state) => ({ page: state.page > 0 ? state.page - 1 : 0 })),
}));
export default listStore;
