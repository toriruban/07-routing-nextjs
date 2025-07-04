import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import NotePreviewClient from './NotePreview.client';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

type Props = {
    params: Promise<{ id: string }>
};

const NotePreviewPage = async ({ params } : Props) => {
    const { id } = await params;
    const noteId = Number(id);
    const note = await fetchNoteById(noteId);
    const queryClient = new QueryClient();
    queryClient.prefetchQuery({
        queryKey: ['note', noteId],
        queryFn: () => fetchNoteById(noteId)
    })
   
    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
        <Modal>
            <NotePreviewClient note={note} />
        </Modal>
        </HydrationBoundary>
    )
    
}
export default NotePreviewPage;