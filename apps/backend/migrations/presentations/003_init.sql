create table presentations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),

  title VARCHAR(255) DEFAULT 'Untitled presentation',

  room_id CHAR(6) UNIQUE NOT NULL
  CHECK (room_id ~ '^[0-9]{6}'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  started_at TIMESTAMP,
  ended_at TIMESTAMP 
) 
