import React, { useEffect } from 'react';
import { useRef, useState } from "react";

import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../../constants";
import Output from "./Output";
import ACTIONS from '../../Actions';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';


const CodeEditor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);
    useEffect(() => {
        async function init() {
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: 'javascript', json: true },
                    theme: 'dracula',
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );

            editorRef.current.on('change', (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                onCodeChange(code);
                if (origin !== 'setValue') {
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            });
        }
        init();
    }, []);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }

        return () => {
          if (socketRef.current) {
            socketRef.current.off(ACTIONS.CODE_CHANGE);
          }
        };
    }, [socketRef.current]);

  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <div style={{ width: '50%' }}>
          <div style={{zIndex: 1 }}>
          <LanguageSelector language={language} onSelect={onSelect} />
          </div>
          
          <textarea id="realtimeEditor" style={{ display: 'none' }}></textarea></div>
        
        <Output editorRef={editorRef} language={language} />
      </div>
    </div>
  );
};
export default CodeEditor;