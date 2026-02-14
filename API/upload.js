// api/upload.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { fileName, content } = req.body;
  const token = process.env.GH_TOKEN; // This is hidden on the server!
  const repo = "YOUR_USERNAME/YOUR_REPO_NAME";

  const response = await fetch(`https://api.github.com/repos/${repo}/contents/raw/${Date.now()}-${fileName}`, {
    method: "PUT",
    headers: {
      "Authorization": `token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Secure upload via Proxy",
      content: content // base64 string
    })
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
