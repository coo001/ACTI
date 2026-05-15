/**
 * S1 — 랜딩 페이지.
 * 명세: outputs/stage-2/design-spec-web.md § S1
 */

import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PrimaryButton from '../components/PrimaryButton';
import TypeCard from '../components/TypeCard';
import { getType } from '../content/types';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const preview = getType('MINB');

  return (
    <main className="page page-enter page-landing">
      <div className="container page-landing__container">
        <header className="page-landing__header">
          <p className="page-landing__brand">연기 스타일 MBTI</p>
        </header>

        <section className="page-landing__hero">
          <h1 className="page-landing__title">
            연영과 / 배우 너만의<br />
            연기 인간 진단
          </h1>

          <div className="page-landing__preview">
            <TypeCard
              relation="preview"
              code={preview.code}
              name={preview.name}
              interactive={false}
            />
          </div>

          <p className="page-landing__meta">12~14문항 · 약 2~3분</p>

          <PrimaryButton size="lg" fullWidth onClick={() => navigate('/quiz')}>
            시작하기
            <ArrowRight size={20} aria-hidden="true" />
          </PrimaryButton>
        </section>

        <footer className="page-landing__footer">
          <span>만든이</span>
          <span aria-hidden="true">·</span>
          <span>피드백</span>
        </footer>
      </div>
    </main>
  );
}
