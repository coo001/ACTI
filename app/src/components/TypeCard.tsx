/**
 * TypeCard — 천적/베프 카드 (클릭 시 사슬 연장). 비클릭 변형(랜딩 미리보기)도 지원.
 * 명세: outputs/stage-2/component-spec-web.md C7
 */

import { Link } from 'react-router-dom';
import { ChevronRight, Swords, Heart, Sparkles } from 'lucide-react';
import Badge from './Badge';
import type { TypeCode } from '../content/schema';
import './TypeCard.css';

type Props = {
  /** 'rival' / 'bff' / 'preview' (랜딩 미리보기는 비클릭) */
  relation?: 'rival' | 'bff' | 'preview';
  code: TypeCode | string;
  name: string;
  interactive?: boolean;
};

export default function TypeCard({
  relation = 'preview',
  code,
  name,
  interactive = true,
}: Props) {
  const Icon =
    relation === 'rival' ? Swords :
    relation === 'bff'   ? Heart  :
    Sparkles;

  const labelMap = {
    rival: '천적',
    bff: '베프',
    preview: '미리보기',
  } as const;

  const ariaLabel = interactive
    ? `${labelMap[relation]} ${code} ${name} 결과 보기`
    : `${labelMap[relation]} ${code} ${name}`;

  const content = (
    <>
      <div className="type-card__icon" aria-hidden="true">
        <Icon size={20} />
      </div>
      <div className="type-card__body">
        <Badge code={code} size="sm" />
        <p className="type-card__name">{name}</p>
      </div>
      {interactive && (
        <div className="type-card__arrow" aria-hidden="true">
          <ChevronRight size={20} />
        </div>
      )}
    </>
  );

  if (!interactive) {
    return <div className="type-card type-card--static" aria-label={ariaLabel}>{content}</div>;
  }

  return (
    <Link
      to={`/result/${code}`}
      className="type-card"
      aria-label={ariaLabel}
    >
      {content}
    </Link>
  );
}
