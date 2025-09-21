import React, { useState, useEffect } from 'react';

interface FormatToolbarProps {
  onFormat: (command: string, value?: string) => void;
}

const FormatToolbar: React.FC<FormatToolbarProps> = ({ onFormat }) => {
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

  const checkFormatState = () => {
    const formats = new Set<string>();

    try {
      if (document.queryCommandState('italic')) formats.add('italic');
      if (document.queryCommandState('underline')) formats.add('underline');
      if (document.queryCommandState('strikeThrough')) formats.add('strikeThrough');
      if (document.queryCommandState('insertUnorderedList')) formats.add('insertUnorderedList');
      if (document.queryCommandState('insertOrderedList')) formats.add('insertOrderedList');
    } catch (e) {
      // queryCommandState 에러 무시
    }

    setActiveFormats(formats);
  };

  useEffect(() => {
    document.addEventListener('selectionchange', checkFormatState);
    return () => document.removeEventListener('selectionchange', checkFormatState);
  }, []);

  const handleFormatClick = (command: string, value?: string) => {
    onFormat(command, value);
    // 포맷 적용 후 상태 체크
    setTimeout(checkFormatState, 10);
  };

  return (
    <div className="format-toolbar">
      <button
        type="button"
        className={`format-btn ${activeFormats.has('insertUnorderedList') ? 'active' : ''}`}
        onClick={() => handleFormatClick('insertUnorderedList')}
        title="불릿 목록"
      >
        ☰
      </button>

      <button
        type="button"
        className={`format-btn ${activeFormats.has('insertOrderedList') ? 'active' : ''}`}
        onClick={() => handleFormatClick('insertOrderedList')}
        title="번호 목록"
      >
        ≡
      </button>

      <button
        type="button"
        className={`format-btn ${activeFormats.has('italic') ? 'active' : ''}`}
        onClick={() => handleFormatClick('italic')}
        title="기울임"
      >
        <i>I</i>
      </button>

      <button
        type="button"
        className={`format-btn ${activeFormats.has('underline') ? 'active' : ''}`}
        onClick={() => handleFormatClick('underline')}
        title="밑줄"
      >
        <u>U</u>
      </button>

      <button
        type="button"
        className={`format-btn ${activeFormats.has('strikeThrough') ? 'active' : ''}`}
        onClick={() => handleFormatClick('strikeThrough')}
        title="취소선"
      >
        <s>S</s>
      </button>

      <button
        type="button"
        className="format-btn"
        onClick={() => handleFormatClick('foreColor', '#ff0000')}
        title="글자 색상"
      >
        A
      </button>

      <button
        type="button"
        className="format-btn"
        onClick={() => handleFormatClick('fontSize', '4')}
        title="글자 크기"
      >
        🄰
      </button>

      <button
        type="button"
        className="format-btn"
        onClick={() => handleFormatClick('insertImage')}
        title="이미지"
      >
        🖼
      </button>

      <button
        type="button"
        className="format-btn"
        onClick={() => handleFormatClick('formatBlock', 'blockquote')}
        title="인용문"
      >
        ❝❞
      </button>

      <button
        type="button"
        className="format-btn"
        onClick={() => handleFormatClick('formatBlock', 'pre')}
        title="코드 블록"
      >
        &lt;/&gt;
      </button>
    </div>
  );
};

export default FormatToolbar;