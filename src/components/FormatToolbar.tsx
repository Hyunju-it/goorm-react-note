import React, { useState } from 'react';

interface FormatToolbarProps {
  onFormat: (command: string, value?: string) => void;
}

const FormatToolbar: React.FC<FormatToolbarProps> = ({ onFormat }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontSizePicker, setShowFontSizePicker] = useState(false);

  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
  const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px'];

  return (
    <div className="format-toolbar">
      <button onClick={() => onFormat('insertUnorderedList')} title="불릿 목록">
        ≡
      </button>
      <button onClick={() => onFormat('insertOrderedList')} title="번호 목록">
        ≡
      </button>
      <button onClick={() => onFormat('bold')} title="굵게">
        <strong>I</strong>
      </button>
      <button onClick={() => onFormat('italic')} title="기울임">
        <em>U</em>
      </button>
      <button onClick={() => onFormat('underline')} title="밑줄">
        <s>S</s>
      </button>

      <div className="color-picker-wrapper">
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          title="글자 색"
          className="color-btn"
        >
          A
        </button>
        {showColorPicker && (
          <div className="color-palette">
            {colors.map(color => (
              <button
                key={color}
                className="color-option"
                style={{ backgroundColor: color }}
                onClick={() => {
                  onFormat('foreColor', color);
                  setShowColorPicker(false);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="font-size-wrapper">
        <button
          onClick={() => setShowFontSizePicker(!showFontSizePicker)}
          title="글자 크기"
          className="font-size-btn"
        >
          A±
        </button>
        {showFontSizePicker && (
          <div className="font-size-options">
            {fontSizes.map(size => (
              <button
                key={size}
                onClick={() => {
                  onFormat('fontSize', size);
                  setShowFontSizePicker(false);
                }}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      <button onClick={() => onFormat('insertHTML', '<blockquote></blockquote>')} title="이미지">
        📷
      </button>
      <button onClick={() => onFormat('insertHTML', '<blockquote></blockquote>')} title="인용">
        ""
      </button>
      <button onClick={() => onFormat('insertHTML', '<code></code>')} title="코드">
        &lt;/&gt;
      </button>
    </div>
  );
};

export default FormatToolbar;