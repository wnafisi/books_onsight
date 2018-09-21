class CreateLoans < ActiveRecord::Migration[5.2]
  def change
    create_table :loans do |t|
      t.belongs_to :book, index: true
      t.belongs_to :user, index: true
      t.integer :weeks

      t.timestamps
    end
  end
end
