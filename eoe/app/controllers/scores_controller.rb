class ScoresController < ApplicationController
    # GET /scores
    def index 
        @scores = Score.all

        render json: @scores
    end

    # GET /scores/1
    def show
        @score = Score.find(params[:id])
        render json: @score
    end

    # POST /scores
    def create
        @score = Score.new(score_params)

        if @score.save
            render json: @score, status: :created
        else
            render json: @score.errors, status: :unprocessable_entity
        end
    end

    # DELETE /scores/:id
    def destroy
        @score = Score.find(params[:id])
        @score.destroy
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
        @score = Score.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def score_params
        params.require(:score).permit(:userScore, :userName)
    end
end
