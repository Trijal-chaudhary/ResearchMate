from fastapi import FastAPI, UploadFile, File;
from pydantic import BaseModel;
from typing import List;
from langchain_community.document_loaders import (DirectoryLoader, PyMuPDFLoader);

app = FastAPI()
class FileInfo(BaseModel):
  path: str
  name: str
class ExtractPDFRequest(BaseModel):
  fileArray: List[FileInfo]
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
  print(pdf_data)
  return {
    "mess" : "extracting"
  }