import React, { useCallback } from "react";
import { List } from "../../node_modules/react-virtualized/dist/commonjs/List/index";
import TodoListItem from "./TodoListItem";
import "./TodoList.scss";

const sortArray = (arr) => {
  let nonChecked = [];
  let checked = [];
  arr.map((e) => (e.checked === true ? checked.push(e) : nonChecked.push(e)));
  return (arr = nonChecked.concat(checked));
};

const TodoList = ({ todos, onRemove, onToggle }) => {
  const sortedTodos = sortArray(todos);
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = sortedTodos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos]
  );
  return (
    <List
      className="TodoList"
      width={512} // 전체 크기
      height={513} // 전체 높이
      rowCount={todos.length} // 항목 개수
      rowHeight={57} // 항목 높이
      rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
      list={todos} // 배열
      style={{ outline: "none" }} // List에 기본 적용되는 outline 스타일 제거
    />
  );
};
export default React.memo(TodoList);
