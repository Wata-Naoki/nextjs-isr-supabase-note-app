import React from 'react'
import { useMutateNote } from '../hooks/useMutateNote'
import { useStore } from '../store'
import { supabase } from '../utils/supabase'
import { Spinner } from './Spinner'

export const NoteForm = () => {
  const { editedNote } = useStore()
  const update = useStore((state) => state.updateEditedNote)
  const { createNoteMutation, updateNoteMutation } = useMutateNote()

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editedNote.id) {
      createNoteMutation.mutate({
        title: editedNote.title,
        content: editedNote.content,
        user_id: supabase.auth.user()?.id,
      })
    } else {
      updateNoteMutation.mutate({
        id: editedNote.id,
        title: editedNote.title,
        content: editedNote.content,
      })
    }
  }

  if (createNoteMutation.isLoading || updateNoteMutation.isLoading) {
    return <Spinner />
  }
  return (
    <form onSubmit={submitHandler}>
      <div>
        <input
          type="text"
          className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          placeholder="Title"
          value={editedNote.title}
          onChange={(e) => update({ ...editedNote, title: e.target.value })}
        />
      </div>
      <div>
        <textarea
          cols={50}
          rows={10}
          className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          placeholder="Content"
          value={editedNote.content}
          onChange={(e) => update({ ...editedNote, content: e.target.value })}
        />
      </div>
      <div className="my-2 flex justify-center">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >
          {editedNote.id ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
}
