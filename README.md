# 민죠이짐 & 민죠이케어 웹사이트

운동과 관리를 한 곳에서! 확실한 변화를 위한 프리미엄 토탈케어 센터

## 🎯 프로젝트 소개

민죠이짐(여성전용 PT샵)과 민죠이케어(체형관리샵)를 소개하는 공식 웹사이트입니다.

### 주요 기능

- **브랜드 소개**: 민죠이만의 차별화된 강점 소개
- **민죠이짐**: 여성전용 PT 프로그램 안내
- **민죠이케어**: 체형관리 서비스 소개
- **시설 안내**: 최신 운동 및 관리 시설 소개
- **변화 갤러리**: 회원들의 비포&애프터 사진
- **상담 신청**: 온라인 상담 신청 폼

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0 이상
- npm 또는 yarn

### 설치 방법

1. 패키지 설치
```bash
npm install
```

2. 개발 서버 실행
```bash
npm run dev
```

3. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 빌드

프로덕션 빌드를 생성하려면:

```bash
npm run build
npm start
```

## 📁 프로젝트 구조

```
minjoy-website/
├── app/
│   ├── globals.css        # 글로벌 스타일
│   ├── layout.tsx         # 레이아웃 컴포넌트
│   └── page.tsx           # 메인 페이지
├── components/
│   ├── Header.tsx         # 헤더 컴포넌트
│   ├── Hero.tsx           # 히어로 섹션
│   ├── About.tsx          # 소개 섹션
│   ├── MinjoyGym.tsx      # 민죠이짐 섹션
│   ├── MinjoyCare.tsx     # 민죠이케어 섹션
│   ├── Facilities.tsx     # 시설 소개 섹션
│   ├── Gallery.tsx        # 갤러리 섹션
│   ├── Contact.tsx        # 문의 섹션
│   └── Footer.tsx         # 푸터 컴포넌트
├── public/                # 정적 파일
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🎨 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Font**: Noto Sans KR (Google Fonts)

## 🎨 디자인 컨셉

- 브랜드 컬러: 보라색(#7B2FBE) & 핑크(#FF69B4)
- 모던하고 세련된 디자인
- 반응형 레이아웃 (모바일, 태블릿, 데스크톱)
- 부드러운 애니메이션과 호버 효과

## 📝 커스터마이징 가이드

### 색상 변경
`tailwind.config.js` 파일의 `colors` 섹션에서 브랜드 컬러를 수정할 수 있습니다.

### 콘텐츠 수정
각 컴포넌트 파일에서 텍스트와 데이터를 직접 수정할 수 있습니다.

### 이미지 추가
1. `public/images` 폴더에 이미지 업로드
2. 컴포넌트에서 `<Image>` 태그로 참조

## 📞 문의사항

프로젝트에 대한 문의사항이 있으시면 연락 주세요.

- 사업자등록번호: [추가 필요]
- 주소: [추가 필요]
- 전화: [추가 필요]
- 이메일: [추가 필요]

## 📄 라이선스

Copyright © 2024 민죠이짐 & 민죠이케어. All rights reserved.
