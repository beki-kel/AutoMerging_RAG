# AutoMerging RAG
  - It is a type of rag system that tries to solve the struggle of providing to-the-point context to llm. It works by defining a hierarchy of smaller chunks linked to parent chunks. If the set of smaller chunks linking to a parent chunk exceeds some threshold, then it merges smaller chunks to the bigger parent chunk. for more [auto-merge.pdf](https://drive.google.com/file/d/113jshHW0dhJyg8Hp0wYloYB6K_dXT8eV/view?usp=sharing)
  
  - The dataset used is [ECAN and PatternMiner Paper](https://drive.google.com/file/d/17RtcXNhCXGveT3E4ygC4i-AcTIHVAaB4/view?usp=sharing) of opencog.

## features
  -  *Flask Backend*: Handles API requests, merges logic, and serves retrieved content.
  - *Next.js Frontend*: interface to provide the query to the LLM.
  - *LlamaIndex*: is a Python framework designed to work with large language models (LLMs).
## Tech Stack
  - Flask (Python)
  - Next.js (React)
  - TypeScript
  - Python

## Video Demo [video](https://drive.google.com/file/d/1ucrCBHNSCttytWZCvv5I94PM0yAYF23-/view?usp=sharing)

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
  4. Add environment variables:
       ```.env
           GEMNI_API_KEY = "YOUR API KEY"           
  5. Set up the Next.js frontend:
     ```bash
         cd ../front
         npm install
  6. Start the frontend development server:
     ```bash
         npm run dev

## colab link
  [link](https://colab.research.google.com/drive/1Ewz0kL_He_kYmvke2NM-YQr4HXrzQI3x?usp=sharing)
