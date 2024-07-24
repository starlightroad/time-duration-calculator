import type { LabelHTMLAttributes } from 'react';

type Props = Omit<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'> & {
  htmlFor: string;
};

export default function Label({ children, ...props }: Props) {
  return <label {...props}>{children}</label>;
}
