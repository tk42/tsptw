-- name: GetContacts :one
SELECT * FROM contacts
WHERE id = $1;

-- name: CreateContact :one
INSERT INTO contacts (name, address, staying_min, start_time, end_time)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: UpdateContact :one
UPDATE contacts
SET name = $2, address = $3, staying_min = $4, start_time = $5, end_time = $6, updated_at = NOW()
WHERE id = $1
RETURNING *;

-- name: DeleteContact :one
DELETE FROM contacts
WHERE id = $1
RETURNING *;

