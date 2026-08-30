const bcUrl = "http://localhost:3005";
export const upload_pdfs = async (data: any) => {
  const response = await fetch(`${bcUrl}/api/upload_pdfs`, {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: data,
  });
  return response.json();
};
