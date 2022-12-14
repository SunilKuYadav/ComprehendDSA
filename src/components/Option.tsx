import { OptionProps } from "../_types";

const Option = (props: OptionProps) => {
  const { change, options, disabled } = props;

  return (
    <select className="select" onChange={change} disabled={disabled}>
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default Option;
