from fastapi import FastAPI, UploadFile, File;
from pydantic import BaseModel;
from typing import List;
from langchain_community.document_loaders import (DirectoryLoader, PyMuPDFLoader);
from langchain_text_splitters import RecursiveCharacterTextSplitter;
import chromadb

client = chromadb.PersistentClient(path="./dataBase")
try:
  client.delete_collection("embedings")
except:
  pass
collection = client.get_or_create_collection("embedings")

app = FastAPI()
class FileInfo(BaseModel):
  path: str
  name: str
class ExtractPDFRequest(BaseModel):
  fileArray: List[FileInfo]

def split_text(document, chunk_size, chunk_overlap):
  split_text = RecursiveCharacterTextSplitter(
    chunk_size = chunk_size,
    chunk_overlap = chunk_overlap,
    separators=["\n\n", "\n", " ", ""],
    length_function=len
  )
  split_docs = split_text.split_documents(document)
  return split_docs
@app.post('/api/extract_pdf')
def extract_pdf(files : ExtractPDFRequest):
  # for file in files.fileArray:
  #   print("Path:", file.path)
  #   print("Name:", file.name)
  dir_loader = DirectoryLoader(
    path="D:/AIEngineering/ResearchMate/server/upload/",
    glob="**/*.pdf",
    loader_cls= PyMuPDFLoader,
    show_progress=False
  )
  pdf_data = dir_loader.load()
  split_texts = split_text(pdf_data, 1000, 200)
  
  ids = []
  documents = []
  metadata = []
  for i, chunk in enumerate(split_texts):

    ids.append(f"chunk_{i}")

    documents.append(chunk.page_content)

    metadata.append(chunk.metadata)
  # adding the documents
  collection.add(
    ids=ids,
    documents=documents,
    metadatas=metadata
  )

  data = collection.get()
  print(data)
  return {
    "mess" : "extracting"
  }

#for sementic search

class queryData(BaseModel):
  query : str
@app.post("/api/sementic_search")
def sementicSearch(query : queryData):
  print(query)
  return{
    "mess" : "doing the sementic search"
  }