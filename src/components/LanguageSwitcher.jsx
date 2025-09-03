import React, { useState } from "react";

const LANGS = [
  { code: "kk", label: "Қаз" },
  { code: "ru", label: "Рус" },
  { code: "en", label: "Eng" }
];

export const LanguageSwitcher = ({ lang, setLang }) => (
  <div className="lang-switcher" style={{display:'flex',gap:'0.5em',alignItems:'center'}}>
    {LANGS.map(l => (
      <button
        key={l.code}
        onClick={() => setLang(l.code)}
        style={{
          padding: '0.3em 0.8em',
          borderRadius: '6px',
          border: lang === l.code ? '2px solid #2d8fa3' : '1px solid #ccc',
          background: lang === l.code ? '#e9dcc4' : '#fff',
          color: lang === l.code ? '#2d8fa3' : '#222',
          fontWeight: lang === l.code ? 'bold' : 'normal',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: '1em',
          transition: 'all 0.2s'
        }}
      >
        {l.label}
      </button>
    ))}
  </div>
);
