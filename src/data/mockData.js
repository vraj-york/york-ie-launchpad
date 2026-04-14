/** Mock feed content — no backend. Images from picsum.photos. */

export const currentUser = {
  username: 'you',
  fullName: 'Your Name',
  avatar: 'https://picsum.photos/seed/me/150/150',
}

export const stories = [
  { id: 's1', username: 'travel', avatar: 'https://picsum.photos/seed/a/120/120', hasNew: true },
  { id: 's2', username: 'design', avatar: 'https://picsum.photos/seed/b/120/120', hasNew: true },
  { id: 's3', username: 'coffee', avatar: 'https://picsum.photos/seed/c/120/120', hasNew: false },
  { id: 's4', username: 'music', avatar: 'https://picsum.photos/seed/d/120/120', hasNew: true },
  { id: 's5', username: 'cats', avatar: 'https://picsum.photos/seed/e/120/120', hasNew: false },
  { id: 's6', username: 'code', avatar: 'https://picsum.photos/seed/f/120/120', hasNew: true },
]

export const suggestions = [
  { username: 'alex_lens', relation: 'Followed by mia + 2 more', avatar: 'https://picsum.photos/seed/s1/80/80' },
  { username: 'studio.north', relation: 'New to Gram', avatar: 'https://picsum.photos/seed/s2/80/80' },
  { username: 'filmgrain', relation: 'Follows you', avatar: 'https://picsum.photos/seed/s3/80/80' },
  { username: 'minimalhaus', relation: 'Followed by design', avatar: 'https://picsum.photos/seed/s4/80/80' },
]

export const posts = [
  {
    id: 'p1',
    username: 'urban.frames',
    location: 'Berlin',
    avatar: 'https://picsum.photos/seed/p1a/80/80',
    image: 'https://picsum.photos/seed/p1b/800/1000',
    likes: 12840,
    caption: 'Golden hour on the canal. Nothing beats this light.',
    comments: 312,
    timeAgo: '2h',
  },
  {
    id: 'p2',
    username: 'wildlight',
    location: 'Patagonia',
    avatar: 'https://picsum.photos/seed/p2a/80/80',
    image: 'https://picsum.photos/seed/p2b/800/800',
    likes: 45201,
    caption: 'Wind, peaks, and a tent that barely held.',
    comments: 891,
    timeAgo: '5h',
  },
  {
    id: 'p3',
    username: 'kitchennotes',
    location: 'Lisbon',
    avatar: 'https://picsum.photos/seed/p3a/80/80',
    image: 'https://picsum.photos/seed/p3b/800/900',
    likes: 3204,
    caption: 'Sourdough attempt #7. Finally something edible.',
    comments: 144,
    timeAgo: '1d',
  },
]
