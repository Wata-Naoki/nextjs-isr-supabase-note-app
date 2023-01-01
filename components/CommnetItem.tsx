import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import { useMutateComment } from '../hooks/useMutateComment'
import { useMutateNote } from '../hooks/useMutateNote'
import { useStore } from '../store'
import { Comment } from '../types/type'
import { supabase } from '../utils/supabase'
import { Spinner } from './Spinner'
export const CommentItem: React.FC<Omit<Comment, 'created_at' | 'note_id'>> = ({
  id,
  content,
  user_id,
}) => {
  const [userId, setUserId] = useState<string | undefined>('')
  const update = useStore((state) => state.updateEditedComment)
  const { deleteCommentMutation } = useMutateComment()
  React.useEffect(() => {
    setUserId(supabase.auth.user()?.id)
  }, [])
  if (deleteCommentMutation.isLoading) {
    return <Spinner />
  }
  return (
    <li className="my-3">
      <span>{content}</span>
      {userId === user_id && (
        <div className="flex justify-end">
          <PencilAltIcon
            className="h-6 w-6 cursor-pointer text-blue-500"
            onClick={() => update({ id, content })}
          />
          <TrashIcon
            className="h-6 w-6 cursor-pointer text-red-500"
            onClick={() => deleteCommentMutation.mutate(id)}
          />
        </div>
      )}
    </li>
  )
}
