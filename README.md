# Todo List 프로젝트

할 일 관리를 위한 풀스택 웹 애플리케이션

---

## 목차

- [기술 스택](#기술-스택)
- [폴더 구조](#폴더-구조)
- [설치 및 실행](#설치-및-실행)
- [기능 명세](#기능-명세)
- [API 명세](#api-명세)
- [페이지 소개](#페이지-소개)
- [사용법](#사용법)

---

## 기술 스택

**개발 환경**
- VS Code

**프론트엔드**
- React, JavaScript, CSS

**백엔드**
- Node.js, Express

**데이터베이스**
- PostgreSQL, DBeaver

---

## 폴더 구조

```
TODO/
├── react1/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   └── Main.js
│   └── package.json
└── server/
    ├── db/
    │   └── db.js
    ├── controller/
    │   ├── auth.js
    │   ├── todos.js
    │   └── users.js
    ├── router/
    │   ├── auth/
    │   │   ├── login.js
    │   │   ├── register.js
    │   │   └── emailCheck.js
    │   ├── todos/
    │   │   └── allTodos.js
    │   └── users/
    │       └── profile.js
    ├── .env
    ├── server.js
    └── package.json
```

---

## 설치 및 실행

**1. 의존성 설치**

```bash
# 프론트엔드 의존성 설치
cd react1
npm install

# 백엔드 의존성 설치
cd ../server
npm install
```

**2. 환경 변수 설정**

`server/.env` 파일을 생성하고 데이터베이스 연결 정보를 입력합니다.

**3. 프로젝트 실행**

```bash
# 프론트엔드 실행 (react1 폴더에서)
npm start

# 백엔드 실행 (server 폴더에서)
node server.js
```

---

## 기능 명세

**사용자 기능**
- 회원가입, 로그인, 로그아웃, 내 정보 조회

**Todo 기능**
- Todo 목록 조회, 생성, 수정, 삭제

---

## API 명세

**인증**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | 회원가입 |
| POST | `/auth/login` | 로그인 |
| POST | `/auth/emailCheck` | 이메일 중복 체크 |

**Todo**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Todo 목록 조회 |
| POST | `/todos` | Todo 생성 |
| PATCH | `/todos/:id` | Todo 수정 |
| DELETE | `/todos/:id` | Todo 삭제 |

**사용자**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/profile` | 내 정보 조회 |

---

## 페이지 소개

### 로그인 페이지

<img width="841" height="636" alt="Image" src="https://github.com/user-attachments/assets/11dedc1e-c962-4f7e-808b-401c64627379" />

### 회원가입 페이지

<img width="824" height="705" alt="Image" src="https://github.com/user-attachments/assets/a69514e8-6a1f-4359-a2ae-03929c9aa144" />

### 메인 페이지

<img width="880" height="725" alt="Image" src="https://github.com/user-attachments/assets/bc3b7e08-782b-4adb-af7f-40a1acca3d47" />

**내 정보 보기**

<img width="761" height="836" alt="Image" src="https://github.com/user-attachments/assets/66d3cbde-8fbf-4ee1-a49e-662a6f8cd302" />

**Todo 작성**

<img width="776" height="874" alt="Image" src="https://github.com/user-attachments/assets/e0cf3fe1-632f-45d4-9e3d-ad54cf3688e2" />

---

## 사용법

1. **회원가입** - 회원가입 버튼 클릭 후 정보 입력
2. **로그인** - 가입한 정보로 로그인 (자동 페이지 이동)
3. **내 정보 확인** - 내 정보 보기 버튼으로 확인
4. **Todo 추가** - 제목과 내용 입력 후 추가 버튼 클릭
5. **Todo 관리** - 완료 토글, 수정, 삭제 가능
6. **로그아웃** - 로그아웃 버튼 클릭
