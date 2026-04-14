create table mentees (
  presentation_id UUID REFERENCES presentations(id) ON DELETE CASCADE,
  mentee_id UUID REFERENCES users(id) ON DELETE CASCADE,

  PRIMARY KEY (presentation_id, mentee_id)
) 
