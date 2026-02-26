create table users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL CHECK (role IN ('mentor', 'mentee')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) 
