# AutoMerging RAG
  It is a type of rag system that tries to solve the struggle of providing to-the-point context to llm. It works by defining a hierarchy of smaller chunks linked to parent chunks. If the set of smaller chunks linking to a parent chunk exceeds some threshold, then it merges smaller chunks to the bigger parent chunk.
## features
  -  *Flask Backend*: Handles API requests, merges logic, and serves retrieved content.
  - *Next.js Frontend*: interface to provide the query to the LLM.
  - *LlamaIndex*: is a Python framework designed to work with large language models (LLMs).
## Tech Stack
  - Flask (Python)
  - Next.js (React)
  - TypeScript
  - Python
## Installation
  1. Clone the repository:
     ```bash
     git clone https://github.com/beki-kel/AutoMerging_RAG.git
     cd AutoMerging_RAG
  2. Set up the Flask backend:
     ```bash
        cd back
        pip install -r requirements.txt
  3. Start the backend server:
     ```bash
         flask run
  4. Set up the Next.js frontend:
     ```bash
         cd ../front
         npm install
  5. Start the frontend development server:
     ```bash
         npm run dev
