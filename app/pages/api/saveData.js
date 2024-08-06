export default function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // Save the data to a database or temporary storage
    res.status(200).json({ success: true, data });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
