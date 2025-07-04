'use client'
import { useParams, useRouter } from 'next/navigation';
import { Note } from '@/types/note';
import css from './NotePreview.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';

const NotePreviewClient = () =>{
  const { id } = useParams();
  const noteId = Number(id)
  const router = useRouter();
  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId)
  });
  const handleClose = () => router.back();
  return (
    <Modal onClose={handleClose}>
      {isLoading && <p className={css.message}>Loading note…</p>}
      {isError && <p className={css.errorMessage}>Failed to load note.</p>}
         { note && 
           (<div className={css.container}>
            <button className={css.backBtn} onClick={handleClose}>
              ← Back
            </button>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>
            </div>
            <p className={css.content}>{note.content}</p>
            <span className={css.tag}>{note.tag}</span>
          </div>)
          }
    </Modal>
)
}
export default NotePreviewClient;