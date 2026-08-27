# CLAUDE.md — 프로젝트 가이드

이 파일은 Claude Code가 이 프로젝트에서 작업할 때 자동으로 읽는 지침 파일이다.
프로젝트 루트에 `CLAUDE.md`라는 이름으로 두면 세션 시작 시 자동으로 컨텍스트에 로드된다.

---

## 1. 로컬 연결 (Claude Code 설치·실행)

### 설치

```bash
# npm으로 설치 (Node.js 18+ 필요)
npm install -g @anthropic-ai/claude-code

# 또는 macOS 데스크톱 앱 사용 (Mac/Windows 지원)
# https://claude.ai/download
```

### 실행

```bash
cd /path/to/project   # 프로젝트 폴더로 이동
claude                # 대화형 세션 시작
```

- 처음 실행하면 브라우저로 Anthropic 계정 로그인(OAuth)을 안내한다.
- `claude "질문"` — 일회성 질문 실행
- `claude -c` — 직전 세션 이어서 계속
- VS Code / JetBrains 확장으로 IDE 안에서도 사용 가능

### 로컬 환경 정보

- OS: macOS (darwin)
- 셸: zsh
- 작업 디렉토리: 프로젝트 루트 기준으로 실행할 것

---

## 2. 필수 세팅

### 설정 파일 위치

| 파일 | 용도 |
|------|------|
| `~/.claude/CLAUDE.md` | 전역 지침 (모든 프로젝트 공통) |
| `<프로젝트>/CLAUDE.md` | 프로젝트별 지침 (이 파일) |
| `~/.claude/settings.json` | 전역 설정 (권한, 훅, 환경변수) |
| `<프로젝트>/.claude/settings.json` | 프로젝트 설정 (팀 공유, git 커밋) |
| `<프로젝트>/.claude/settings.local.json` | 개인 설정 (git 제외) |

### 권한(permissions) 예시 — `.claude/settings.json`

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run build)",
      "Bash(npm run dev:*)",
      "Bash(git status)",
      "Bash(git diff:*)"
    ],
    "deny": [
      "Bash(rm -rf:*)"
    ]
  }
}
```

### 배포 규칙 (중요)

- **배포는 `git push origin main`으로만 한다.**
- Netlify CLI, Vercel CLI 등으로 직접 배포하지 마.
- 배포·서버 구성은 기존 방식 그대로 유지하고 임의로 바꾸지 마.

---

## 3. 하네스(Harness) 기본 내용

하네스란 Claude가 실제로 동작하는 실행 환경(도구, 권한, 컨텍스트 관리)을 말한다.

### Claude가 쓰는 주요 도구

- **Read / Write / Edit** — 파일 읽기·생성·수정
- **Bash** — 셸 명령 실행 (권한 모드에 따라 승인 필요)
- **Glob / Grep** — 파일·코드 검색
- **Agent(서브에이전트)** — 큰 탐색·병렬 작업을 별도 에이전트에 위임
- **WebSearch / WebFetch** — 웹 검색·페이지 가져오기
- **Skill(슬래시 명령)** — `/init`, `/code-review`, `/simplify` 등

### 컨텍스트 로딩 순서

1. `~/.claude/CLAUDE.md` (전역 지침)
2. 프로젝트 루트의 `CLAUDE.md` (이 파일)
3. 메모리 인덱스 (`~/.claude/projects/.../memory/MEMORY.md`)

대화가 길어지면 자동으로 요약(compact)되어 다음 컨텍스트로 이어진다.

### 권한 모드

- 기본: 파일 수정·명령 실행 전 사용자 승인 요청
- `/permissions` 로 허용 목록 관리 (터미널 세션에서)
- 자주 쓰는 안전한 명령은 settings.json의 allow에 등록해 프롬프트 줄이기

### 훅(hooks) — 자동화

특정 이벤트(도구 실행 전/후, 세션 종료 등)에 셸 명령을 자동 실행하려면
settings.json에 hooks를 등록한다. "매번 X 할 때마다 Y 해줘" 같은 자동화는
기억이 아니라 훅으로만 보장된다.

---

## 4. 작업 원칙 (요약)

우선순위: **정확성 > 검증 > 최소 변경 > 명확성 > 유지보수성**

- 파일·API·스키마가 존재한다고 가정하지 말고 먼저 읽어서 확인해.
- 수정 전에 관련 파일을 읽고, 수정 후에는 테스트·실행으로 검증해.
- 요청된 작업에만 변경을 국한하고, 관련 없는 리팩토링은 하지 마.
- 가장 단순한 해결책을 선호하고, 불필요한 의존성·추상화를 추가하지 마.
- 기존 프로젝트의 관례와 스타일을 따라.
- 막히면 멈추고 무엇이 막혔는지, 무엇이 검증됐는지 명확히 보고해.
- 검증 없이 "성공했다"고 주장하지 마.

---

## 5. 프로젝트별 정보

- **프로젝트 이름:** 보증금지킴이 (Bboggl Deposit Guard)
- **기술 스택:** Vite + React + TypeScript. 별도 백엔드 없음 — 브라우저 로컬 저장소(localStorage)만으로 동작.
- **개발 서버 실행:** `npm run dev`
- **빌드:** `npm run build` (`tsc -b && vite build`)
- **린트:** `npm run lint` (oxlint)
- **테스트:** 별도 자동화 테스트 스위트는 없음. 변경 후에는 `npm run build`/`npm run lint`로 검증하고,
  UI 동작(체크리스트 저장, D-day 계산, .ics 내보내기 등)은 실제로 `npm run dev`로 띄워서 확인할 것.
- **배포:** 아직 배포 파이프라인이 구성되어 있지 않음. 배포가 필요해지면 방식을 먼저 사용자와 상의해서 정할 것
  (2번 섹션의 "git push origin main으로만 배포" 원칙은 배포 파이프라인이 생긴 이후에 적용).
- **디자인 시스템:** `src/styles/global.css`에 정의된 CSS 변수 사용 — Primary `#3182F6` 등 토스·클린 블루
  팔레트, radius 10px 라운드 버튼, Noto Sans KR, 둥근 라인(stroke) 아이콘. 새 컴포넌트를 만들 때도 이
  토큰을 그대로 재사용하고 임의로 새 색상·폰트를 추가하지 말 것.
- **폴더 구조:**
  - `src/types.ts` — 도메인 타입
  - `src/data/` — 용어집·FAQ·체크리스트·공식 링크 등 정적 데이터
  - `src/utils/` — 날짜 계산, 마감일 판정(`deadlines.ts`), 과태료 추정(`penalty.ts`), .ics 생성, 긴급도 등 순수 로직
  - `src/hooks/useLocalStorage.ts` — 로그인 없이 진행 상태를 유지하는 훅
  - `src/components/` — 화면 단위 컴포넌트
- **주의사항 (중요):**
  - 이 서비스는 전입신고·확정일자·전월세 신고 등 법령 기준 정보를 다룬다. 기한·과태료 수치를 변경할
    때는 반드시 법령 원문(국가법령정보센터 law.go.kr) 또는 정부 공식 발표를 근거로 확인한 뒤 반영하고,
    `src/utils/deadlines.ts`·`src/utils/penalty.ts`의 근거 조문 주석과 `Footer.tsx`의 출처 문구도 함께
    업데이트할 것. 확인 없이 숫자만 임의로 바꾸지 말 것.
  - 전월세 신고 과태료는 2026년 5월 31일 계도기간 종료 이후(6월 1일 신고분부터) 단순 지연신고 상한이
    100만원 → 30만원으로 인하된 상태다. 이후 제도가 다시 바뀔 수 있으니 관련 작업 시 최신 공지를 재확인할 것.
