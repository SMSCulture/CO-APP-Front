export interface HelpArticle {
  id: string;
  topic: string;
  title: string;
  summary: string;
}

export const helpTopics = ['Tickets', 'Account', 'Events', 'Payments'] as const;

export const mockHelpArticles: HelpArticle[] = [
  {
    id: 'help-1',
    topic: 'Tickets',
    title: 'Where do my tickets show up?',
    summary: 'Anything you buy lands in the Tickets tab, split into Upcoming and Expired.',
  },
  {
    id: 'help-2',
    topic: 'Tickets',
    title: 'I bought a ticket but don’t see it',
    summary: 'Pull down to refresh on the Tickets tab — it usually shows up right away.',
  },
  {
    id: 'help-3',
    topic: 'Tickets',
    title: 'Can I get a refund?',
    summary: 'Refund windows depend on the event organizer — reach out to support with your order details.',
  },
  {
    id: 'help-4',
    topic: 'Account',
    title: 'How do I change my city?',
    summary: 'Head to Profile > Settings > City to switch where CultureOwl looks for events.',
  },
  {
    id: 'help-5',
    topic: 'Account',
    title: 'How do I delete my account?',
    summary: 'You can start that from Profile > Settings > Account > Delete Account.',
  },
  {
    id: 'help-6',
    topic: 'Events',
    title: 'How do I save an event for later?',
    summary: 'Tap the heart on any event, venue, or restaurant — find them all under Favorites.',
  },
  {
    id: 'help-7',
    topic: 'Events',
    title: 'Can I get notified about new events?',
    summary: 'Turn on Notifications under Profile > Settings > Communication Preferences.',
  },
  {
    id: 'help-8',
    topic: 'Payments',
    title: 'What payment methods do you accept?',
    summary: 'Most major cards are supported at checkout — you’ll see the full list when you buy.',
  },
];
