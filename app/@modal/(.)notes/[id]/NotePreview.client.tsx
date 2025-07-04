'use client'

import { useRouter } from 'next/navigation';
import { Note } from '@/types/note';
import css from './NotePreview.module.css';

type Props = { note: Note }

const NotePreviewClient = ({ note }: Props) =>{
const router = useRouter();
const handleBack = () => {
    router.back();
};
return (
    <div className={css.container}>
      <button className={css.backBtn} onClick={handleBack}>
        ← Back
      </button>
      <div className={css.header}>
        <h2>{note.title}</h2>
        <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>
      </div>
      <p className={css.content}>{note.content}</p>
      <span className={css.tag}>{note.tag}</span>
    </div>
)
}


export default NotePreviewClient;