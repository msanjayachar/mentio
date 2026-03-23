CREATE TABLE mcq_slides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(id),

    presentation_id UUID NOT NULL REFERENCES presentations(id),

    question TEXT NOT NULL,

    options JSONB NOT NULL,
    correct_answers JSONB NOT NULL,

    allow_multiple BOOLEAN NOT NULL DEFAULT false,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
