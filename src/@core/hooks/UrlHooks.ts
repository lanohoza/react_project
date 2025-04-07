export const downloadFile = (response) => {
  const disposition = response.headers['Content-Disposition'];
  const fileName = disposition?.split('filename=')[1].replace(/"/g, '');
  const url = window.URL.createObjectURL(new Blob([response.data]));
  // Create a link element and trigger a download
  const a = document.createElement('a');
  a.href = url;
  a.download = "template.xlsx"; // Set default filename
  document.body.appendChild(a);
  a.click();
  // Clean up
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
export const convertValueToFixed = (value: number) => {
  return Number.isInteger(value) ? value : value?.toFixed(2)??0
}

export const typeEstablishmentMap: Record<string, string> = {
  "primary": "إبتدائي",
  "secondary": "ثانوي",
  "middle": "متوسط"

};
