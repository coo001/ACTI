/**
 * ChoiceCard — 시나리오 4지선다 카드.
 * 명세: outputs/stage-2/component-spec-web.md C2
 */

import { Check, type LucideIcon } from 'lucide-react';
import './ChoiceCard.css';

type Props = {
  icon: LucideIcon;
  label: string;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
};

export default function ChoiceCard({
  icon: Icon,
  label,
  selected = false,
  onClick,
  disabled = false,
}: Props) {
  return (
    <button
      type="button"
      className={`choice ${selected ? 'choice--selected' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
    >
      <Icon size={24} className="choice__icon" aria-hidden="true" />
      <span className="choice__label">{label}</span>
      {selected && <Check size={20} className="choice__check" aria-hidden="true" />}
    </button>
  );
}
