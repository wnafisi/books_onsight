class CreateBooks < ActiveRecord::Migration[5.2]
  def change
    create_table :books do |t|
      t.string :title
      t.integer :publication_year
      t.belongs_to :author, index: true
      
      t.timestamps
    end
  end
end
