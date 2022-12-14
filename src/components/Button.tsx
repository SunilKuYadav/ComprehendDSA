import { ButtonProps } from "../_types";

const Button = (props: ButtonProps) => {
  const { click, title, disabled } = props;
  return (
    <button className="btn" disabled={disabled} onClick={click}>
      {title}
    </button>
  );
};

export default Button;
