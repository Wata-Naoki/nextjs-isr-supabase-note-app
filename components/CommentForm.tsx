import React from 'react'
import { useMutateComment } from '../hooks/useMutateComment'
import { useStore } from '../store'
import { supabase } from '../utils/supabase'
import { Spinner } from './Spinner'
type Props = {
  noteId: string
}
export const CommentForm = ({ noteId }: Props) => {
  const { editedComment } = useStore()
  const update = useStore((state) => state.updateEditedComment)
  const { createCommentMutation, updateCommentMutation } = useMutateComment()

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editedComment.id) {
      createCommentMutation.mutate({
        content: editedComment.content,
        user_id: supabase.auth.user()?.id,
        note_id: noteId,
      })
    } else {
      updateCommentMutation.mutate({
        id: editedComment.id,
        content: editedComment.content,
      })
    }
  }
  if (createCommentMutation.isLoading || updateCommentMutation.isLoading) {
    return <Spinner />
  }
  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col items-center justify-center gap-y-6"
    >
      <input
        type="text"
        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
        placeholder="Comment"
        value={editedComment.content}
        onChange={(e) => update({ ...editedComment, content: e.target.value })}
      />
      <button
        type="submit"
        className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      >
        {editedComment.id ? 'Update' : 'send'}
      </button>
    </form>
  )
}
