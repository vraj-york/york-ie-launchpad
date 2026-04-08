import './PostCard.css'
import { LikeIcon, CommentIcon, ShareIcon } from './Icons'

export function PostCard({ author, time, text, imageGradient, likes, comments, shares }) {
  return (
    <article className="fb-post">
      <header className="fb-post__header">
        <div className="fb-post__author">
          <span className="fb-avatar fb-avatar--post">{author[0]}</span>
          <div>
            <div className="fb-post__name-row">
              <a href="#" className="fb-post__name">
                {author}
              </a>
            </div>
            <div className="fb-post__meta">
              <span>{time}</span>
              <span className="fb-dot" aria-hidden>
                ·
              </span>
              <span className="fb-post__public" title="Public">
                🌎
              </span>
            </div>
          </div>
        </div>
        <button type="button" className="fb-post__more" aria-label="Post options">
          ···
        </button>
      </header>

      {text ? <p className="fb-post__text">{text}</p> : null}

      {imageGradient && (
        <div className="fb-post__media" style={{ background: imageGradient }} role="img" aria-label="" />
      )}

      <div className="fb-post__stats">
        <div className="fb-post__likes">
          <span className="fb-like-bubble">
            <LikeIcon />
          </span>
          <span>{likes}</span>
        </div>
        <div className="fb-post__counts">
          <button type="button">{comments} comments</button>
          <button type="button">{shares} shares</button>
        </div>
      </div>

      <div className="fb-post__actions">
        <button type="button">
          <LikeIcon />
          <span>Like</span>
        </button>
        <button type="button">
          <CommentIcon />
          <span>Comment</span>
        </button>
        <button type="button">
          <ShareIcon />
          <span>Share</span>
        </button>
      </div>
    </article>
  )
}
