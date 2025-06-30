import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

type NotesProps = {
    params: Promise<{ slug: string[] }>
}

const Notes = async({ params }: NotesProps) => {
    const { slug } = await params;
    const queryClient = new QueryClient();
    const tag = slug[0] === 'All' ? '' : slug[0];
    const response = await fetchNotes({ search: '', page: 1 , tag});
    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient initialData={ response } tag={ tag }/>
        </HydrationBoundary>
    )
}

export default Notes;