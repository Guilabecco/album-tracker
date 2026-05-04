import { useState, useCallback } from "react";
import { Camera, Star, AlertCircle, Search, BookOpen, Check, X, Plus, Minus, Upload, Loader, Images, ChevronDown, ChevronUp } from "lucide-react";
import { ALBUMS, DEFAULT_ALBUM_ID } from "./data/albums";
import { useAlbumState, analyzeAlbumPhoto } from "./hooks/useAlbum";
import "./App.css";

const album = ALBUMS[DEFAULT_ALBUM_ID];
const TOTAL = album.totalStickers; // 980

export default function App() {
  const { collected, duplicates, missing, duplicateList, allStickers, toggleSticker, setDuplicateCount, addScanned } = useAlbumState(album);
  const [activeTab, setActiveTab] = useState("album");
  const [scanning, setScanning] = useState(false);
  const [scanQueue, setScanQueue] = useState([]);
  const [scanProgress, setScanProgress] = useState({ current: 0, total: 0 });
  const [scanResults, setScanResults] = useState(null);
  const [pendingStickers, setPendingStickers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [expandedGroups, setExpandedGroups] = useState(() =>
    Object.fromEntries(album.groups.map(g => [g.id, true]))
  );

  const progress = TOTAL > 0 ? (collected.size / TOTAL) * 100 : 0;

  const toggleGroup = (gid) => setExpandedGroups(p => ({ ...p, [gid]: !p[gid] }));

  const handleImagesUpload = useCallback(async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setScanning(true);
    setScanResults(null);
    setPendingStickers([]);
    setScanProgress({ current: 0, total: files.length });

    let allFound = [];
    let allNotes = [];

    for (let i = 0; i < files.length; i++) {
      setScanProgress({ current: i + 1, total: files.length });
      const file = files[i];
      const base64 = await new Promise(res => {
        const r = new FileReader();
        r.onload = ev => res(ev.target.result.split(",")[1]);
        r.readAsDataURL(file);
      });
      try {
        const result = await analyzeAlbumPhoto(base64, file.type || "image/jpeg", [...collected, ...allFound], album);
        allFound = [...new Set([...allFound, ...(result.found || [])])];
        if (result.notes) allNotes.push(`Foto ${i+1}: ${result.notes}`);
      } catch (err) {
        allNotes.push(`Foto ${i+1}: erro`);
      }
    }

    const newOnes = allFound.filter(id => !collected.has(id));
    setScanResults({ found: allFound, notes: allNotes.join(" | ") });
    setPendingStickers(newOnes);
    setScanning(false);
    e.target.value = "";
  }, [collected]);

  const confirmScan = () => {
    addScanned(pendingStickers);
    setScanResults(null);
    setPendingStickers([]);
    setActiveTab("album");
  };

  const filteredGroups = album.groups.map(g => ({
    ...g,
    teams: g.teams.map(t => ({
      ...t,
      stickers: t.stickers.filter(s => {
        const matchSearch = s.label.toLowerCase().includes(searchQuery.toLowerCase());
        if (!matchSearch) return false;
        if (filter === "collected") return collected.has(s.id);
        if (filter === "missing") return !collected.has(s.id);
        return true;
      })
    })).filter(t => t.stickers.length > 0)
  })).filter(g => g.teams.length > 0);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="header-logo">
            <span className="logo-icon">⚽</span>
            <div>
              <h1 className="logo-title">AlbumTracker</h1>
              <p className="logo-sub">FIFA World Cup 2026 • Panini</p>
            </div>
          </div>
          <div className="header-stats">
            <div className="stat-pill">
              <span className="stat-number">{collected.size}</span>
              <span className="stat-label">tenho</span>
            </div>
            <div className="stat-pill stat-pill--missing">
              <span className="stat-number">{TOTAL - collected.size}</span>
              <span className="stat-label">faltam</span>
            </div>
            <div className="stat-pill stat-pill--dup">
              <span className="stat-number">{duplicateList.length}</span>
              <span className="stat-label">repetidas</span>
            </div>
          </div>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-label">{collected.size}/{TOTAL} ({progress.toFixed(1)}%)</span>
        </div>
      </header>

      <nav className="tabs">
        {[
          { id: "album", icon: <BookOpen size={16} />, label: "Álbum" },
          { id: "scan", icon: <Camera size={16} />, label: "Escanear" },
          { id: "missing", icon: <AlertCircle size={16} />, label: "Faltam" },
          { id: "duplicates", icon: <Star size={16} />, label: "Repetidas" },
        ].map(tab => (
          <button key={tab.id} className={`tab ${activeTab === tab.id ? "tab--active" : ""}`} onClick={() => setActiveTab(tab.id)}>
            {tab.icon}<span>{tab.label}</span>
          </button>
        ))}
      </nav>

      <main className="main">

        {/* ── ALBUM TAB ── */}
        {activeTab === "album" && (
          <div className="tab-content">
            <div className="search-row">
              <div className="search-box">
                <Search size={14} className="search-icon" />
                <input className="search-input" placeholder="Buscar figurinha ou jogador..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              <div className="filter-chips">
                {["all","collected","missing"].map(f => (
                  <button key={f} className={`chip ${filter === f ? "chip--active" : ""}`} onClick={() => setFilter(f)}>
                    {f === "all" ? "Todas" : f === "collected" ? "Tenho" : "Faltam"}
                  </button>
                ))}
              </div>
            </div>

            {filteredGroups.map(group => (
              <div key={group.id} className="group-section">
                <button className="group-header" onClick={() => toggleGroup(group.id)}>
                  <span className="group-name">{group.name}</span>
                  <span className="group-stats">
                    {group.teams.flatMap(t=>t.stickers).filter(s=>collected.has(s.id)).length}/{group.teams.flatMap(t=>t.stickers).length}
                  </span>
                  {expandedGroups[group.id] ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                </button>

                {expandedGroups[group.id] && group.teams.map(team => (
                  <div key={team.id} className="team-section">
                    <div className="team-header" style={{ borderColor: team.color }}>
                      <span className="team-flag">{team.flag}</span>
                      <h2 className="team-name">{team.name}</h2>
                      <span className="team-progress">{team.stickers.filter(s=>collected.has(s.id)).length}/{team.stickers.length}</span>
                    </div>
                    <div className="sticker-grid">
                      {team.stickers.map(sticker => {
                        const isCollected = collected.has(sticker.id);
                        const dupCount = duplicates[sticker.id] || 0;
                        const isPhoto = sticker.type === "team_photo";
                        return (
                          <div key={sticker.id} className={`sticker-card ${isCollected ? "sticker-card--collected" : ""} ${isPhoto ? "sticker-card--photo" : ""}`}
                            style={isCollected ? { borderColor: team.color, background: team.color + "18" } : {}}>
                            <button className="sticker-toggle" onClick={() => toggleSticker(sticker.id)}>
                              {isCollected ? <Check size={12} style={{ color: team.color }} /> : <div className="empty-icon" />}
                            </button>
                            <p className="sticker-label">{sticker.label}</p>
                            {isCollected && (
                              <div className="dup-controls">
                                <button className="dup-btn" onClick={() => setDuplicateCount(sticker.id, Math.max(0, dupCount - 1))}><Minus size={9} /></button>
                                <span className="dup-count">{dupCount > 0 ? `+${dupCount}` : "—"}</span>
                                <button className="dup-btn" onClick={() => setDuplicateCount(sticker.id, dupCount + 1)}><Plus size={9} /></button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ── SCAN TAB ── */}
        {activeTab === "scan" && (
          <div className="tab-content scan-tab">
            <div className="scan-hero">
              <div className="scan-icon-wrap"><Camera size={40} className="scan-hero-icon" /></div>
              <h2 className="scan-title">Escanear álbum com IA</h2>
              <p className="scan-desc">Selecione <strong>várias fotos de uma vez</strong> — a IA analisa todas as páginas automaticamente e marca as figurinhas que você tem!</p>
            </div>

            {!scanning && !scanResults && (
              <label className="upload-area">
                <Images size={28} />
                <span className="upload-title">Selecionar fotos do álbum</span>
                <span className="upload-sub">Pode selecionar múltiplas fotos de uma vez</span>
                <input type="file" accept="image/*" multiple onChange={handleImagesUpload} hidden />
              </label>
            )}

            {scanning && (
              <div className="scanning-state">
                <Loader size={32} className="spin" />
                <p className="scan-progress-text">Analisando foto {scanProgress.current} de {scanProgress.total}...</p>
                <div className="scan-progress-bar">
                  <div className="scan-progress-fill" style={{ width: `${(scanProgress.current / scanProgress.total) * 100}%` }} />
                </div>
              </div>
            )}

            {scanResults && !scanning && (
              <div className="scan-result">
                <h3 className="scan-result-title">Resultado — {scanProgress.total} foto{scanProgress.total > 1 ? "s" : ""} analisada{scanProgress.total > 1 ? "s" : ""}</h3>
                {scanResults.notes && <p className="scan-notes">📝 {scanResults.notes}</p>}
                <div className="scan-found">
                  <h4>✅ Encontradas ({(scanResults.found || []).length})</h4>
                  <div className="scan-tags">
                    {(scanResults.found || []).map(id => {
                      const isNew = !collected.has(id) || pendingStickers.includes(id);
                      return <span key={id} className={`tag ${isNew ? "tag--new" : "tag--exists"}`}>{id} {pendingStickers.includes(id) ? "🆕" : "✓"}</span>;
                    })}
                  </div>
                </div>
                {pendingStickers.length > 0 ? (
                  <div className="scan-actions">
                    <p className="scan-new-count">🎉 <strong>{pendingStickers.length}</strong> figurinhas novas encontradas!</p>
                    <button className="btn btn--primary" onClick={confirmScan}><Check size={16} /> Confirmar e salvar</button>
                    <button className="btn btn--ghost" onClick={() => setScanResults(null)}><X size={16} /> Cancelar</button>
                  </div>
                ) : (
                  <div className="scan-actions">
                    <p>Nenhuma figurinha nova encontrada.</p>
                    <button className="btn btn--ghost" onClick={() => setScanResults(null)}>Escanear novamente</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── MISSING TAB ── */}
        {activeTab === "missing" && (
          <div className="tab-content">
            <div className="section-header">
              <AlertCircle size={18} className="section-icon--missing" />
              <h2>Faltam {TOTAL - collected.size} de {TOTAL}</h2>
            </div>
            {album.groups.flatMap(g => g.teams.map(team => {
              const teamMissing = team.stickers.filter(s => !collected.has(s.id));
              if (!teamMissing.length) return null;
              return (
                <div key={team.id} className="team-section">
                  <div className="team-header" style={{ borderColor: team.color }}>
                    <span className="team-flag">{team.flag}</span>
                    <h2 className="team-name">{team.name}</h2>
                    <span className="team-progress missing-badge">{teamMissing.length} faltam</span>
                  </div>
                  <div className="missing-list">
                    {teamMissing.map(s => (
                      <div key={s.id} className="missing-item" onClick={() => toggleSticker(s.id)}>
                        <span className="missing-dot" style={{ background: team.color }} />
                        <span>{s.label}</span>
                        <button className="missing-add"><Plus size={12} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }))}
            {collected.size === TOTAL && (
              <div className="empty-state"><span style={{fontSize:48}}>🏆</span><h3>Álbum completo!</h3></div>
            )}
          </div>
        )}

        {/* ── DUPLICATES TAB ── */}
        {activeTab === "duplicates" && (
          <div className="tab-content">
            <div className="section-header">
              <Star size={18} className="section-icon--dup" />
              <h2>Repetidas ({duplicateList.length} figurinhas)</h2>
            </div>
            <p className="dup-hint">Use <strong>+/−</strong> em cada figurinha no Álbum para registrar repetidas. Elas aparecem aqui para facilitar trocas!</p>
            {duplicateList.length > 0 ? (
              <div className="dup-full-list">
                {duplicateList.map(([id, count]) => {
                  const sticker = allStickers.find(s => s.id === id);
                  const team = album.groups.flatMap(g => g.teams).find(t => t.stickers.some(s => s.id === id));
                  return (
                    <div key={id} className="dup-full-item">
                      <span className="dup-flag">{team?.flag}</span>
                      <span className="dup-name">{sticker?.label || id}</span>
                      <div className="dup-full-controls">
                        <button className="dup-btn" onClick={() => setDuplicateCount(id, Math.max(0, count - 1))}><Minus size={11} /></button>
                        <span className="dup-full-count">+{count}</span>
                        <button className="dup-btn" onClick={() => setDuplicateCount(id, count + 1)}><Plus size={11} /></button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state"><span style={{fontSize:48}}>🔄</span><h3>Nenhuma repetida</h3><p>Use +/− nas figurinhas coletadas.</p></div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
