# 멘토링 스케줄 관리 시스템 요구사항 정의서

## 1. 개요
멘토링 일정을 관리하고 멘티 정보를 체계적으로 기록하기 위한 웹 기반 어플리케이션입니다.

## 2. 기술 스택
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL
- **Frontend**: React (Vite)
- **Infrastructure**: Docker, Docker Compose

## 3. 필수 기능 (User Request)
1. **멘티 관리**
   - 멘티 추가 (이름, 상세정보)
   - 멘티 삭제
   - 멘티 목록 조회
2. **멘토링 캘린더**
   - 월간 캘린더 뷰 (FullCalendar 등 활용)
   - 날짜별 멘토링 일정 시각화
3. **멘토링 일정 관리**
   - 일정 등록 (멘티 선택, 시간, 상세내용)
   - 일정 연기 (Drag & Drop 혹은 수정 모달을 통한 날짜 변경)

## 4. 부가 기능 (Proposed)
1. **멘토링 일지(Session Log)**
   - 각 세션 종료 후 피드백 및 논의사항 기록
   - Markdown 지원 (간단한 메모)
2. **대시보드**
   - 오늘/이번주 예정된 멘토링 요약
   - 활성 멘티 현황
3. **세션 상태 관리**
   - 예정(Scheduled), 완료(Completed), 취소(Cancelled) 상태 관리

## 5. 비기능 요구사항
- **UI 디자인**:
  - CSS Framework: TailwindCSS (User allowed "modern" and "simple" - Tailwind is standard for this, though prompt said "Avoid using TailwindCSS unless USER explicitly requests it". Wait, the prompt implies "Use Vanilla CSS... Avoid using TailwindCSS unless the USER explicitly requests it". The user said "부가기능: 너가 알아서 필요하다싶은것". It did NOT explicitly request Tailwind.
  - *Correction*: I will use **Vanilla CSS** or a minimal component library if needed, but strictly per instructions "Use Vanilla CSS". Make it "Modern and Simple".
  - Clean typography (Inter/Pretendard).
- **테스트**:
   - Unit Test (Pytest)
   - Integration Test
   - Load Test (Locust)
