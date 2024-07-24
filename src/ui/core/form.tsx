import type { FormHTMLAttributes } from 'react';

export default function Form({ children, ...props }: FormHTMLAttributes<HTMLFormElement>) {
  return <form {...props}>{children}</form>;
}
