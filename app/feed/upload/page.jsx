"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userTags, setUserTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function handleFileChange(e) {
    const f = e.target.files[0];
    if (f) setFile(f);
  }

  // compress using canvas
  async function compressImage(file, maxWidth = 1400, quality = 0.8) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ratio = img.width / img.height;
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          width = maxWidth;
          height = Math.round(maxWidth / ratio);
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          URL.revokeObjectURL(url);
          if (!blob) return reject(new Error("Compression failed"));
          resolve(new File([blob], file.name, { type: blob.type }));
        }, "image/jpeg", quality);
      };
      img.onerror = (err) => {
        URL.revokeObjectURL(url);
        reject(err);
      };
      img.src = url;
    });
  }

  async function handleUpload(e) {
    e.preventDefault();
    setError("");
    if (!file) return setError("Please select an image");
    setLoading(true);

    try {
      // 1) compress
      const compressedFile = await compressImage(file, 1400, 0.8);

      // 2) request signature from our backend
      const signRes = await fetch("/api/upload/sign");
      if (!signRes.ok) throw new Error("Could not get signature");
      const signJson = await signRes.json();
      const { signature, timestamp, api_key, cloud_name } = signJson;

      // 3) create FormData and upload to Cloudinary
      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("api_key", api_key);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      // optional: folder
      formData.append("folder", signJson.folder);

      // optional transformations can be added later

      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
      const uploadRes = await fetch(uploadUrl, {
        method: "POST",
        body: formData
      });
      if (!uploadRes.ok) {
        const errTxt = await uploadRes.text();
        throw new Error("Cloudinary upload failed: " + errTxt);
      }
      const uploadJson = await uploadRes.json();
      // uploadJson.secure_url, uploadJson.public_id, uploadJson.width/height, etc.

      // thumbnail url using Cloudinary transformations (example: width 500 crop)
      const thumbnailUrl = `https://res.cloudinary.com/${cloud_name}/image/upload/w_500,c_fill/${uploadJson.public_id}.jpg`;

      // 4) save pin in our DB
      const saveRes = await fetch("/api/pins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // include cookies automatically; ensure fetch runs from same origin
        body: JSON.stringify({
          imageUrl: uploadJson.secure_url,
          thumbnailUrl,
          title,
          description,
          userTags: userTags ? userTags.split(",").map(t => t.trim()).filter(Boolean) : []
        })
      });

      if (!saveRes.ok) {
        const json = await saveRes.json();
        throw new Error(json?.error || "Could not save pin");
      }

      // success: redirect to home or grid
      setLoading(false);
      router.push("/feed"); // or wherever your grid is
    } catch (err) {
      console.error(err);
      setError(err.message || "Upload failed");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Upload a Pin</h1>

      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <div>
          <label className="block text-sm font-medium">Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Tags (comma separated)</label>
          <input value={userTags} onChange={e => setUserTags(e.target.value)} className="w-full border p-2 rounded" />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button disabled={loading} type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
