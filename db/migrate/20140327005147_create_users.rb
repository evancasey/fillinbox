class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.timestamp :time
      t.integer :shares

      t.timestamps
    end
  end
end
