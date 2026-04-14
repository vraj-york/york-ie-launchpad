import { useState } from 'react'
import { IconHeart, IconComment, IconPaperPlane, IconBookmark, IconMore } from './Icons'
import './PostCard.css'

function formatLikes(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const displayLikes = liked ? post.likes + 1 : post.likes

  return (
    <article className="post">
      <header className="post-header">
        <div className="post-user">
          <span className="post-avatar-ring">
            <img src={post.avatar} alt="" width={36} height={36} className="post-avatar" />
          </span>
          <div className="post-meta">
            <span className="post-username">{post.username}</span>
            {post.location ? <span className="post-location">{post.location}</span> : null}
          </div>
        </div>
        <button type="button" className="post-more" aria-label="More options">
          <IconMore />
        </button>
      </header>

      <div className="post-media">
        <img src={post.image} alt={`Photo by ${post.username}`} loading="lazy" />
      </div>

      <div className="post-actions">
        <div className="post-actions-left">
          <button
            type="button"
            className="post-action"
            aria-pressed={liked}
            aria-label={liked ? 'Unlike' : 'Like'}
            onClick={() => setLiked((v) => !v)}
          >
            <IconHeart filled={liked} size={26} />
          </button>
          <button type="button" className="post-action" aria-label="Comment">
            <IconComment size={26} />
          </button>
          <button type="button" className="post-action" aria-label="Share">
            <IconPaperPlane size={26} />
          </button>
        </div>
        <button
          type="button"
          className="post-action"
          aria-pressed={saved}
          aria-label={saved ? 'Remove save' : 'Save'}
          onClick={() => setSaved((v) => !v)}
        >
          <IconBookmark filled={saved} size={26} />
        </button>
      </div>

      <div className="post-body">
        <p className="post-likes">{formatLikes(displayLikes)} likes</p>
        <p className="post-caption">
          <span className="post-caption-user">{post.username}</span> {post.caption}
        </p>
        <button type="button" className="post-view-comments">
          View all {post.comments} comments
        </button>
        <p className="post-time">{post.timeAgo}</p>
      </div>
    </article>
  )
}
