'use client'

import { useApp } from '@/lib/app-context'
import { roboMessages } from '@/lib/data'
import type { RoboState } from '@/lib/types'
import { Sparkles, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

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

    case 'happy':
      return 'robo-bounce 1.2s ease-in-out infinite'

    default:
      return 'robo-float 3.4s ease-in-out infinite'
  }
}

function eyeAnimation(
  state: RoboState,
): string | undefined {
  switch (state) {
    case 'thinking':
      return 'robo-look-around 1.4s ease-in-out infinite'

    case 'idle':
    case 'speaking':
    case 'happy':
      return 'robo-blink 4s step-end infinite'

    default:
      return undefined
  }
}

export function RoboBuddy() {
  const {
    roboState,
    roboMessage,
    sayRobo,
    clearRobo,
    setRoboState,
  } = useApp()

  const [msgIndex, setMsgIndex] = useState(0)

  const greeted = useRef(false)

  /*
   * First-time introduction.
   *
   * Paryata notices the traveller,
   * thinks for a moment,
   * gets excited,
   * points,
   * then speaks.
   */
  useEffect(() => {
    if (greeted.current) return

    greeted.current = true

    const timers = [
      window.setTimeout(
        () => setRoboState('listening'),
        1800,
      ),

      window.setTimeout(
        () => setRoboState('thinking'),
        2400,
      ),

      window.setTimeout(
        () => setRoboState('excited'),
        3200,
      ),

      window.setTimeout(
        () => setRoboState('pointing'),
        4000,
      ),

      window.setTimeout(
        () =>
          sayRobo(
            roboMessages[0] ??
              'Hey! I am Paryata. Let me help you discover India differently.',
            'speaking',
          ),
        4400,
      ),
    ]

    return () => {
      timers.forEach(
        window.clearTimeout,
      )
    }
  }, [
    sayRobo,
    setRoboState,
  ])

  /*
   * After getting excited,
   * transition naturally into speaking.
   */
  useEffect(() => {
    if (roboState !== 'excited') {
      return
    }

    const timer =
      window.setTimeout(
        () => setRoboState('speaking'),
        900,
      )

    return () =>
      window.clearTimeout(timer)
  }, [
    roboState,
    setRoboState,
  ])

  const isSpeaking =
    Boolean(roboMessage)

  const worried =
    roboState === 'concerned'

  const looking =
    roboState === 'listening'

  /*
   * Tapping Paryata cycles through
   * its messages and creates a small
   * attention sequence.
   */
  const handleTap = () => {
    const nextIndex =
      isSpeaking
        ? (msgIndex + 1) %
          Math.max(
            roboMessages.length,
            1,
          )
        : msgIndex

    setMsgIndex(nextIndex)

    setRoboState('listening')

    window.setTimeout(
      () =>
        setRoboState(
          'thinking',
        ),
      260,
    )

    window.setTimeout(
      () =>
        setRoboState(
          nextIndex % 2 === 0
            ? 'excited'
            : 'pointing',
        ),
      620,
    )

    window.setTimeout(
      () =>
        sayRobo(
          roboMessages[
            nextIndex
          ] ??
            'I am keeping an eye out for places that match your travel style.',
          'speaking',
        ),
      950,
    )
  }

  return (
    <div className="pointer-events-none fixed bottom-24 left-1/2 z-[9999] w-full max-w-md -translate-x-1/2 px-4">
      <div className="pointer-events-auto flex items-end justify-end gap-2">
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

            <p className="text-pretty text-[0.8rem] leading-snug">
              {roboMessage}
            </p>

            <button
              onClick={handleTap}
              className="mt-2 text-[0.7rem] font-semibold text-primary underline-offset-2 hover:underline"
            >
              Tell me more
            </button>

            <span className="absolute -bottom-1 right-4 size-3 rotate-45 bg-navy" />
          </div>
        )}

        <button
          onClick={handleTap}
          aria-label="Open Paryata Buddy assistant"
          className="group relative outline-none"
        >
          <div
            className="relative"
            style={{
              animation:
                bodyAnimation(
                  roboState,
                ),
              transformOrigin:
                'bottom center',
            }}
          >
            <RobotSvg
              looking={looking}
              worried={worried}
              excited={
                roboState ===
                'excited'
              }
              pointing={
                roboState ===
                'pointing'
              }
              eyeAnim={eyeAnimation(
                roboState,
              )}
            />
          </div>

          {/* Warm shadow under Paryata */}
          <span className="absolute -bottom-1 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-black/40 blur-[2px]" />
        </button>
      </div>
    </div>
  )
}


/* =========================================================
   PARYATA ROBOT
   ========================================================= */

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
  const pupilShift =
    looking ? 1.5 : 0

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

      {/* =====================================================
          ANTENNA
          ===================================================== */}

      <line
        x1="33"
        y1="14"
        x2="33"
        y2="4"
        stroke="#8B6F5C"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <circle
        cx="33"
        cy="4"
        r="3.4"
        fill="#C66A45"
        style={
          excited || pointing
            ? {
                animation:
                  'robo-antenna-glow 0.8s ease-in-out infinite',
              }
            : undefined
        }
      />


      {/* =====================================================
          LEFT ARM
          ===================================================== */}

      <rect
        x="2"
        y="40"
        width="8"
        height="16"
        rx="4"
        fill="#D8C2AE"
        stroke="#5A3A2A"
        strokeWidth="1"
      />


      {/* =====================================================
          RIGHT ARM
          ===================================================== */}

      <g
        style={{
          transformOrigin:
            '58px 44px',
          transform:
            pointing
              ? 'rotate(-42deg)'
              : 'rotate(0deg)',
          transition:
            'transform 0.3s ease',
        }}
      >
        <rect
          x="56"
          y="40"
          width="8"
          height="16"
          rx="4"
          fill="#D8C2AE"
          stroke="#5A3A2A"
          strokeWidth="1"
        />
      </g>


      {/* =====================================================
          BODY
          ===================================================== */}

      <rect
        x="9"
        y="15"
        width="48"
        height="46"
        rx="18"
        fill="#E6D3C0"
        stroke="#5A3A2A"
        strokeWidth="1.5"
      />


      {/* =====================================================
          SUBTLE BODY HIGHLIGHT
          ===================================================== */}

      <path
        d="M20 19 C25 16 41 16 47 20"
        stroke="#F3E5D6"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />


      {/* =====================================================
          CHEST LIGHT
          ===================================================== */}

      <circle
        cx="33"
        cy="52"
        r="2.4"
        fill="#D89A5B"
        opacity="0.95"
      />


      {/* =====================================================
          FACE
          ===================================================== */}

      <rect
        x="15"
        y="22"
        width="36"
        height="24"
        rx="12"
        fill="#2A1A14"
      />


      {/* =====================================================
          FACE INNER GLOW
          ===================================================== */}

      <rect
        x="17"
        y="24"
        width="32"
        height="20"
        rx="10"
        fill="#21140F"
        opacity="0.75"
      />


      {/* =====================================================
          EYES
          ===================================================== */}

      <g
        style={
          eyeAnim
            ? {
                animation:
                  eyeAnim,
                transformOrigin:
                  '33px 33px',
              }
            : undefined
        }
      >

        {/* WORRIED */}
        {worried ? (
          <>
            <rect
              x="22"
              y="30"
              width="8"
              height="4.4"
              rx="2.2"
              fill="#D89A5B"
              transform="rotate(14 26 32)"
            />

            <rect
              x="36"
              y="30"
              width="8"
              height="4.4"
              rx="2.2"
              fill="#D89A5B"
              transform="rotate(-14 40 32)"
            />
          </>
        ) : excited ? (

          /* =================================================
             EXCITED EYES
             ================================================= */

          <>
            <path
              d="M22 34 L26 29 L30 34"
              stroke="#D89A5B"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            <path
              d="M36 34 L40 29 L44 34"
              stroke="#D89A5B"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </>

        ) : (

          /* =================================================
             NORMAL EYES
             ================================================= */

          <>
            <circle
              cx={26 + pupilShift}
              cy="33"
              r="3.6"
              fill="#D89A5B"
            />

            <circle
              cx={40 + pupilShift}
              cy="33"
              r="3.6"
              fill="#D89A5B"
            />

            {/* Eye highlights */}
            <circle
              cx={24.6 + pupilShift}
              cy="31.6"
              r="1"
              fill="#FFF1DF"
            />

            <circle
              cx={38.6 + pupilShift}
              cy="31.6"
              r="1"
              fill="#FFF1DF"
            />
          </>
        )}
      </g>


      {/* =====================================================
          FEET
          ===================================================== */}

      <rect
        x="18"
        y="60"
        width="12"
        height="8"
        rx="4"
        fill="#D8C2AE"
        stroke="#5A3A2A"
        strokeWidth="1"
      />

      <rect
        x="36"
        y="60"
        width="12"
        height="8"
        rx="4"
        fill="#D8C2AE"
        stroke="#5A3A2A"
        strokeWidth="1"
      />

    </svg>
  )
}