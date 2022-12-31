import Select from "react-select";
import type { GroupBase, Props } from "react-select";
import { useHydrated } from "remix-utils";

export function RemixReactSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: Props<Option, IsMulti, Group> & { customValue: string; name: string }
) {
  const isHydrated = useHydrated();

  if (!isHydrated) return null;
  return (
    <>
      <input
        type={"hidden"}
        className="border-r"
        value={props.customValue}
        name={props.name}
      />
      <Select
        {...props}
        theme={(theme) => ({ ...theme, borderRadius: 0 })}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: ".5rem",
            lineHeight: 2,
            borderColor: `hsl(var(--bc)/var(--tw-border-opacity))`,

            backgroundColor: `hsl(var(--b1)/var(--tw-bg-opacity))`,
            color: "inherit",
          }),
          singleValue: (baseStyles, state) => ({
            ...baseStyles,
            color: "inherit",
          }),
        }}
        classNames={{
          container: ({ isFocused }) => {
            return `w-full max-w-xs select-bordered`;
          },
          control: ({ isFocused }) => {
            return `h-12`;
          },
        }}
      />
    </>
  );
}
