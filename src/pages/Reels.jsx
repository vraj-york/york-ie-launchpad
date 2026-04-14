import { useCallback, useEffect, useRef, useState } from 'react'
import {
  IconHeart,
  IconComment,
  IconPaperPlane,
  IconBookmark,
  IconVolumeOn,
  IconVolumeOff,
} from '../components/Icons'
import { reels } from '../data/mockData'
import './Reels.css'

function formatCount(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

function ReelSlide({ reel, active, globallyMuted, onToggleGlobalMute }) {
  const videoRef = useRef(null)
  const tapTimerRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [progress, setProgress] = useState(0)
  const [burst, setBurst] = useState(false)

  useEffect(() => {
    if (!active) {
      setPaused(false)
      const v = videoRef.current
      if (v) {
        v.pause()
        v.currentTime = 0
      }
      return
    }
    const v = videoRef.current
    if (!v) return
    v.muted = globallyMuted
    if (!paused) {
      const p = v.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }
  }, [active, paused, globallyMuted])

  const onTimeUpdate = useCallback(() => {
    const v = videoRef.current
    if (!v || !v.duration) return
    setProgress(v.currentTime / v.duration)
  }, [])

  const togglePauseFromTap = useCallback(() => {
    const v = videoRef.current
    if (!v || !active) return
    if (paused) {
      setPaused(false)
      const p = v.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    } else {
      setPaused(true)
      v.pause()
    }
  }, [active, paused])

  const triggerLikeBurst = useCallback(() => {
    setLiked(true)
    setBurst(true)
    window.setTimeout(() => setBurst(false), 900)
  }, [])

  const onVideoTap = useCallback(() => {
    if (tapTimerRef.current) {
      window.clearTimeout(tapTimerRef.current)
      tapTimerRef.current = null
      triggerLikeBurst()
      return
    }
    tapTimerRef.current = window.setTimeout(() => {
      tapTimerRef.current = null
      togglePauseFromTap()
    }, 260)
  }, [togglePauseFromTap, triggerLikeBurst])

  useEffect(() => {
    return () => {
      if (tapTimerRef.current) window.clearTimeout(tapTimerRef.current)
    }
  }, [])

  const displayLikes = liked ? reel.likes + 1 : reel.likes

  return (
    <section
      className="reel-slide"
      data-reel-id={reel.id}
      aria-label={`Reel from ${reel.username}`}
    >
      <div className="reel-frame">
        <div
          className="reel-progress"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden
        />

        <button
          type="button"
          className="reel-video-hit"
          aria-label={paused ? 'Play' : 'Pause'}
          onClick={onVideoTap}
        >
          <video
            ref={videoRef}
            className="reel-video"
            src={reel.video}
            playsInline
            loop
            muted={globallyMuted}
            onTimeUpdate={onTimeUpdate}
          />
          {burst ? (
            <span className="reel-burst" aria-hidden>
              <IconHeart filled size={88} />
            </span>
          ) : null}
          {paused && active ? (
            <span className="reel-pause-icon" aria-hidden>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="rgba(255,255,255,0.92)">
                <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
              </svg>
            </span>
          ) : null}
        </button>

        {active ? (
          <button
            type="button"
            className="reel-mute"
            onClick={(e) => {
              e.stopPropagation()
              onToggleGlobalMute()
            }}
            aria-label={globallyMuted ? 'Unmute' : 'Mute'}
          >
            {globallyMuted ? <IconVolumeOff size={22} /> : <IconVolumeOn size={22} />}
          </button>
        ) : null}

        <div className="reel-right-rail">
          <div className="reel-avatar-stack">
            <img src={reel.avatar} alt="" className="reel-avatar" width={44} height={44} />
            <button type="button" className="reel-follow-plus" aria-label={`Follow ${reel.username}`}>
              +
            </button>
          </div>
          <button
            type="button"
            className="reel-rail-btn"
            aria-pressed={liked}
            aria-label={liked ? 'Unlike' : 'Like'}
            onClick={() => setLiked((v) => !v)}
          >
            <IconHeart filled={liked} size={30} />
            <span className="reel-rail-count">{formatCount(displayLikes)}</span>
          </button>
          <button type="button" className="reel-rail-btn" aria-label="Comment">
            <IconComment size={30} />
            <span className="reel-rail-count">{formatCount(reel.comments)}</span>
          </button>
          <button type="button" className="reel-rail-btn" aria-label="Share">
            <IconPaperPlane size={28} />
          </button>
          <button
            type="button"
            className="reel-rail-btn"
            aria-label={saved ? 'Remove save' : 'Save'}
            aria-pressed={saved}
            onClick={() => setSaved((v) => !v)}
          >
            <IconBookmark filled={saved} size={26} />
          </button>
          <button
            type="button"
            className="reel-rail-audio"
            aria-label={`Audio: ${reel.audioLabel}`}
          >
            <span
              className={`reel-disc ${active && !paused ? 'reel-disc--spin' : ''}`}
              style={{ backgroundImage: `url(${reel.avatar})` }}
              aria-hidden
            />
          </button>
        </div>

        <div className="reel-bottom">
          <div className="reel-user-row">
            <span className="reel-username">{reel.username}</span>
            <button type="button" className="reel-follow-pill">
              Follow
            </button>
          </div>
          <p className="reel-caption">{reel.caption}</p>
          <p className="reel-audio">
            <span className="reel-audio-note" aria-hidden>
              {'\u266A'}
            </span>
            <span className="reel-audio-marquee">
              <span>{reel.audioLabel}</span>
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default function Reels() {
  const containerRef = useRef(null)
  const ratiosRef = useRef(new Map())
  const [activeId, setActiveId] = useState(reels[0]?.id ?? '')
  const [globallyMuted, setGloballyMuted] = useState(true)

  useEffect(() => {
    const root = containerRef.current
    if (!root || reels.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.dataset.reelId
          if (!id) continue
          if (e.isIntersecting) ratiosRef.current.set(id, e.intersectionRatio)
          else ratiosRef.current.delete(id)
        }
        let bestId = reels[0].id
        let best = 0
        for (const [id, r] of ratiosRef.current) {
          if (r > best) {
            best = r
            bestId = id
          }
        }
        setActiveId(bestId)
      },
      { root, threshold: [0, 0.08, 0.16, 0.24, 0.32, 0.4, 0.48, 0.56, 0.64, 0.72, 0.8, 0.88, 0.96, 1] },
    )

    const slides = root.querySelectorAll('[data-reel-id]')
    slides.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const step = () => root.clientHeight || window.innerHeight

    const onKey = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        root.scrollBy({ top: step(), behavior: 'smooth' })
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        root.scrollBy({ top: -step(), behavior: 'smooth' })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const toggleGlobalMute = useCallback(() => {
    setGloballyMuted((m) => !m)
  }, [])

  return (
    <div className="reels-page">
      <div className="reels-scroller" ref={containerRef}>
        {reels.map((reel) => (
          <ReelSlide
            key={reel.id}
            reel={reel}
            active={activeId === reel.id}
            globallyMuted={globallyMuted}
            onToggleGlobalMute={toggleGlobalMute}
          />
        ))}
      </div>
    </div>
  )
}
