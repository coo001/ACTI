/**
 * CaptureCard — 결과지 캡처 영역. html-to-image 친화.
 * 명세: outputs/stage-2/component-spec-web.md C6
 */

import { forwardRef } from 'react';
import Badge from './Badge';
import type { TypeIndex } from '../content/schema';
import './CaptureCard.css';

type Props = {
  typeIndex: TypeIndex;
  code: string;
  name: string;
  tagline: string;
  traits: string[];
  celebrate?: boolean; // true면 stagger 애니메이션
};

const CaptureCard = forwardRef<HTMLElement, Props>(function CaptureCard(
  { typeIndex, code, name, tagline, traits, celebrate = false },
  ref
) {
  return (
    <section
      ref={ref}
      className={`capture ${celebrate ? 'capture--celebrate' : ''}`}
      data-type={String(typeIndex).padStart(2, '0')}
      aria-label="결과 카드"
    >
      <Badge code={code} size="lg" />
      <h1 className="capture__name">{name}</h1>
      <hr className="capture__divider" />
      <p className="capture__tagline">"{tagline}"</p>
      <ul className="capture__traits">
        {traits.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
      <span className="capture__watermark">연기 스타일 MBTI</span>
    </section>
  );
});

export default CaptureCard;
