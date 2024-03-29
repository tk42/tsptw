// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.16.0
// source: account.sql

package sqlc

import (
	"context"
	"database/sql"
)

const createAccount = `-- name: CreateAccount :one
INSERT INTO accounts (name, email, picture, organization)
VALUES ($1, $2, $3, $4)
RETURNING id, created_at, updated_at, name, email, picture, organization, status, expired_at
`

type CreateAccountParams struct {
	Name         string
	Email        string
	Picture      string
	Organization sql.NullString
}

func (q *Queries) CreateAccount(ctx context.Context, arg CreateAccountParams) (Account, error) {
	row := q.db.QueryRowContext(ctx, createAccount,
		arg.Name,
		arg.Email,
		arg.Picture,
		arg.Organization,
	)
	var i Account
	err := row.Scan(
		&i.ID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Name,
		&i.Email,
		&i.Picture,
		&i.Organization,
		&i.Status,
		&i.ExpiredAt,
	)
	return i, err
}

const deleteAccount = `-- name: DeleteAccount :one
DELETE FROM accounts
WHERE id = $1
RETURNING id, created_at, updated_at, name, email, picture, organization, status, expired_at
`

func (q *Queries) DeleteAccount(ctx context.Context, id int64) (Account, error) {
	row := q.db.QueryRowContext(ctx, deleteAccount, id)
	var i Account
	err := row.Scan(
		&i.ID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Name,
		&i.Email,
		&i.Picture,
		&i.Organization,
		&i.Status,
		&i.ExpiredAt,
	)
	return i, err
}

const getAccount = `-- name: GetAccount :one
SELECT id, created_at, updated_at, name, email, picture, organization, status, expired_at FROM accounts
WHERE id = $1
`

func (q *Queries) GetAccount(ctx context.Context, id int64) (Account, error) {
	row := q.db.QueryRowContext(ctx, getAccount, id)
	var i Account
	err := row.Scan(
		&i.ID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Name,
		&i.Email,
		&i.Picture,
		&i.Organization,
		&i.Status,
		&i.ExpiredAt,
	)
	return i, err
}

const getAccountByEmail = `-- name: GetAccountByEmail :one
SELECT id, created_at, updated_at, name, email, picture, organization, status, expired_at FROM accounts
WHERE email = $1
`

func (q *Queries) GetAccountByEmail(ctx context.Context, email string) (Account, error) {
	row := q.db.QueryRowContext(ctx, getAccountByEmail, email)
	var i Account
	err := row.Scan(
		&i.ID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Name,
		&i.Email,
		&i.Picture,
		&i.Organization,
		&i.Status,
		&i.ExpiredAt,
	)
	return i, err
}

const listAccounts = `-- name: ListAccounts :many
SELECT id, created_at, updated_at, name, email, picture, organization, status, expired_at FROM accounts
ORDER BY name
`

func (q *Queries) ListAccounts(ctx context.Context) ([]Account, error) {
	rows, err := q.db.QueryContext(ctx, listAccounts)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Account
	for rows.Next() {
		var i Account
		if err := rows.Scan(
			&i.ID,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.Name,
			&i.Email,
			&i.Picture,
			&i.Organization,
			&i.Status,
			&i.ExpiredAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const listContactsByAccountID = `-- name: ListContactsByAccountID :many
SELECT id, created_at, updated_at, account_id, contact_id FROM account_contact
WHERE account_id = $1
`

func (q *Queries) ListContactsByAccountID(ctx context.Context, accountID int64) ([]AccountContact, error) {
	rows, err := q.db.QueryContext(ctx, listContactsByAccountID, accountID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []AccountContact
	for rows.Next() {
		var i AccountContact
		if err := rows.Scan(
			&i.ID,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.AccountID,
			&i.ContactID,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateAccount = `-- name: UpdateAccount :one
UPDATE accounts
SET name = $2, email = $3, picture = $4, organization = $5, status = $6, updated_at = NOW()
WHERE id = $1
RETURNING id, created_at, updated_at, name, email, picture, organization, status, expired_at
`

type UpdateAccountParams struct {
	ID           int64
	Name         string
	Email        string
	Picture      string
	Organization sql.NullString
	Status       int32
}

func (q *Queries) UpdateAccount(ctx context.Context, arg UpdateAccountParams) (Account, error) {
	row := q.db.QueryRowContext(ctx, updateAccount,
		arg.ID,
		arg.Name,
		arg.Email,
		arg.Picture,
		arg.Organization,
		arg.Status,
	)
	var i Account
	err := row.Scan(
		&i.ID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Name,
		&i.Email,
		&i.Picture,
		&i.Organization,
		&i.Status,
		&i.ExpiredAt,
	)
	return i, err
}
