export async function copyToClipboard(content: string | number) {
  if ("clipboard" in window.navigator && window.isSecureContext) {
    await window.navigator.clipboard.writeText(content.toString());
  }
}
