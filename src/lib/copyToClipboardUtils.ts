export async function copyToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value)
    console.log('Copied to clipboard:', value)
  } catch (error) {
    console.error('Failed to copy text to clipboard', error)
  }
}
