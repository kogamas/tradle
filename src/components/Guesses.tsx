import { Guess } from "../domain/guess";
import { GuessRow } from "./GuessRow";
import React from "react";
import { SettingsData } from "../hooks/useSettings";

interface GuessesProps {
  rowCount: number;
  guesses: Guess[];
  settingsData: SettingsData;
  countryInputRef?: React.RefObject<HTMLInputElement>;
}

export function Guesses(props: Readonly<GuessesProps>): JSX.Element {
  const { rowCount, guesses, settingsData, countryInputRef } = props;
  return (
    <div>
      <div className="grid grid-cols-7 gap-1 text-center font-semibold">
        {new Array(rowCount).fill(null).map((_, index) => (
          <GuessRow
            key={`guess-${index}`}
            guess={guesses[index]}
            settingsData={settingsData}
            countryInputRef={countryInputRef}
          />
        ))}
      </div>
    </div>
  );
}
