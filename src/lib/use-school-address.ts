'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_SCHOOL_ADDRESS } from './school-address';

export function useSchoolAddress() {
  const [address, setAddress] = useState(DEFAULT_SCHOOL_ADDRESS);

  useEffect(() => {
    let active = true;
    fetch('/api/school-settings', { cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Failed to load school address (${response.status}).`);
        const data = await response.json();
        if (typeof data.address !== 'string') throw new Error('The school address response was invalid.');
        if (active) setAddress(data.address);
      })
      .catch((error: unknown) => {
        console.error('Unable to load school address:', error);
      });

    return () => {
      active = false;
    };
  }, []);

  return address;
}
