class CreateRatings < ActiveRecord::Migration[5.2]
  def change
    create_table :ratings do |t|
      t.belongs_to :book, index: true
      t.belongs_to :user, index: true
      t.integer :rating
      t.string :comment
      
      t.timestamps
    end
  end
end
