from fastapi import FastAPI, UploadFile, File;
from pydantic import BaseModel;
from typing import List;
from langchain_community.document_loaders import (DirectoryLoader, PyMuPDFLoader);
from langchain_text_splitters import RecursiveCharacterTextSplitter;
import chromadb

client = chromadb.PersistentClient(path="./dataBase")

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
  
  print(split_texts)
  return {
    "mess" : "extracting"
  }