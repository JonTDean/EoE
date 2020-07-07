class CreateScores < ActiveRecord::Migration[6.0]
  def change
    create_table :scores do |t|
      t.integer :userScore
      t.string :userName

      t.timestamps
    end
  end
end
