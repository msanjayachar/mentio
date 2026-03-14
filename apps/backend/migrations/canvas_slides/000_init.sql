create table canvas_slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id UUID NOT NULL REFERENCES users(id),

  canvas_object  JSONB NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
