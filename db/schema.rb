# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_09_29_025221) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'accounts', force: :cascade do |t|
    t.string 'access_token'
    t.datetime 'expiration_date'
    t.string 'name'
    t.string 'status'
    t.bigint 'user_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['user_id'], name: 'index_accounts_on_user_id'
  end

  create_table 'expenses', force: :cascade do |t|
    t.string 'transaction_id'
    t.string 'name', null: false
    t.string 'description'
    t.decimal 'amount', precision: 10, scale: 2
    t.string 'receipt_url'
    t.bigint 'owner_id', null: false
    t.bigint 'group_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['group_id'], name: 'index_expenses_on_group_id'
    t.index ['owner_id'], name: 'index_expenses_on_owner_id'
  end

  create_table 'groups', force: :cascade do |t|
    t.string 'name', null: false
    t.string 'description'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'items', force: :cascade do |t|
    t.string 'name'
    t.decimal 'amount'
    t.string 'quantity'
    t.bigint 'expense_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['expense_id'], name: 'index_items_on_expense_id'
  end

  create_table 'user_expenses', force: :cascade do |t|
    t.bigint 'user_id', null: false
    t.bigint 'expense_id', null: false
    t.boolean 'settled', default: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['expense_id'], name: 'index_user_expenses_on_expense_id'
    t.index ['user_id'], name: 'index_user_expenses_on_user_id'
  end

  create_table 'user_groups', force: :cascade do |t|
    t.bigint 'user_id', null: false
    t.bigint 'group_id', null: false
    t.boolean 'is_owner'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['group_id'], name: 'index_user_groups_on_group_id'
    t.index ['user_id', 'group_id'], name: 'index_user_groups_on_user_id_and_group_id', unique: true
    t.index ['user_id'], name: 'index_user_groups_on_user_id'
  end

  create_table 'user_items', force: :cascade do |t|
    t.bigint 'user_id', null: false
    t.bigint 'item_id', null: false
    t.decimal 'amount_owed'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['item_id'], name: 'index_user_items_on_item_id'
    t.index ['user_id'], name: 'index_user_items_on_user_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'username'
    t.string 'email', null: false
    t.string 'full_name'
    t.string 'profile_picture'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  add_foreign_key 'accounts', 'users'
  add_foreign_key 'expenses', 'groups'
  add_foreign_key 'expenses', 'users', column: 'owner_id'
  add_foreign_key 'items', 'expenses'
  add_foreign_key 'user_expenses', 'expenses'
  add_foreign_key 'user_expenses', 'users'
  add_foreign_key 'user_groups', 'groups'
  add_foreign_key 'user_groups', 'users'
  add_foreign_key 'user_items', 'items'
  add_foreign_key 'user_items', 'users'
end
