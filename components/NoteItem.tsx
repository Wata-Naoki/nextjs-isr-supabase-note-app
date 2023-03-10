import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import { useMutateNote } from '../hooks/useMutateNote'
import { useStore } from '../store'
import { supabase } from '../utils/supabase'
import { Spinner } from './Spinner'

type Props = {
  id: string
  title: string
  content: string
  user_id: string | undefined
}

export const NoteItem: React.FC<Props> = ({ id, title, content, user_id }) => {
  const [userId, setUserId] = useState<string | undefined>('')
  const update = useStore((state) => state.updateEditedNote)
  const { deleteNoteMutation } = useMutateNote()
  useEffect(() => {
    setUserId(supabase.auth.user()?.id)
  }, [])
  if (deleteNoteMutation.isLoading) {
    return <Spinner />
  }
  return (
    <li>
      {userId !== undefined && userId === user_id ? (
        <div className="flex w-full justify-end gap-x-4">
          <div className="w-96">
            <Link
              href={`/note/${id}`}
              prefetch={false}
              className=" cursor-pointer hover:text-red-400 "
            >
              {title}
            </Link>
          </div>
          <div className="flex">
            <PencilAltIcon
              className="h-6 w-6 cursor-pointer text-blue-500"
              onClick={() => update({ id, title, content })}
            />
            <TrashIcon
              className="h-6 w-6 cursor-pointer text-red-500"
              onClick={() => deleteNoteMutation.mutate(id)}
            />
          </div>
        </div>
      ) : null}
    </li>
  )
}
