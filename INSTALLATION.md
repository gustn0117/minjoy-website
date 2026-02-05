# 민죠이 웹사이트 설치 및 실행 가이드

## 📦 ZIP 파일 압축 해제 후 설치 방법

### 1단계: 프로젝트 폴더로 이동
```bash
cd minjoy-website
```

### 2단계: 패키지 설치
```bash
npm install
```

### 3단계: 개발 서버 실행
```bash
npm run dev
```

### 4단계: 브라우저에서 확인
브라우저를 열고 http://localhost:3000 으로 접속하세요.

---

## 🌐 배포 방법

### Vercel로 배포 (권장)

1. Vercel 계정 생성: https://vercel.com
2. 프로젝트 import
3. 자동으로 빌드 및 배포됨

### 직접 서버에 배포

1. 프로덕션 빌드 생성:
```bash
npm run build
```

2. 빌드된 파일 실행:
```bash
npm start
```

---

## 🔧 주요 수정 사항

### 연락처 정보 업데이트
`components/Footer.tsx` 및 `components/Contact.tsx` 파일에서 다음 정보를 실제 정보로 변경하세요:
- 전화번호
- 이메일 주소
- 실제 주소
- 사업자등록번호

### 브랜드 컬러 변경
`tailwind.config.js` 파일에서 primary, secondary, accent 색상을 변경할 수 있습니다.

### 이미지 추가
1. `public/images` 폴더에 이미지 파일 추가
2. 컴포넌트에서 이미지 경로 수정

---

## ❓ 문제 해결

### npm install이 실패하는 경우
```bash
npm cache clean --force
npm install
```

### 포트가 이미 사용 중인 경우
```bash
npm run dev -- -p 3001
```

### 빌드 오류가 발생하는 경우
```bash
rm -rf .next
rm -rf node_modules
npm install
npm run dev
```

---

## 📞 기술 지원

설치나 실행 중 문제가 발생하면 README.md 파일을 참고하거나,
프로젝트 개발자에게 문의하세요.
