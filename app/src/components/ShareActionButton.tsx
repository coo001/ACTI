/**
 * ShareActionButton — 이미지/링크/카톡 공유 액션.
 * 명세: outputs/stage-2/component-spec-web.md C8
 */

import { useState } from 'react';
import { ImageDown, Link2, MessageCircle, Check, Loader2 } from 'lucide-react';
import './ShareActionButton.css';

type ShareType = 'image' | 'link' | 'kakao';

type Props = {
  type: ShareType;
  onAction: () => Promise<void> | void;
  disabled?: boolean;
};

const LABEL: Record<ShareType, string> = {
  image: '이미지 저장',
  link: '링크 복사',
  kakao: '카톡 공유',
};

const ICON: Record<ShareType, typeof ImageDown> = {
  image: ImageDown,
  link: Link2,
  kakao: MessageCircle,
};

export default function ShareActionButton({ type, onAction, disabled }: Props) {
  const [state, setState] = useState<'idle' | 'loading' | 'success'>('idle');
  const Icon = ICON[type];

  const handleClick = async () => {
    if (state !== 'idle' || disabled) return;
    setState('loading');
    try {
      await onAction();
      setState('success');
      setTimeout(() => setState('idle'), 1200);
    } catch (e) {
      console.error('Share action failed', e);
      setState('idle');
    }
  };

  return (
    <button
      type="button"
      className="share"
      onClick={handleClick}
      disabled={disabled || state !== 'idle'}
      aria-label={`${LABEL[type]}`}
    >
      {state === 'loading' && <Loader2 size={24} className="share__spin" aria-hidden="true" />}
      {state === 'success' && <Check size={24} aria-hidden="true" />}
      {state === 'idle' && <Icon size={24} aria-hidden="true" />}
      <span className="share__label">{LABEL[type]}</span>
    </button>
  );
}
