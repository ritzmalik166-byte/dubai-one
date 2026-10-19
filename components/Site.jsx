'use client';

import { useEffect, useRef } from 'react';
import { initSite } from '@/lib/initSite';
import Chrome from './Chrome';
import Descent from './sections/Descent';
import Arrival from './sections/Arrival';
import Interiors from './sections/Interiors';
import Amenities from './sections/Amenities';
import Wellness from './sections/Wellness';
import Lifestyle from './sections/Lifestyle';
import Home from './sections/Home';
import Location from './sections/Location';
import Finale from './sections/Finale';

export default function Site() {
  const root = useRef(null);

  useEffect(() => initSite(root.current), []);

  return (
    <div ref={root}>
      <Chrome />
      <main>
        <Descent />
        <Arrival />
        <Interiors />
        <Amenities />
        <Wellness />
        <Lifestyle />
        <Home />
        <Location />
        <Finale />
      </main>
    </div>
  );
}
