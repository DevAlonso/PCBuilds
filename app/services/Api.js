const SUPABASE_URL = "https://vkgaukszctzulonsvorj.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrZ2F1a3N6Y3R6dWxvbnN2b3JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MzgwNTcsImV4cCI6MjA3OTExNDA1N30.GH4Na58L-4sLad9OjlzU496kN9KovwcbEBfJIzJ2fFo";

const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
};

export const getBuilds = async () => {
  return fetch(`${SUPABASE_URL}/rest/v1/builds?select=*`, {
    method: "GET",
    headers: headers,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  });
};

export const createBuild = (nombre, tipo) => {
  return fetch(`${SUPABASE_URL}/rest/v1/builds`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      nombre: nombre,
      tipo: tipo,
      imagen_path: null,
    }),
  })
  .then((response) => response.ok)
  .catch(() => false);
};
