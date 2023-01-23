-- +goose Up
CREATE TABLE IF NOT EXISTS accounts (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    picture VARCHAR(1024) NOT NULL,
    organization VARCHAR(255),
    status INTEGER NOT NULL DEFAULT 0,
    expired_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS account_contact (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    account_id BIGINT NOT NULL,
    contact_id BIGINT NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
    FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
    UNIQUE (account_id, contact_id)
);

-- +goose Down
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS account_contact;
