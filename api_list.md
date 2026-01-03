# API 설계 명세

## Base URL
`/api/v1`

## 1. Mentees (멘티 관리)

| Method | Endpoint | Description | Request Body | Response |
| - | - | - | - | - |
| GET | `/mentees` | 멘티 목록 조회 | - | `List[MenteeSchema]` |
| POST | `/mentees` | 멘티 등록 | `MenteeCreateSchema` (name, goal, etc) | `MenteeSchema` |
| DELETE | `/mentees/{mentee_id}` | 멘티 삭제 | - | `{"detail": "Success"}` |
| GET | `/mentees/{mentee_id}` | 멘티 상세 조회 | - | `MenteeSchema` |

## 2. Sessions (일정 관리)

| Method | Endpoint | Description | Request Body | Response |
| - | - | - | - | - |
| GET | `/sessions` | 일정 조회 (기간 필터) | Query: `start_date`, `end_date` | `List[SessionSchema]` |
| POST | `/sessions` | 일정 생성 | `SessionCreateSchema` (mentee_id, date, duration) | `SessionSchema` |
| PUT | `/sessions/{session_id}` | 일정 수정/연기 | `SessionUpdateSchema` (start_time, memo, etc) | `SessionSchema` |
| DELETE | `/sessions/{session_id}` | 일정 취소 | - | `{"detail": "Deleted"}` |

## 3. Dashboard / Stats

| Method | Endpoint | Description | Request Body | Response |
| - | - | - | - | - |
| GET | `/stats` | 대시보드 통계 | - | `{"total_mentees": int, "upcoming_sessions": int}` |

## Schemas (Draft)

```python
class MenteeCreateSchema(BaseModel):
    name: str
    goal: str | None = None

class SessionCreateSchema(BaseModel):
    mentee_id: int
    start_time: datetime
    # duration in minutes, default 60
    duration: int = 60 

class SessionUpdateSchema(BaseModel):
    start_time: datetime | None = None
    status: str | None = None # 'scheduled', 'completed', 'cancelled'
    memo: str | None = None
```
