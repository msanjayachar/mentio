create table mentees (
  id UUID DEFAULT gen_random_uuid(),
  presentation_id UUID REFERENCES presentations(id) ON DELETE CASCADE,

  PRIMARY KEY (presentation_id, id)
)
