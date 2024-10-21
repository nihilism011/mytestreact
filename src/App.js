import axios from "axios";
import { useEffect, useRef, useState } from "react";

function App() {
  const [flg, setFlg] = useState(true);
  const [list, setList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/person").then(({ data }) => {
      setList(data);
      console.log(data);
    });
  }, [flg]);
  const addrRef = useRef(null);
  const nameRef = useRef(null);
  const genderRef = useRef(null);
  const phoneRef = useRef(null);
  const insert = () => {
    if (genderRef.current === null) {
      return;
    }
    axios
      .post("http://localhost:8080/person", {
        name: nameRef.current.value,
        gender: genderRef.current.value,
        phone: phoneRef.current.value,
        addr: addrRef.current.value,
      })
      .then((res) => {
        setFlg(!flg);
      });
  };
  const delId = useRef(null);
  const deleteId = () => {
    const url = `http://localhost:8080/person/${delId.current}`;
    axios.delete(url).then((res) => {
      setFlg(!flg);
    });
  };
  const putId = useRef(null);
  const putGender = useRef(null);
  const fnPut = (id, gender) => {
    putId.current = id;
    putGender.current = gender === "M" ? "F" : "M";
    console.log(putId.current);
    console.log(putGender.current);
  };
  const updateId = () => {
    console.log(putId.current);
    const url = `http://localhost:8080/person/${putId.current}`;
    axios.put(url, { gender: putGender.current }).then((res) => {
      putGender.current = putGender.current === "M" ? "F" : "M";
      setFlg(!flg);
    });
  };
  return (
    <div className="App">
      <div>
        <h2>2-1번 문제</h2>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>gender</th>
              <th>phone</th>
              <th>addr</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.gender === "M" ? "남자" : "여자"}</td>
                <td>{item.phone}</td>
                <td>{item.addr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr />
      <h2>2-2번 문제</h2>
      <div>
        <div>
          <label>
            name
            <input ref={nameRef}></input>
          </label>
        </div>
        <div>
          <label>
            남자
            <input
              type="radio"
              name="inGender"
              onChange={(e) => {
                genderRef.current = e.target;
              }}
              value="M"
            ></input>
          </label>
          <label>
            여자
            <input
              type="radio"
              name="inGender"
              onChange={(e) => {
                genderRef.current = e.target;
              }}
              value="F"
            ></input>
          </label>
        </div>
        <div>
          <label>
            phone
            <input ref={phoneRef}></input>
          </label>
        </div>
        <div>
          <label>
            addr
            <input ref={addrRef}></input>
          </label>
        </div>
        <button onClick={insert}>insert</button>
      </div>
      <hr />
      <h2>2-3번 문제</h2>
      <div>
        <div>delete id</div>
        <div>
          {list.map((item, index) => (
            <label key={index}>
              {item.id}
              <input
                type="radio"
                onChange={(e) => {
                  delId.current = e.target.value;
                }}
                value={item.id}
                name="delId"
              ></input>
            </label>
          ))}
        </div>
        <button onClick={deleteId}>delete</button>
      </div>
      <hr />
      <h2>2-4번 문제</h2>
      <div>gender change id</div>
      <div>
        {list.map((item, index) => (
          <label key={index}>
            {item.id}
            <input
              type="radio"
              onChange={(e) => {
                fnPut(e.target.value, item.gender);
              }}
              value={item.id}
              name="reGender"
            ></input>
          </label>
        ))}
      </div>
      <button onClick={updateId}>성전환</button>
    </div>
  );
}

export default App;
