export async function analyzeAlbumPhoto(imageBase64, mediaType, existingStickers, albumData) {
  const allStickers = albumData.groups
    .flatMap((g) => g.teams)
    .flatMap((t) => t.stickers)
    .map((s) => `${s.id}: ${s.label}`)
    .join("\n");

  const prompt = `Você é especialista em álbuns Panini FIFA World Cup 2026. Analise esta foto de páginas do álbum.

Identifique quais figurinhas estão COLADAS (presentes) e quais estão VAZIAS nas páginas mostradas.

Lista de figurinhas possíveis:
${allStickers}

Já coletadas: ${existingStickers.slice(0, 50).join(", ")}${existingStickers.length > 50 ? "..." : ""}

Responda APENAS em JSON sem markdown:
{"found":["ID1","ID2"],"empty":["ID3"],"notes":"observação curta"}

"found" = IDs das figurinhas COLADAS visíveis na foto.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: mediaType, data: imageBase64 } },
          { type: "text", text: prompt },
        ],
      }],
    }),
  });

  const data = await response.json();
  const text = data.content?.find((b) => b.type === "text")?.text || "{}";
  const clean = text.replace(/```json|```/g, "").trim();
  try { return JSON.parse(clean); } catch { return { found: [], empty: [], notes: "Erro ao analisar" }; }
}

import { useState } from "react";

export function useAlbumState(albumData) {
  const storageKey = `album-${albumData?.id || "default"}`;

  const [collected, setCollected] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(`${storageKey}-collected`) || "[]")); }
    catch { return new Set(); }
  });

  const [duplicates, setDuplicates] = useState(() => {
    try { return JSON.parse(localStorage.getItem(`${storageKey}-duplicates`) || "{}"); }
    catch { return {}; }
  });

  const save = (c, d) => {
    localStorage.setItem(`${storageKey}-collected`, JSON.stringify([...c]));
    localStorage.setItem(`${storageKey}-duplicates`, JSON.stringify(d));
  };

  const toggleSticker = (id) => setCollected(prev => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    save(next, duplicates);
    return next;
  });

  const setDuplicateCount = (id, count) => setDuplicates(prev => {
    const next = { ...prev };
    if (count <= 0) delete next[id]; else next[id] = count;
    save(collected, next);
    return next;
  });

  const addScanned = (foundIds) => setCollected(prev => {
    const next = new Set(prev);
    foundIds.forEach(id => next.add(id));
    save(next, duplicates);
    return next;
  });

  const allStickers = albumData ? albumData.groups.flatMap(g => g.teams).flatMap(t => t.stickers) : [];
  const missing = allStickers.filter(s => !collected.has(s.id));
  const duplicateList = Object.entries(duplicates).filter(([, c]) => c > 0);

  return { collected, duplicates, missing, duplicateList, allStickers, toggleSticker, setDuplicateCount, addScanned };
}
