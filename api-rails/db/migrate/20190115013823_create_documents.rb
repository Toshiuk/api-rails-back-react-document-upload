class CreateDocuments < ActiveRecord::Migration[5.1]
  def change
    create_table :documents do |t|
      t.string :file
      t.string :notes
      t.boolean :confidential
      t.belongs_to :user

      t.timestamps
    end
  end
end
