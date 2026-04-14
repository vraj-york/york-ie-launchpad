import './Explore.css'

const tiles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  src: `https://picsum.photos/seed/ex${i}/600/600`,
}))

export default function Explore() {
  return (
    <div className="page explore">
      <h1 className="explore-title sr-only">Explore</h1>
      <div className="explore-grid">
        {tiles.map((t, index) => (
          <button
            key={t.id}
            type="button"
            className={`explore-tile${index % 7 === 0 ? ' explore-tile--tall' : ''}`}
          >
            <img src={t.src} alt="" loading="lazy" />
            <span className="explore-overlay" aria-hidden />
          </button>
        ))}
      </div>
    </div>
  )
}
