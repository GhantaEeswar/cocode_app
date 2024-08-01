
import './LanguageSelector.css'
import React, { useState } from 'react';
import { LANGUAGE_VERSIONS } from "../../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "#4299E1"; // equivalent to blue.400 in Chakra UI

const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ marginLeft: '8px', marginBottom: '16px' }}>
      <h2 style={{ marginBottom: '8px', fontSize: '18px' }}>
        Language:
      </h2>
      <div className="dropdown">
        <button
          className="dropdown-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {language}
        </button>
        {isOpen && (
          <div className="dropdown-menu" style={{ backgroundColor: '#110c1b', zIndex: 1 }}>
            {languages.map(([lang, version]) => (
              <div
                key={lang}
                className="dropdown-item"
                style={{
                  color: lang === language ? ACTIVE_COLOR : '',
                  backgroundColor: lang === language ? '#333' : 'transparent',
                }}
                onClick={() => {
                  onSelect(lang);
                  setIsOpen(false);
                }}
              >
                {lang}
                &nbsp;
                <span style={{ color: '#666', fontSize: '12px' }}>
                  ({version})
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;