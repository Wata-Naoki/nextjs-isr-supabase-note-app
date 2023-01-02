import { useMutation } from 'react-query'
import { useStore } from '../store'
import { EditedComment } from '../types/type'
import { revalidateList, revalidateSingle } from '../utils/revalidation'
import { supabase } from '../utils/supabase'

type CreateProps = {
  note_id: string
  user_id: string | undefined
  content: string
}

export const useMutateComment = () => {
  const reset = useStore((state) => state.resetEditedComment)
  const createCommentMutation = useMutation(
    async (comment: CreateProps) => {
      const { data, error } = await supabase.from('comments').insert(comment)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        revalidateSingle(res[0].note_id)
        reset()
        alert('コメントを投稿しました')
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  const updateCommentMutation = useMutation(
    async (comment: EditedComment) => {
      const { data, error } = await supabase
        .from('comments')
        .update({ content: comment.content })
        .eq('id', comment.id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        revalidateSingle(res[0].note_id)
        reset()
        alert('コメントを更新しました')
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  const deleteCommentMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        revalidateSingle(res[0].note_id)

        reset()
        alert('コメントを削除しました')
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  return { createCommentMutation, updateCommentMutation, deleteCommentMutation }
}
