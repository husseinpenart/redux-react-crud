import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addPost, changeStateFalse, changeStateTrue, fetchPost, removePost, updatePost } from './redux/crud'
const App = () => {

  const dispatch = useDispatch()
  const { loading, response, postList, updateState, update } = useSelector(
    (state) => state.post
  )
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  useEffect(() => {
    dispatch(fetchPost())
  }, [dispatch])
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(
      addPost({
        title: title,
        body: body,
      })
    );
    handleClickSnackbar();
    setTitle("");
    setBody("");
  };
  const [open, setOpen] = useState(false);

  const updateForm = () => {
    dispatch(updatePost({ title: title, body: body }))
    dispatch(changeStateFalse())
    handleClickSnackbar()
    setName("");
    setPosition("");
  }
  const handleClickSnackbar = () => {
    setOpen(true);

  }
  const deletePost = (id) => {
    dispatch(removePost(id));
    handleClickSnackbar();
  };
  const updatePost = (item) => {
    setTitle(item.title);
    setBody(item.body);
    dispatch(changeStateTrue());
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <form >
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} id="" cols="30" rows="10"></textarea>

        <button onClick={(e) => {
          handleClick(e);
        }}>submit</button>
      </form>
      <div>
        {response === "add"
          ? "employee added successfully"
          : response === "delete"
            ? "employee delete successfully"
            : response === "update"
              ? "employee update successfully"
              : null}
      </div>

      <p>{
        postList.map((e, i) => (
          <table id="customers">
            <tr>
              <th>title</th>
              <th>body</th>
              <th>operation</th>
            </tr>
            <tr>
              <td>{e.title}</td>
              <td>{e.body}</td>
              <td>

                <button

                  onClick={(e) => {
                    updateForm(e);
                  }}
                >
                  Update
                </button>

                <button
                  onClick={() => deletePost(e._id)}

                >
                  delete
                </button>

              </td>
            </tr>

          </table>
        ))
      }</p>
    </div>
  )
}

export default App