"use client";
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { FetchNotesResponse } from '@/lib/api'; 
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './NotesClient.module.css';
import { useDebounce } from 'use-debounce';

type NotesClientProps = {
  initialData: FetchNotesResponse;
  tag: string; 
}

const NotesClient = ({ initialData, tag }: NotesClientProps) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);

  const { data } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', debouncedSearch, page, tag],
    queryFn: () => fetchNotes({search: debouncedSearch, page, tag}),
    placeholderData: keepPreviousData,
    initialData,
  });
  const handlePageChange = (newPage: number) => setPage(newPage);
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <button className={css.button} onClick={() => setModalOpen(true)}>
          Create note +
        </button>
      </header>
      {data?.notes && data.notes.length > 0 && (
        <NoteList 
        notes={data.notes} 
        />
      )}
      {isModalOpen && (
       <Modal onClose={() => setModalOpen(false)} >
           <NoteForm onClose={() => setModalOpen(false)} />
       </Modal>
      
      )}
    </div>
  );
}

export default NotesClient;