interface ArrayBarProps {
  number: number;
  color: string;
}
interface LLProps {
  key: string;
  second: number;
  value: number;
  next: boolean;
  prev: boolean;
  circular: boolean;
  head: boolean;
  tail: boolean;
  only?: boolean;
}

interface BarProps {
  size: number;
  color: string;
  number: number;
  maxHeightCount: number;
}
interface ArrayElementModalProps {
  isOpen: boolean;
  closeModal: () => void;
  data: ArrayBarProps[];
  maxNumber: number;
  operation: string;
  dataReturn: (element: ArrayBarProps, type: string, position?: number) => void;
}
interface ButtonProps {
  title: string;
  click: () => void;
  disabled?: boolean;
}

interface OptionProps {
  options: string[];
  change: (e: any) => void;
  disabled?: boolean;
}
export type {
  ArrayBarProps,
  LLProps,
  BarProps,
  ArrayElementModalProps,
  ButtonProps,
  OptionProps,
};
