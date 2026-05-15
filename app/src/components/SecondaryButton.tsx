/**
 * SecondaryButton — 약한 CTA (다시 풀기, S4 보조 등).
 * 명세: outputs/stage-2/component-spec-web.md C4
 */

import type { ReactNode, MouseEventHandler } from 'react';
import './SecondaryButton.css';

type Props = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  fullWidth?: boolean;
  size?: 'md' | 'lg';
  disabled?: boolean;
  as?: 'button' | 'a';
  href?: string;
};

export default function SecondaryButton({
  children,
  onClick,
  fullWidth = true,
  size = 'md',
  disabled = false,
  as = 'button',
  href,
}: Props) {
  const cls = [
    'secondary',
    `secondary--${size}`,
    fullWidth ? 'secondary--full' : '',
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
    >
      {children}
    </button>
  );
}
