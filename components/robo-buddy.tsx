'use client'

import { useApp } from '@/lib/app-context'
import { roboMessages } from '@/lib/data'
import type { RoboState } from '@/lib/types'
import { Sparkles, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

/* Body-level animation per state */
function bodyAnimation(state: RoboState): string {
  switch (state) {
    case 'excited':
      return 'robo-bounce 0.7s ease-in-out infinite'
    case 'pointing':
    case 'concerned':
      return 'robo-lean 1.6s ease-in-out infinite'
    case 'listening':
      return 'robo-breathe 1.4s ease-in-out infinite'
    case 'thinking':
      return 'robo-float 2.2s ease-in-out infinite'
    case 'speaking':
      return 'robo-float 2.6s ease-in-out infinite'
    default:
      return 'robo-float 3.4s ease-in-out infinite'
  }
}

function eyeAnimation(state: RoboState): string | undefined {
  switch (state) {
    case 'thinking':
      return 'robo-look-around 1.4s ease-in-out infinite'
    case 'idle':
    case 'speaking':
      return 'robo-blink 4s step-end infinite'
    default:
      return undefined
  }
}

export function RoboBuddy() {
  const { roboState, roboMessage, sayRobo, clearRobo, setRoboState } = useApp()
  const [msgIndex, setMsgIndex] = useState(0)
  const greeted = useRef(false)

  // Proactive greeting: Notice -> think -> get excited -> point -> speak.
  // This is the React equivalent of the original YatriAnimationController.
  useEffect(() => {
    if (greeted.current) return
    greeted.current = true

    const timers = [
      window.setTimeout(() => setRoboState('listening'), 1800),
      window.setTimeout(() => setRoboState('thinking'), 2400),
      window.setTimeout(() => setRoboState('excited'), 3200),
      window.setTimeout(() => setRoboState('pointing'), 4000),
      window.setTimeout(() => sayRobo(roboMessages[0], 'speaking'), 4400),
    ]

    return () => timers.forEach(window.clearTimeout)
  }, [sayRobo, setRoboState])

  // Blink animation for idle eyes uses CSS keyframes defined in globals.css
  useEffect(() => {
    // reset excited/pointing state back to idle after a beat when speaking
    if (roboState === 'excited') {
      const t = setTimeout(() => setRoboState('speaking'), 900)
      return () => clearTimeout(t)
    }
  }, [roboState, setRoboState])

  const isSpeaking = Boolean(roboMessage)
  const worried = roboState === 'concerned'
  const looking = roboState === 'listening'

  const handleTap = () => {
    const next = isSpeaking ? (msgIndex + 1) % roboMessages.length : msgIndex
    setMsgIndex(next)

    // Short attention sequence makes the buddy feel alive rather than like a static chatbot.
    setRoboState('listening')
    window.setTimeout(() => setRoboState('thinking'), 260)
    window.setTimeout(() => setRoboState(next % 2 === 0 ? 'excited' : 'pointing'), 620)
    window.setTimeout(() => sayRobo(roboMessages[next], 'speaking'), 950)
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-24 z-40 flex justify-end px-4">
      <div className="pointer-events-auto flex items-end gap-2">
        {/* Speech bubble */}
        {isSpeaking && (
          <div className="animate-bubble-in relative mb-2 max-w-[15rem] rounded-2xl rounded-br-sm bg-navy px-4 py-3 text-navy-foreground shadow-xl">
            <div className="mb-1 flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-primary" />
              <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-primary">
                Paryata Buddy
              </span>
              <button
                onClick={clearRobo}
                aria-label="Dismiss message"
                className="ml-auto -mr-1 rounded-full p-0.5 text-navy-foreground/60 transition-colors hover:text-navy-foreground"
              >
                <X className="size-3.5" />
              </button>
            </div>
            <p className="text-pretty text-[0.8rem] leading-snug">{roboMessage}</p>
            <button
              onClick={handleTap}
              className="mt-2 text-[0.7rem] font-semibold text-primary underline-offset-2 hover:underline"
            >
              Tell me more
            </button>
            {/* bubble tail */}
            <span className="absolute -bottom-1 right-4 size-3 rotate-45 bg-navy" />
          </div>
        )}

        {/* Robot */}
        <button
          onClick={handleTap}
          aria-label="Open Paryata Buddy assistant"
          className="group relative outline-none"
        >
          <div
            className="relative"
            style={{ animation: bodyAnimation(roboState), transformOrigin: 'bottom center' }}
          >
            <RobotSvg
              looking={looking}
              worried={worried}
              excited={roboState === 'excited'}
              pointing={roboState === 'pointing'}
              eyeAnim={eyeAnimation(roboState)}
            />
          </div>
          {/* soft shadow on ground */}
          <span className="absolute -bottom-1 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-foreground/20 blur-[2px]" />
        </button>
      </div>
    </div>
  )
}

function RobotSvg({
  looking,
  worried,
  excited,
  pointing,
  eyeAnim,
}: {
  looking: boolean
  worried: boolean
  excited: boolean
  pointing: boolean
  eyeAnim?: string
}) {
  // eye pupil offset for "looking toward user"
  const pupilShift = looking ? 1.5 : 0
  return (
    <svg
      width="66"
      height="76"
      viewBox="0 0 66 76"
      fill="none"
      className="drop-shadow-lg"
      role="img"
      aria-hidden="true"
    >
      {/* Antenna */}
      <line
        x1="33"
        y1="14"
        x2="33"
        y2="4"
        stroke="var(--muted-foreground)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="33"
        cy="4"
        r="3.4"
        fill="var(--primary)"
        style={
          excited || pointing
            ? { animation: 'robo-antenna-glow 0.8s ease-in-out infinite' }
            : undefined
        }
      />

      {/* Left arm */}
      <rect
        x="2"
        y="40"
        width="8"
        height="16"
        rx="4"
        fill="#e9edf5"
        stroke="var(--border)"
        strokeWidth="1"
      />
      {/* Right arm — points up when pointing */}
      <g
        style={{
          transformOrigin: '58px 44px',
          transform: pointing ? 'rotate(-42deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease',
        }}
      >
        <rect
          x="56"
          y="40"
          width="8"
          height="16"
          rx="4"
          fill="#e9edf5"
          stroke="var(--border)"
          strokeWidth="1"
        />
      </g>

      {/* Body */}
      <rect
        x="9"
        y="15"
        width="48"
        height="46"
        rx="18"
        fill="#fbfcfe"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      {/* Chest light */}
      <circle cx="33" cy="52" r="2.4" fill="var(--primary)" opacity="0.85" />

      {/* Face screen */}
      <rect x="15" y="22" width="36" height="24" rx="12" fill="var(--navy)" />

      {/* Eyes */}
      <g style={eyeAnim ? { animation: eyeAnim, transformOrigin: '33px 33px' } : undefined}>
        {worried ? (
          <>
            {/* worried angled eyes */}
            <rect x="22" y="30" width="8" height="4.4" rx="2.2" fill="#7fd3ff" transform="rotate(14 26 32)" />
            <rect x="36" y="30" width="8" height="4.4" rx="2.2" fill="#7fd3ff" transform="rotate(-14 40 32)" />
          </>
        ) : excited ? (
          <>
            {/* happy caret eyes ^ ^ */}
            <path d="M22 34 L26 29 L30 34" stroke="#7fd3ff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M36 34 L40 29 L44 34" stroke="#7fd3ff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </>
        ) : (
          <>
            <circle cx={26 + pupilShift} cy="33" r="3.6" fill="#7fd3ff" />
            <circle cx={40 + pupilShift} cy="33" r="3.6" fill="#7fd3ff" />
            {/* glint */}
            <circle cx={24.6 + pupilShift} cy="31.6" r="1" fill="#ffffff" />
            <circle cx={38.6 + pupilShift} cy="31.6" r="1" fill="#ffffff" />
          </>
        )}
      </g>

      {/* Feet */}
      <rect x="18" y="60" width="12" height="8" rx="4" fill="#e9edf5" stroke="var(--border)" strokeWidth="1" />
      <rect x="36" y="60" width="12" height="8" rx="4" fill="#e9edf5" stroke="var(--border)" strokeWidth="1" />
    </svg>
  )
}
