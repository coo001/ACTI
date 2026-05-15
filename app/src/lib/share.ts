/**
 * 공유 액션 — 이미지 저장 / URL 복사 / (카톡은 kakao.ts).
 */

import { toPng } from 'html-to-image';
import type { TypeCode } from '../content/schema';

/** CaptureCard DOM을 PNG로 다운로드. */
export async function saveCaptureAsImage(
  node: HTMLElement,
  filename: string
): Promise<void> {
  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: '#FAFAF8',
    skipFonts: false,
  });
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

/** 결과 URL을 클립보드에 복사. */
export async function copyResultUrl(code: TypeCode): Promise<void> {
  const url = `${window.location.origin}/result/${code}`;
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(url);
    return;
  }
  // 폴백 (구형 브라우저)
  const ta = document.createElement('textarea');
  ta.value = url;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
  } finally {
    document.body.removeChild(ta);
  }
}

/** 원본 사이트 URL (OG, 카카오 공유에 사용) */
export function getSiteUrl(): string {
  const env = import.meta.env.VITE_SITE_URL as string | undefined;
  if (env) return env.replace(/\/$/, '');
  if (typeof window !== 'undefined') return window.location.origin;
  return '';
}
