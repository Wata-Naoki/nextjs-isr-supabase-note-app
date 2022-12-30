import create from 'zustand'
import { EditedComment, EditedNote } from './types/type'

type state = {
  editedNote: EditedNote
  editedComment: EditedComment
  updateEditedNote: (payload: EditedNote) => void
  updateEditedComment: (payload: EditedComment) => void
  resetEditedNote: () => void
  resetEditedComment: () => void
}

export const useStore = create<state>((set, _) => ({
  editedNote: {
    id: '',
    title: '',
    content: '',
  },
  editedComment: {
    id: '',
    content: '',
  },
  updateEditedNote: (payload: EditedNote) =>
    set({
      editedNote: {
        id: payload.id,
        title: payload.title,
        content: payload.content,
      },
    }),
  updateEditedComment: (payload: EditedComment) =>
    set({
      editedComment: {
        id: payload.id,
        content: payload.content,
      },
    }),
  resetEditedNote: () =>
    set({
      editedNote: {
        id: '',
        title: '',
        content: '',
      },
    }),
  resetEditedComment: () =>
    set({
      editedComment: {
        id: '',
        content: '',
      },
    }),
}))
