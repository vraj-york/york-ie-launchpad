import './CreatePost.css'
import { LiveVideoIcon, PhotoVideoIcon, SmileIcon } from './Icons'

export function CreatePost() {
  return (
    <section className="fb-create-post" aria-label="Create a post">
      <div className="fb-create-post__row">
        <span className="fb-avatar fb-avatar--lg">A</span>
        <button type="button" className="fb-create-post__input">
          What&apos;s on your mind, Anna?
        </button>
      </div>
      <div className="fb-create-post__actions">
        <button type="button" className="fb-create-action">
          <LiveVideoIcon />
          <span>red</span>
        </button>
        <button type="button" className="fb-create-action">
          <PhotoVideoIcon />
          <span>Photo/video</span>
        </button>
        <button type="button" className="fb-create-action">
          <SmileIcon />
          <span>Feeling/activity</span>
        </button>
      </div>
    </section>
  )
}
