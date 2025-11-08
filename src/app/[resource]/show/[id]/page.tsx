'use client';

import RefineProvider from '@/providers/RefineProvider';
import { GenericShow } from '@/components/GenericShow';

export default function ResourceShowPage({
  params,
}: {
  params: { resource: string; id: string };
}) {
  return (
    <RefineProvider>
      <GenericShow resource={params.resource} id={params.id} />
    </RefineProvider>
  );
}
