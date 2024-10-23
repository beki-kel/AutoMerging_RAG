from flask import Flask, request, jsonify
from llama_index.core import SimpleDirectoryReader, Document
from llama_index.core.node_parser import HierarchicalNodeParser
from llama_index.core import StorageContext, VectorStoreIndex, load_index_from_storage
from llama_index.llms.gemini import Gemini
from llama_index.core.retrievers import AutoMergingRetriever
from llama_index.core.indices.postprocessor import SentenceTransformerRerank
from llama_index.core.query_engine import RetrieverQueryEngine
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Initialize global variables for index and query engine
index = None
query_engine = None

def load_existing_index(save_dir="merging_index"):
    """Load the existing index from the specified directory."""
    if os.path.exists(save_dir):
        return load_index_from_storage(
            StorageContext.from_defaults(persist_dir=save_dir),
            llm=Gemini(api_key=os.getenv("GEMINI_API_KEY")),
            embed_model="local:BAAI/bge-small-en-v1.5"
        )
    else:
        return None

@app.route('/query', methods=['POST'])
def query():
    global index, query_engine
    
    # Load the existing index if not already loaded
    if index is None:
        print("Loading existing index...")
        index = load_existing_index()
        
        if index is None:
            return jsonify({'error': 'Index not found. Please build and save an index first.'}), 404
            
        # Initialize the query engine with the loaded index
        query_engine = get_automerging_query_engine(index)

    # Get query from request body
    data = request.json
    user_query = data.get('query', '')

    # Perform the query using the query engine
    response = query_engine.query(user_query)
    
    return jsonify({'response': str(response)})

def get_automerging_query_engine(automerging_index, similarity_top_k=12, rerank_top_n=6):
    base_retriever = automerging_index.as_retriever(similarity_top_k=similarity_top_k)
    retriever = AutoMergingRetriever(base_retriever, automerging_index.storage_context, verbose=True)
    rerank = SentenceTransformerRerank(top_n=rerank_top_n, model="BAAI/bge-reranker-base")
    
    return RetrieverQueryEngine.from_args(
        retriever,
        node_postprocessors=[rerank],
        llm=Gemini(api_key=os.getenv("GEMINI_API_KEY"))
    )

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))