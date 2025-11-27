'use client';

import { useState, useEffect } from 'react';
import { SubjectGroup } from '@/lib/parsers/courseParser';

export function useSubjectData() {
  const [subjectGroups, setSubjectGroups] = useState<SubjectGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/data/organized-courses.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setSubjectGroups(data);
      } catch (err) {
        console.error('Error loading subject data:', err);
        setError('Failed to load course data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { subjectGroups, isLoading, error };
}