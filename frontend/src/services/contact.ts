export async function sendContactEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'EMAIL_FAILED');
  }

  return result;
}
