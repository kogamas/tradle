import {
  computeProximityPercent,
  Direction,
  formatDistance,
  generateSquareCharacters,
} from "../domain/geography";
import { constructOecLink, Guess } from "../domain/guess";
import React, { useCallback, useEffect, useState } from "react";
import CountUp from "react-countup";
import { SettingsData } from "../hooks/useSettings";
import { getCountryPrettyName } from "../domain/countries";

const DIRECTION_ARROWS: Record<Direction, string> = {
  N: "⬆️",
  NE: "↗️",
  E: "➡️",
  SE: "↘️",
  S: "⬇️",
  SW: "↙️",
  W: "⬅️",
  NW: "↖️",
};

const SQUARE_ANIMATION_LENGTH = 250;
type AnimationState = "NOT_STARTED" | "RUNNING" | "ENDED";

function getDirectionOrCelebration(guess: Guess | undefined): string | null {
  if (!guess) {
    return null;
  }
  if (guess.distance === 0) {
    return "🎉";
  }
  return DIRECTION_ARROWS[guess.direction];
}

interface GuessRowProps {
  readonly guess?: Guess;
  readonly settingsData: SettingsData;
  readonly countryInputRef?: React.RefObject<HTMLInputElement>;
}

export function GuessRow(props: Readonly<GuessRowProps>): JSX.Element {
  const { guess, settingsData, countryInputRef } = props;
  const { distanceUnit, theme } = settingsData;
  const proximity = guess == null ? 0 : computeProximityPercent(guess.distance);
  const squares = generateSquareCharacters(proximity, theme);

  const [animationState, setAnimationState] =
    useState<AnimationState>("NOT_STARTED");

  useEffect(() => {
    if (guess == null) {
      return;
    }

    setAnimationState("RUNNING");
    const timeout = setTimeout(() => {
      setAnimationState("ENDED");
    }, SQUARE_ANIMATION_LENGTH * 6);

    return () => {
      clearTimeout(timeout);
    };
  }, [guess]);

  const handleClickOnEmptyRow = useCallback(() => {
    if (countryInputRef?.current != null) {
      countryInputRef?.current.focus();
    }
  }, [countryInputRef]);

  switch (animationState) {
    case "NOT_STARTED":
      return (
        <button
          onClick={handleClickOnEmptyRow}
          className="bg-gray-200 rounded-lg my-1 col-span-7 h-8 border-0"
          type="button"
        />
      );
    case "RUNNING":
      return (
        <>
          <div
            className={`flex text-2xl w-full justify-evenly items-center col-span-6 border-2 h-8`}
          >
            {squares.map((character, charIndex) => (
              <div
                key={`${charIndex}-${character}`}
                className="opacity-0 animate-reveal"
                style={{
                  animationDelay: `${SQUARE_ANIMATION_LENGTH * charIndex}ms`,
                }}
              >
                {character}
              </div>
            ))}
          </div>
          <div className="border-2 h-8 col-span-1 animate-reveal">
            <CountUp
              end={proximity}
              suffix="%"
              duration={(SQUARE_ANIMATION_LENGTH * 5) / 1000}
            />
          </div>
        </>
      );
    case "ENDED": {
      const countrySectionStyle = {
        display: "flex",
        justifyContent: "space-between",
        padding: "16px",
      };
      return (
        <>
          <div
            className={
              guess?.distance === 0
                ? "bg-oec-yellow rounded-lg flex items-center h-8 col-span-3 animate-reveal pl-2"
                : "bg-gray-200 rounded-lg flex items-center h-8 col-span-3 animate-reveal pl-2"
            }
            style={countrySectionStyle}
          >
            <p className="text-ellipsis overflow-hidden whitespace-nowrap">
              {getCountryPrettyName(guess?.name)}
            </p>
            <p>
              {guess?.country ? (
                <a
                  href={constructOecLink(guess.country)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              ) : null}
            </p>
          </div>
          <div
            className={
              guess?.distance === 0
                ? "bg-oec-yellow rounded-lg flex items-center justify-center h-8 col-span-2 animate-reveal"
                : "bg-gray-200 rounded-lg flex items-center justify-center h-8 col-span-2 animate-reveal"
            }
          >
            {guess ? formatDistance(guess.distance, distanceUnit) : null}
          </div>
          <div
            className={
              guess?.distance === 0
                ? "bg-oec-yellow rounded-lg flex items-center justify-center h-8 col-span-1 animate-reveal"
                : "bg-gray-200 rounded-lg flex items-center justify-center h-8 col-span-1 animate-reveal"
            }
          >
            {getDirectionOrCelebration(guess)}
          </div>
          <div
            className={
              guess?.distance === 0
                ? "bg-oec-yellow rounded-lg flex items-center justify-center h-8 col-span-1 animate-reveal"
                : "bg-gray-200 rounded-lg flex items-center justify-center h-8 col-span-1 animate-reveal"
            }
          >
            {`${proximity}%`}
          </div>
        </>
      );
    }
  }
}
