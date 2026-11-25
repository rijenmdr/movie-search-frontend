export function handleError(
  status: number,
  title: string,
  detail: string,
): Response {
  return Response.json(
    { title, status, detail },
    {
      status,
      headers: { "Content-Type": "application/problem+json" },
    },
  );
}