import './StoriesRow.css'

export default function StoriesRow({ stories }) {
  return (
    <div className="stories">
      <div className="stories-track">
        {stories.map((s) => (
          <button key={s.id} type="button" className="story">
            <span className={`story-ring${s.hasNew ? ' story-ring--new' : ''}`}>
              <img src={s.avatar} alt="" width={64} height={64} className="story-img" />
            </span>
            <span className="story-name">{s.username}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
