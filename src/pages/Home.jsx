import StoriesRow from '../components/StoriesRow'
import PostCard from '../components/PostCard'
import RightPanel from '../components/RightPanel'
import { posts, stories } from '../data/mockData'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <div className="home-feed">
        <StoriesRow stories={stories} />
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="home-aside">
        <RightPanel />
      </div>
    </div>
  )
}
