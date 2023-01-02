import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'
import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { CommentForm } from '../../components/CommentForm'
import { CommentItem } from '../../components/CommnetItem'
import { Layout } from '../../components/Layout'
import { Note } from '../../types/type'
import { supabase } from '../../utils/supabase'

const getAllNoteIds = async () => {
  // notesのデーブルからidカラム全部取得
  const { data: ids, error } = await supabase.from('notes').select('id')
  // 取得してきた全てのidをmapで回して、idを取り出す
  return ids!.map((id) => {
    return {
      params: {
        id: String(id.id),
      },
    }
  })
}

export const getStaticPaths = async () => {
  const paths = await getAllNoteIds()
  return {
    paths,
    // blockingはssrでレンダリングする
    // trueだとからのページが表示される。jsonが返ってくるまで、空のページが表示される。
    //リンクをクリックするとprefetchするのでtrueもfalseも変わらん
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: note, error } = await supabase
    .from('notes')
    // そのnotesに紐づくcommentsに関連するデータも取得する
    .select('*, comments(*)')
    .eq('id', params?.id)
    .single()

  return {
    props: {
      note,
    },
    revalidate: false,
  }
}
type StaticProps = {
  note: Note
}

const NotePage: NextPage<StaticProps> = ({ note }) => {
  return (
    <Layout title="NoteDetail">
      <p className="text-3xl font-semibold text-blue-500">{note.title}</p>
      <div className="m-4 rounded-lg p-4 shadow-lg">
        <p>{note.content}</p>
      </div>
      <ul className="">
        {note.comments.map((comment) => (
          <CommentItem
            key={comment.id}
            id={comment.id}
            content={comment.content}
            user_id={comment.user_id}
          />
        ))}
      </ul>
      <CommentForm noteId={note.id} />

      <Link href="/notes" prefetch={false}>
        <ChevronDoubleLeftIcon className="h-6 w-6 cursor-pointer text-blue-500" />
      </Link>
    </Layout>
  )
}

export default NotePage
