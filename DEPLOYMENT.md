# 민죠이 웹사이트 배포 가이드

## 1. Neon 데이터베이스 설정

### 1.1 Neon 계정 생성
1. [console.neon.tech](https://console.neon.tech) 접속
2. GitHub 또는 이메일로 회원가입
3. "Create a project" 클릭

### 1.2 프로젝트 생성
1. **Project name**: `minjoy-website`
2. **Region**: `Asia Pacific (Singapore)` 선택 (한국에서 가장 빠름)
3. "Create project" 클릭

### 1.3 Connection String 복사
1. 프로젝트 대시보드에서 "Connection Details" 확인
2. "Connection string" 복사 (Pooled connection)
3. `.env` 파일의 `DATABASE_URL`과 `DIRECT_URL`에 붙여넣기

예시:
```
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://username:password@ep-xxx-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
```

---

## 2. 데이터베이스 마이그레이션

### 2.1 로컬에서 테이블 생성
```bash
# .env 파일에 DATABASE_URL 설정 후 실행
npx prisma db push
```

### 2.2 관리자 계정 생성
```bash
# .env 파일의 ADMIN_EMAIL, ADMIN_PASSWORD 확인 후 실행
npm run db:seed
```

기본 관리자 계정:
- 이메일: `admin@minjoy.com`
- 비밀번호: `minjoy2024!`

---

## 3. Vercel 배포

### 3.1 Git 저장소 생성
```bash
# 프로젝트 폴더에서
git init
git add .
git commit -m "Initial commit"

# GitHub에서 새 저장소 생성 후
git remote add origin https://github.com/your-username/minjoy-website.git
git push -u origin main
```

### 3.2 Vercel 연동
1. [vercel.com](https://vercel.com) 접속
2. "Add New Project" 클릭
3. GitHub 저장소 선택
4. "Import" 클릭

### 3.3 환경 변수 설정
Vercel 프로젝트 Settings > Environment Variables에서 추가:

| 변수명 | 값 | 설명 |
|--------|-----|------|
| `DATABASE_URL` | Neon Connection String | 데이터베이스 URL |
| `DIRECT_URL` | Neon Connection String | 직접 연결 URL |
| `ADMIN_SECRET` | 임의의 긴 문자열 | JWT 시크릿 키 |
| `ADMIN_EMAIL` | admin@minjoy.com | 관리자 이메일 |
| `ADMIN_PASSWORD` | 안전한 비밀번호 | 관리자 비밀번호 |

**ADMIN_SECRET 생성 방법:**
```bash
openssl rand -base64 32
```

### 3.4 배포
1. "Deploy" 클릭
2. 빌드 완료 후 URL 확인

---

## 4. 배포 후 확인

### 4.1 데이터베이스 테이블 생성 (첫 배포 시)
Vercel 배포 후, 로컬에서 다시 한번 실행:
```bash
npx prisma db push
npm run db:seed
```

### 4.2 확인 사항
- [ ] 메인 페이지 접속 확인
- [ ] 상담 폼 제출 테스트
- [ ] 관리자 로그인 (`/admin`)
- [ ] 관리자 대시보드에서 문의 확인

---

## 5. 주요 URL

| 페이지 | URL |
|--------|-----|
| 메인 페이지 | `/` |
| 관리자 로그인 | `/admin` |
| 관리자 대시보드 | `/admin/dashboard` |

---

## 6. 문제 해결

### 데이터베이스 연결 오류
- Neon 대시보드에서 Connection String이 올바른지 확인
- `?sslmode=require`가 URL 끝에 있는지 확인

### 관리자 로그인 안됨
- `npm run db:seed`로 관리자 계정 생성 확인
- 비밀번호가 올바른지 확인

### 빌드 오류
```bash
# Prisma 클라이언트 재생성
npx prisma generate
npm run build
```

---

## 7. 보안 체크리스트

- [ ] `ADMIN_SECRET`을 충분히 긴 랜덤 문자열로 변경
- [ ] `ADMIN_PASSWORD`를 안전한 비밀번호로 변경
- [ ] Vercel 환경 변수에서 Production만 선택
- [ ] 배포 후 기본 비밀번호 변경
