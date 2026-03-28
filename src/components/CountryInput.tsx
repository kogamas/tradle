import React, { forwardRef, Dispatch, SetStateAction } from "react";
import { countries, sanitizeCountryName } from "../domain/countries";
import { Group, Text, Autocomplete } from "@mantine/core";
import { flag } from "country-emoji";

interface CountryInputProps {
  readonly setCountryValue: Dispatch<SetStateAction<string>>;
  readonly countryValue: string;
  readonly setCurrentGuess: (guess: string) => void;
}

interface ItemProps {
  value: string;
  id: string;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, value, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Text>{flag(id)}</Text>
        <div>
          <Text>{value}</Text>
        </div>
      </Group>
    </div>
  )
);
AutoCompleteItem.displayName = "Autocomplete Item";

export function CountryInput(props: Readonly<CountryInputProps>): JSX.Element {
  const { countryValue, setCountryValue, setCurrentGuess } = props;
  const items = countries.map((country) => ({
    name: country.name,
    value: `${country.name}`,
    id: country.code,
  }));
  return (
    <Autocomplete
      autoComplete="noautocompleteplzz"
      placeholder="Pick a location"
      limit={5}
      itemComponent={AutoCompleteItem}
      data={items}
      filter={(value, item) =>
        item.value
          .toLowerCase()
          .normalize("NFD")
          .replaceAll(/\p{Diacritic}/gu, "")
          .includes(value.toLowerCase().trim()) ||
        item.id.toLowerCase().includes(value.toLowerCase().trim())
      }
      onItemSubmit={(item) => {
        setCurrentGuess(sanitizeCountryName(item.value));
      }}
      value={countryValue}
      onChange={setCountryValue}
    />
  );
}
