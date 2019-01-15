class DocumentsController < ApiController
    before_action :require_login, except: [:index , :show]

    def index
        documents = Document.where(:confidential => false)
        render json: { documents: documents }
    end

    def show
        document = Document.find(params[:id])
        render json: { document: document }
    end

    def create
        document = Document.new(document_params)
        document.user = current_user
        if document.save
            render json: {
                message: 'ok',
                document: document
            }
        else
            render json: {message: 'Could not create document'}
        end
    end

    private
    def document_params
        params.require(:document).permit(:file, :notes, :confidential)
    end
end
