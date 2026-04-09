import './Stories.css'
import { PlusIcon } from './Icons'

const stories = [
  { name: 'New Story', isCreate: true },
  { name: 'Alex', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { name: 'Sam', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { name: 'Jordan', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  { name: 'Riley', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
  { name: 'Morgan', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' },
]

export function Stories() {
  return (
    <section className="fb-stories" aria-label="Stories">
      <ul className="fb-stories__track">
        {stories.map((s) => (
          <li key={s.name} className="fb-story-card-wrap">
            <button type="button" className="fb-story-card">
              {s.isCreate ? (
                <>
                  <div
                    className="fb-story-card__bg fb-story-card__bg--create"
                    style={{ background: '#fff' }}
                  >
                    <div className="fb-story-create-top" />
                    <div className="fb-story-create-bottom">
                      <span className="fb-story-create-plus">
                        <PlusIcon />
                      </span>
                    </div>
                  </div>
                  <span className="fb-story-label">{s.name}</span>
                </>
              ) : (
                <>
                  <div className="fb-story-card__bg" style={{ background: s.gradient }} />
                  <span className="fb-story-avatar">
                    {s.name[0]}
                  </span>
                  <span className="fb-story-label fb-story-label--on-photo">{s.name}</span>
                </>
              )}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
