CREATE TABLE mcq_slides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    question TEXT NOT NULL,

    options JSONB NOT NULL,
    correct_answers JSONB NOT NULL,

    allow_multiple BOOLEAN NOT NULL DEFAULT false,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
