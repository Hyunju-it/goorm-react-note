import React from 'react';

interface FormatToolbarProps {
  onFormat: (command: string, value?: string) => void;
}

const FormatToolbar: React.FC<FormatToolbarProps> = ({ onFormat }) => {
  const handleFormatClick = (command: string, value?: string) => {
    onFormat(command, value);
  };

  return (
    <div className="format-toolbar">
      <button
        type="button"
        className="format-btn"
        onClick={() => handleFormatClick('insertUnorderedList')}
        title="불릿 목록"
      >
        ☰
      </button>

      <button
        type="button"
        className="format-btn"
        onClick={() => handleFormatClick('insertOrderedList')}
        title="번호 목록"
      >
        ≡
      </button>

      <button
        type="button"
        className="format-btn"
        onClick={() => handleFormatClick('italic')}
        title="기울임"
      >
        <i>I</i>
      </button>

      <button
        type="button"
        className="format-btn"
        onClick={() => handleFormatClick('underline')}
        title="밑줄"
      >
        <u>U</u>
      </button>

      <button
        type="button"
        className="format-btn"
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