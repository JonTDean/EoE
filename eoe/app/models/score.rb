class Score < ApplicationRecord
    validates :userScore, presence: true
    validates :userName, presence:true, uniqueness: true
end
