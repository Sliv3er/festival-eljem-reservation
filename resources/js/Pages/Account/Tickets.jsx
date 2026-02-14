import { Head } from '@inertiajs/react';
import AccountLayout from '../../Layouts/AccountLayout';
import useLocale from '../../hooks/useLocale';
import TicketCard from '../../Components/TicketCard';
import EmptyState from '../../Components/EmptyState';
import Alert from '../../Components/Alert';

export default function Tickets({ tickets: propTickets }) {
  const { t } = useLocale();

  const tickets = propTickets || [
    {
      id: 'TK-001',
      eventTitle: 'Vienna Philharmonic — Mozart & Beethoven',
      eventDate: '2026-07-18T21:00:00',
      eventImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Amphitheatre_of_El_Jem.jpg/400px-Amphitheatre_of_El_Jem.jpg',
      zone: 'Arène',
      seat: 'A-12',
      status: 'valid',
    },
    {
      id: 'TK-002',
      eventTitle: 'Vienna Philharmonic — Mozart & Beethoven',
      eventDate: '2026-07-18T21:00:00',
      eventImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Amphitheatre_of_El_Jem.jpg/400px-Amphitheatre_of_El_Jem.jpg',
      zone: 'VIP Lounge',
      seat: 'VIP-3',
      status: 'valid',
    },
    {
      id: 'TK-003',
      eventTitle: 'Orchestre Symphonique de Tunis — Ouverture',
      eventDate: '2025-07-15T20:30:00',
      eventImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/El_Djem_Amphitheater_%28II%29.jpg/400px-El_Djem_Amphitheater_%28II%29.jpg',
      zone: 'Gradins',
      seat: 'G-45',
      status: 'used',
    },
  ];

  return (
    <AccountLayout>
      <Head title={t('tickets.title')} />

      <h2 className="text-xl font-bold text-text mb-2">{t('tickets.title')}</h2>

      <Alert variant="info" className="mb-6">
        {t('tickets.noRefunds')}
      </Alert>

      {tickets.length === 0 ? (
        <EmptyState
          title={t('tickets.noTickets')}
          description={t('tickets.noTicketsText')}
          actionLabel={t('home.viewProgram')}
          actionHref="/program"
        />
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </AccountLayout>
  );
}
