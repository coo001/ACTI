/**
 * PrimaryButton — CTA.
 * 명세: outputs/stage-2/component-spec-web.md C3
 */

import type { ReactNode, MouseEventHandler } from 'react';
import './PrimaryButton.css';

type Props = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  fullWidth?: boolean;
  size?: 'md' | 'lg';
  disabled?: boolean;
  as?: 'button' | 'a';
  href?: string;
};

export default function PrimaryButton({
  children,
  onClick,
  fullWidth = true,
  size = 'lg',
  disabled = false,
  as = 'button',
  href,
}: Props) {
  const cls = [
    'cta',
    `cta--${size}`,
    fullWidth ? 'cta--full' : '',
  ].filter(Boolean).join(' ');

  if (as === 'a' && href) {
    return (
      <a className={cls} href={href} onClick={onClick as MouseEventHandler<HTMLAnchorElement>}>
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={cls}
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
      disabled={disabled}
      aria-disabled={disabled || undefined}
    >
      {children}
    </button>
  );
}
