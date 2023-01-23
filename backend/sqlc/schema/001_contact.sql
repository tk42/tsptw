-- +goose Up
CREATE TABLE IF NOT EXISTS contacts (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    name VARCHAR(255) NOT NULL,
    address VARCHAR(512) NOT NULL,
    staying_min INTEGER NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

-- +goose Down
DROP TABLE IF EXISTS contacts;
