'use client';

import { useEffect, useState } from 'react';
import { getSubjectGroups } from '@/app/actions/catalog';
import type { SubjectGroup } from '@/lib/types';

export function useSubjectData() {
  const [subjectGroups, setSubjectGroups] = useState<SubjectGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await getSubjectGroups();
        if (cancelled) return;

        if (result.error) {
          throw new Error(result.error);
        }
        setSubjectGroups(result.data ?? []);
      } catch (err) {
        if (!cancelled) {
          console.error('Error loading subject data:', err);
          setError(
            err instanceof Error ? err.message : 'Failed to load course data.',
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { subjectGroups, isLoading, error };
}
