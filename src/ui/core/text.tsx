import type { HTMLAttributes } from 'react';

export default function Text({ children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props}>{children}</p>;
}
