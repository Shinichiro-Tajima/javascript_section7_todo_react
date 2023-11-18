import { useState } from "react";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";
import "./styles.css";

export const Todo = () => {
  // 入力テキストボックス
  const [todoText, setTodoText] = useState("");

  // 未完了Todoリスト
  const [incompleteTodos, setIncompleteTodos] = useState([]);

  // 完了Todoリスト
  const [completeTodos, setCompleteTodos] = useState([]);

  // 入力テキストボックスが変更された際に動く関数
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // 追加ボタンを押した際に動く関数
  const onClickAdd = () => {
    // テキストボックスに何も入力されていない場合は何もせず戻す
    if (todoText === "") return;

    // 配列を新しく作って内容を丸ごとコピー＋入力されたテキストを末尾に追加
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);

    // テキストボックスを空欄にする
    setTodoText("");
  };

  // 未完了Todoの削除ボタンを押した際に動く関数
  const onClickDelete = (index) => {
    // 配列を新しく作って内容を丸ごとコピー
    const newTodos = [...incompleteTodos];

    // 配列から指定の要素を削除する。index番目から1個削除する
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  // 完了ボタンを押したときに動く関数
  const onClickComplete = (index) => {
    // // 配列を新しく作って内容を丸ごとコピー
    // const newIncompleteTodos = [...incompleteTodos];
    // // 配列から指定の要素を削除する。index番目から1個削除する
    // newIncompleteTodos.splice(index, 1);
    // setIncompleteTodos(newIncompleteTodos);
    onClickDelete(index); // 未完了から削除する関数を呼び出す

    // 完了Todoに追加
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setCompleteTodos(newCompleteTodos);
  };

  // 戻すボタンを押したときに動く関数
  const onClickBack = (index) => {
    // 完了Todoから戻したTodoを削除
    const newCompleteTodos = [...completeTodos]; // 配列を丸ごとコピー
    newCompleteTodos.splice(index, 1); // 配列からindex番目の要素を削除
    setCompleteTodos(newCompleteTodos);

    // 未完了Todoに戻したTodoを追加
    // 配列を丸ごとコピー＋末尾に戻すボタンを押したTodoを追加
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
  };

  // 未完了リストの個数の上限判定
  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;

  // 画面に表示する内容を返す
  return (
    <>
      {/* 入力エリア */}
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={isMaxLimitIncompleteTodos}
      />

      {
        // 未完了Todoの上限に達した際に表示するメッセージ
        isMaxLimitIncompleteTodos && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            登録できるTODOは5個までです。消化してください
          </p>
        )
      }

      {/* 未完了Todo */}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />

      {/* 完了Todo */}
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
