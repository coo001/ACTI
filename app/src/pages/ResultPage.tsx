/**
 * S3 / S3' — 결과 페이지 (본인 / 공유 수신자 통합).
 * 명세: outputs/stage-2/design-spec-web.md § S3, S3'
 */

import { useEffect, useRef, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, RotateCcw, ArrowRight } from 'lucide-react';

import CaptureCard from '../components/CaptureCard';
import TypeCard from '../components/TypeCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import ShareActionButton from '../components/ShareActionButton';
import Toast from '../components/Toast';

import { isTypeCode } from '../content/schema';
import { getType } from '../content/types';
import { getMyTypeCode, clearMyTypeCode } from '../lib/storage';
import { saveCaptureAsImage, copyResultUrl, getSiteUrl } from '../lib/share';
import { shareToKakao } from '../lib/kakao';

import NotFoundPage from './NotFoundPage';
import './ResultPage.css';

export default function ResultPage() {
  const { code: rawCode } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const captureRef = useRef<HTMLElement>(null);
  const [toast, setToast] = useState<string | null>(null);

  // 화이트리스트 검증
  if (!rawCode || !isTypeCode(rawCode)) {
    return <NotFoundPage />;
  }
  const code = rawCode;

  // 본인 vs 수신자 모드 (localStorage)
  const myCode = useMemo(() => getMyTypeCode(), []);
  const isRecipient = !myCode || myCode !== code;
  const isCelebrate = !isRecipient && myCode === code;
  // 첫 진입 셀럽레이션은 본인 결과일 때만

  const type = getType(code);
  const rival = getType(type.rival);
  const bff = getType(type.bff);
  const siteUrl = getSiteUrl();

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 1700);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleSaveImage = async () => {
    if (!captureRef.current) return;
    await saveCaptureAsImage(captureRef.current, `acti-${code}.png`);
  };

  const handleCopyLink = async () => {
    await copyResultUrl(code);
    setToast('링크가 복사됐어요');
  };

  const handleKakao = () => {
    shareToKakao(type, siteUrl);
  };

  const handleRetry = () => {
    clearMyTypeCode();
    navigate('/quiz', { replace: true });
  };

  return (
    <main className="page page-enter page-result">
      <Helmet>
        <title>[{code}] {type.name} — 연기 스타일 MBTI</title>
        <meta name="description" content={type.tagline} />
        <meta property="og:title" content={`[${code}] ${type.name}`} />
        <meta property="og:description" content={type.tagline} />
        <meta property="og:image" content={`${siteUrl}/og/${code}.png`} />
        <meta property="og:url" content={`${siteUrl}/result/${code}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="container">
        <header className="page-result__header">
          <Link to="/" aria-label="처음으로" className="page-result__back">
            <ChevronLeft size={24} aria-hidden="true" />
          </Link>
        </header>

        {isRecipient && (
          <p className="page-result__visitor-note">친구가 풀어본 결과예요 :)</p>
        )}

        <CaptureCard
          ref={captureRef}
          typeIndex={type.index}
          code={type.code}
          name={type.name}
          tagline={type.tagline}
          traits={type.traits}
          celebrate={isCelebrate}
        />

        {isRecipient && (
          <section className="page-result__visitor-cta">
            <PrimaryButton size="lg" fullWidth onClick={() => navigate('/quiz')}>
              나도 풀어보기
              <ArrowRight size={20} aria-hidden="true" />
            </PrimaryButton>
            <p className="page-result__visitor-cta-meta">2~3분이면 끝</p>
          </section>
        )}

        <section className="page-result__roles">
          <h3 className="page-result__section-title">어울리는 역할 / 장르</h3>
          <ul className="page-result__role-list">
            {type.roles.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>

        <section className="page-result__relations">
          <div>
            <h3 className="page-result__section-title">너의 천적</h3>
            <TypeCard relation="rival" code={rival.code} name={rival.name} />
          </div>
          <div>
            <h3 className="page-result__section-title">너의 베프</h3>
            <TypeCard relation="bff" code={bff.code} name={bff.name} />
          </div>
        </section>

        <section className="page-result__share">
          <div className="share-group">
            <ShareActionButton type="image" onAction={handleSaveImage} />
            <ShareActionButton type="link" onAction={handleCopyLink} />
            <ShareActionButton type="kakao" onAction={handleKakao} />
          </div>
          <SecondaryButton fullWidth onClick={handleRetry}>
            <RotateCcw size={18} aria-hidden="true" /> 다시 풀기
          </SecondaryButton>
        </section>
      </div>

      {toast && <Toast message={toast} />}
    </main>
  );
}
