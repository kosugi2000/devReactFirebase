import { FormControl, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import AppleIcon from '@material-ui/icons/Apple';
import TaskItem from "./TaskItem";

const App = () => {
  // 1.記述
  const [data, setData] = useState([{ id: "", title: "", contents: "" }]);
  // 記述登録1 １個のインプットは１個のusestate 登録するときは１個のオブジェクトで送る。
  const [inputValue, setInputValue] = useState("");
  // 記述登録２
  const handleInputChange = (e) => {
    console.log(e, "event");
    setInputValue(e.target.value); //inputValueに値を書き込む（更新）
  };
   // 記述登録３
   const addInputData = () => {
     db.collection("group").add({title: inputValue});
     setInputValue("");
   };
  // 2.記述
  useEffect(() => {
    const firebaseData = db.collection("group")
     .orderBy("title", "asc")
     .onSnapshot((snapshot) => {
      setData(
        snapshot.docs.map((dbData) => ({
          id: dbData.id,
          title: dbData.data().title,
          contents: dbData.data().contents,
        }))
      );
    });
    return () => firebaseData();
  }, []); //←ここに最後一つ書きたします
  // // ここに記述,useStateで作ったdata変数をコンソールログで表示
  // console.log(data);
  return (
    <div>
      <h1>一言タイトル</h1>
      {/* 登録の処理 */}
      <FormControl>
        {/* inputタグ */}
        <TextField
          label="登録追加"
          value={inputValue}
          onChange={handleInputChange}
        />
      </FormControl>
{/* 登録の処理　ボタン */}
<button
disabled={!inputValue}
onClick={addInputData}>
<AppleIcon/>
</button>


      {/* dataっていう変数のなかに全てのデータが入っているのでmapを使って展開 */}
      {data.map((dataItem) => (
        <React.Fragment key={dataItem.id}>
            <TaskItem id={dataItem.id} title={dataItem.title} />
          {/* <h3>コンテンツ:{dataItem.contents}</h3> */}
        </React.Fragment>
      ))}
    {/* {data.map((dataItem)=>(
  <TaskItem id={dataItem.id} title={dataItem.title} />
))} */}
</div>
  );
};


export default App;