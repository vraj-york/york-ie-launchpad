import { Stories } from './Stories'
import { CreatePost } from './CreatePost'
import { PostCard } from './PostCard'

const posts = [
  {
    author: 'State Parks Community',
    time: '3h',
    text: 'Golden hour never gets old. Share your favorite trail photo below!',
    imageGradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    likes: '12K',
    comments: '842',
    shares: '201',
  },
  {
    author: 'Alex Thompson',
    time: '8h',
    text: 'Finally finished the redesign. Coffee first, deploy second ☕',
    imageGradient: null,
    likes: '234',
    comments: '31',
    shares: '5',
  },
  {
    author: 'Design Weekly',
    time: '1d',
    text: 'Ten layout tips that make any UI feel more polished (thread 👇)',
    imageGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    likes: '3.2K',
    comments: '156',
    shares: '89',
  },
]

export function Feed() {
  return (
    <main className="fb-feed" aria-label="News feed">
      <Stories />
      <CreatePost />
      {posts.map((p) => (
        <PostCard key={p.author + p.time} {...p} />
      ))}
    </main>
  )
}
