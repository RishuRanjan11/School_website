'use client';

import { useSchoolAddress } from '@/lib/use-school-address';

export default function SchoolAddressText() {
  const address = useSchoolAddress();
  return <span>{address}</span>;
}
