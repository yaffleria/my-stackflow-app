# Stackflow 하이브리드 앱

이 프로젝트는 웹 앱(Stackflow)과 사용자 인터페이스를 감싸는 네이티브 앱(Expo)을 포함하는 모노레포입니다.

## 프로젝트 구조

- `apps/web`: React + Vite + Stackflow (핵심 로직 및 UI가 위치함)
- `apps/native`: Expo + React Native Webview (웹 앱을 감싸는 네이티브 껍데기)

## 시작하기 (로컬 개발 환경)

### 1. 필수 사항 (Prerequisites)

- **Node.js** (LTS 버전 권장)
- **pnpm** (패키지 매니저)
- **Expo Go 앱** (실물 Android/iOS 기기 사용 시) 또는 **Android Studio / Xcode** (에뮬레이터/시뮬레이터 사용 시)

### 2. 의존성 설치

루트 디렉토리에서 아래 명령어를 실행하세요:

```bash
pnpm install
```

### 3. 앱 실행 방법

**두 개의 터미널**을 열어 각각 실행해야 합니다.

#### 터미널 1: 웹 앱 실행 (콘텐츠)

Stackflow 웹 애플리케이션을 서빙합니다.

```bash
# 루트 경로에서 실행
pnpm web
```

- 실행 후 `http://localhost:5173` 접속이 가능한지 확인하세요.

#### 터미널 2: 네이티브 앱 실행 (껍데기)

웹 앱을 보여줄 네이티브 컨테이너를 실행합니다.

```bash
# 루트 경로에서 실행

# 옵션 A: 안드로이드 에뮬레이터 또는 기기에서 실행
pnpm android

# 옵션 B: iOS 시뮬레이터에서 실행 (Mac 전용)
pnpm ios

# 옵션 C: Metro Bundler 시작 (범용)
pnpm native
```

> **⚠️ 안드로이드 에뮬레이터 주의사항**:
> 기본적으로 네이티브 앱은 `apps/native/App.tsx`에서 `http://10.0.2.2:5173`을 바라보도록 설정되어 있습니다.
> `10.0.2.2`는 안드로이드 에뮬레이터에서 컴퓨터의 `localhost`에 접속하기 위한 특수 IP 주소입니다.
>
> **실물 기기**나 **iOS 시뮬레이터**를 사용하는 경우, 컴퓨터의 실제 내부 IP(예: `192.168.x.x`)를 사용해야 할 수 있으므로 `apps/native/App.tsx` 파일의 `uri` 설정을 환경에 맞게 수정해주세요.

## 주요 명령어 (루트 기준)

- `pnpm web`: 웹 앱 개발 서버 실행
- `pnpm native`: Expo Metro Bundler 시작
- `pnpm android`: 안드로이드 에뮬레이터로 앱 열기
- `pnpm ios`: iOS 시뮬레이터로 앱 열기
- `pnpm build`: 모든 앱 빌드
- `pnpm test`: 테스트 실행

## 주요 기능

- **Stackflow**: `apps/web` 내에서 네이티브 앱과 같은 자연스러운 네비게이션 경험(Stack UI, 애니메이션)을 제공합니다.
- **하이브리드 아키텍처**: `apps/web`이 실제 UI를 담당하고, `apps/native`는 WebView를 통해 이를 보여주는 역할을 합니다.
- **권한 관리**: 네이티브 앱 실행 시 알림 권한을 요청하는 예시 코드가 포함되어 있습니다.
