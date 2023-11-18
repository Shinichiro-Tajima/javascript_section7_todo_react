// スタイル設定
const style = {
  backgroundColor: "#c1ffff",
  width: "400px",
  height: "30px",
  padding: "8px",
  margin: "8px",
  borderRadius: "8px"
};

export const InputTodo = (props) => {
  const { todoText, onChange, onClick, disabled } = props;

  // テキストボックスでキーが押されたときに動く関数
  const onKeyDown = (event) => {
    // alert(event.key);
    if (event.key === "Enter") {
      // エンターキーが押された場合は追加ボタンを押したことにする
      onClick(event);
    }
  };

  // コンポーネントが返す値
  return (
    <div style={style}>
      <input
        disabled={disabled}
        placeholder="TODOを入力"
        value={todoText}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <button disabled={disabled} onClick={onClick}>
        追加
      </button>
    </div>
  );
};
