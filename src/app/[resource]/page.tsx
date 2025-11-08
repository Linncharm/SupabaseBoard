'use client';

import RefineProvider from '@/providers/RefineProvider';
import { GenericList } from '@/components/GenericList';

export default function ResourceListPage({ params }: { params: { resource: string } }) {
  return (
    <RefineProvider>
      <GenericList resource={params.resource} />
    </RefineProvider>
  );
}
