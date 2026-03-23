create table canvas_slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id UUID NOT NULL REFERENCES users(id),

  presentation_id UUID NOT NULL REFERENCES presentations(id),

  canvas_object  JSONB,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
