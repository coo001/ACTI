/**
 * 콘텐츠 스키마 — 연기 스타일 MBTI
 *
 * 4축 16유형 진단의 도메인 타입을 정의한다.
 * 모든 콘텐츠/로직은 이 모듈의 타입을 공유한다.
 */

/* ===== 4축 정의 ===== */

/** 4축의 8극(極). 각 축은 두 극으로 구성된다. */
export type Axis =
  | 'M' | 'T'   // 접근 철학: 메소드 ↔ 테크닉
  | 'I' | 'P'   // 현장 운영: 즉흥 ↔ 설계
  | 'N' | 'A'   // 준비 사고법: 직관 ↔ 분석
  | 'B' | 'S';  // 표현 통로: 신체 ↔ 내면

export type AxisName = 'philosophy' | 'operation' | 'preparation' | 'expression';

export const AXIS_POLES: Record<AxisName, [Axis, Axis]> = {
  philosophy: ['M', 'T'],
  operation:  ['I', 'P'],
  preparation:['N', 'A'],
  expression: ['B', 'S'],
};

/* ===== 유형 코드 ===== */

/** 16유형 코드 화이트리스트. 4글자 = [M|T][I|P][N|A][B|S] */
export const TYPE_CODES = [
  'MINB', 'MIAS', 'MPNB', 'MPAS',
  'TINB', 'TIAS', 'TPNB', 'TPAS',
  'MINS', 'MIAB', 'MPNS', 'MPAB',
  'TINS', 'TIAB', 'TPNS', 'TPAB',
] as const;

export type TypeCode = (typeof TYPE_CODES)[number];
export type TypeIndex =
  | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

/** TypeCode → TypeIndex 매핑 (선언 순서) */
export function codeToIndex(code: TypeCode): TypeIndex {
  return TYPE_CODES.indexOf(code) as TypeIndex;
}

/** 임의 문자열이 유효한 16유형 코드인지 검증 (런타임 가드) */
export function isTypeCode(value: unknown): value is TypeCode {
  return typeof value === 'string' && (TYPE_CODES as readonly string[]).includes(value);
}

/* ===== 문항 ===== */

import type { LucideIcon } from 'lucide-react';

export type Choice = {
  /** 선택지 카피 (1~2줄) */
  label: string;
  /** 이 선택지가 대표하는 축의 극 */
  axis: Axis;
  /** Lucide 아이콘 컴포넌트 (트리 셰이킹 친화) */
  icon: LucideIcon;
};

export type Question = {
  /** 안정적 식별자 (1부터) */
  id: number;
  /** 시나리오 설정 (1~3줄) */
  scenario: string;
  /** 질문 (짧게, "너는?" 형식 권장) */
  question: string;
  /** 정확히 4개의 선택지 */
  choices: [Choice, Choice, Choice, Choice];
};

/* ===== 유형 콘텐츠 ===== */

export type TypeContent = {
  code: TypeCode;
  index: TypeIndex;
  /** 위트 네이밍 (예: "비 오는 날 뛰쳐나가는 햄릿형") */
  name: string;
  /** 한 줄 캐치프레이즈 (SNS 캡션용) */
  tagline: string;
  /** 캐릭터 묘사 3~4줄 */
  traits: string[];
  /** 어울리는 역할/장르 3~4개 */
  roles: string[];
  /** 천적 유형 */
  rival: TypeCode;
  /** 베프 유형 */
  bff: TypeCode;
};
