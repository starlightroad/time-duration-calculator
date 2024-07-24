import type { AnchorHTMLAttributes } from 'react';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
};

export default function Link({ children, href, ...props }: Props) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
