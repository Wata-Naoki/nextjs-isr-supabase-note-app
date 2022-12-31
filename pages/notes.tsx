import { DocumentTextIcon, LogoutIcon } from '@heroicons/react/solid'
import { GetStaticProps, NextPage } from 'next'
import React from 'react'
import { Layout } from '../components/Layout'
import { NoteForm } from '../components/NoteForm'
import { NoteItem } from '../components/NoteItem'
import { Note } from '../types/type'
import { supabase } from '../utils/supabase'

export const getStaticProps: GetStaticProps = async () => {
  console.log('getStaticProps called')
  const { data: notes, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) {
    return {
      props: {
        error: error.message,
      },
    }
  }
  return {
    props: {
      notes,
    },
    revalidate: false,
  }
}

type StaticProps = {
  notes: Note[]
}
const Notes: NextPage<StaticProps> = ({ notes }) => {
  const signOut = () => {
    supabase.auth.signOut()
  }
  return (
    <Layout title="Notes">
      <LogoutIcon
        className="h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
      <DocumentTextIcon className="h-6 w-6 text-blue-500" />
      {/* <NoteForm /> */}
      <ul>
        {notes?.map((note) => (
          <NoteItem
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            user_id={note.user_id}
          />
        ))}
      </ul>
      <NoteForm />
    </Layout>
  )
}

export default Notes
