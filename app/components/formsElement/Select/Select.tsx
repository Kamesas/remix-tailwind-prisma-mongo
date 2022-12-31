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
      <input type={"hidden"} value={props.customValue} name={props.name} />
      <Select {...props} theme={(theme) => ({ ...theme, borderRadius: 0 })} />
    </>
  );
}
