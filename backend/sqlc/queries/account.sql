-- name: GetAccount :one
SELECT * FROM accounts
WHERE id = $1;

-- name: GetAccountByEmail :one
SELECT * FROM accounts
WHERE email = $1;

-- name: ListAccounts :many
SELECT * FROM accounts
ORDER BY name;

-- name: CreateAccount :one
INSERT INTO accounts (name, email, picture, organization)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: UpdateAccount :one
UPDATE accounts
SET name = $2, email = $3, picture = $4, organization = $5, status = $6, updated_at = NOW()
WHERE id = $1
RETURNING *;

-- name: DeleteAccount :one
DELETE FROM accounts
WHERE id = $1
RETURNING *;

-- name: ListContactsByAccountID :many
SELECT * FROM account_contact
WHERE account_id = $1;
