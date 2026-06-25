export interface Event {
  id: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  ticketUrl?: string;
  soldOut?: boolean;
}

export const events: Event[] = [
  {
    id: '1',
    date: '2026-05-23',
    time: '19:30',
    venue: 'SWR3 feiert 30 Jahre 0711 Family Jam - Schlossplatz',
    city: 'Stuttgart',
    ticketUrl: 'https://www.easyticket.de/veranstaltung/swr3-feiert-30-jahre-0711-family-jam/104422',
  },
  {
    id: '2',
    date: '2026-07-25',
    time: '16:00',
    venue: 'Old But Gold Ü30 Hip Hop Festival - MS Artville',
    city: 'Hamburg',
    ticketUrl: 'https://www.oldbutgoldfestival.de/festival-hamburg-2026/',
  },
  {
    id: '3',
    date: '2026-08-29',
    time: '12:00',
    venue: 'Klassentreffen Festival - Zentraler Festplatz',
    city: 'Berlin',
    ticketUrl: 'https://klassentreffenfestival.de/',
  },
];
