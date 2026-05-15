/**
 * S4 — 잘못된 코드 / 404.
 * 명세: outputs/stage-2/design-spec-web.md § S4
 */

import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Badge from '../components/Badge';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import './NotFoundPage.css';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <main className="page page-enter page-404">
      <div className="container page-404__container">
        <Badge code="???" variant="unknown" size="lg" />
        <h1 className="page-404__title">
          이 유형은<br />
          아직 없는<br />
          캐릭터예요
        </h1>
        <p className="page-404__hint">(오타거나 만들지 못한 조합일지도)</p>
        <div className="page-404__actions">
          <PrimaryButton size="lg" fullWidth onClick={() => navigate('/')}>
            처음으로
            <ArrowRight size={20} aria-hidden="true" />
          </PrimaryButton>
          <SecondaryButton fullWidth onClick={() => navigate('/quiz')}>
            바로 풀어보기
          </SecondaryButton>
        </div>
      </div>
    </main>
  );
}
