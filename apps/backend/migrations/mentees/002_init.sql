create table mentees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  presentation_id UUID NOT NULL REFERENCES presentations(id) ON DELETE CASCADE
)
