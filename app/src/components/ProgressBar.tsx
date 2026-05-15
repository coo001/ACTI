/**
 * ProgressBar — 문항 풀이 진행률 (S2 상단 sticky).
 * 명세: outputs/stage-2/component-spec-web.md C5
 */

import { ChevronLeft } from 'lucide-react';
import './ProgressBar.css';

type Props = {
  current: number;   // 1-based
  total: number;
  onBack?: () => void;
};

export default function ProgressBar({ current, total, onBack }: Props) {
  const pct = Math.max(0, Math.min(100, (current / total) * 100));
  return (
    <div className="progress-bar">
      <button
        type="button"
        className="progress-bar__back"
        onClick={onBack}
        disabled={!onBack}
        aria-label="이전 문항"
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <div
        className="progress-bar__track"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`${current} / ${total}`}
      >
        <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-bar__counter">{current} / {total}</span>
    </div>
  );
}
