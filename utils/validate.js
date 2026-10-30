// Pure function (no database, no Express) so it is easy to test.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(body) {
  const b = body && typeof body === "object" ? body : {};

  for (const field of ["name", "email", "message"]) {
    if (typeof b[field] !== "string") return { error: `Please fill in the ${field} field.` };
  }

  const name = b.name.trim();
  const email = b.email.trim();
  const message = b.message.trim();

  if (name.length < 2 || name.length > 80) return { error: "Name must be 2 to 80 characters long." };
  if (/[\r\n]/.test(name)) return { error: "Name cannot contain line breaks." };
  if (email.length > 120 || !EMAIL_RE.test(email)) return { error: "Please enter a valid email address." };
  if (message.length < 10 || message.length > 2000) return { error: "Message must be 10 to 2000 characters long." };

  return { value: { name, email, message } };
}
