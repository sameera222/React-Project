import React, { useEffect, useState } from 'react'
import{signOut, onAuthStateChanged} from "firebase/auth"
import { auth, db } from '../firebase'
import {useNavigate} from "react-router-dom"
import {uid} from "uid"
import {set, ref,onValue, remove, update} from "firebase/database"
import "./HomePage.css"
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from '@mui/icons-material/Logout';
import CheckIcon from '@mui/icons-material/Check';


export default function HomePage() {
    const [todo, setTodo] = useState("");
    const[toDos, setToDoList] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUidd, setTempUidd] = useState("");
    const navigate = useNavigate()

    useEffect(()=>{  
        auth.onAuthStateChanged((user) =>{
            if(user){

              onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
                setToDoList([]);
                const data = snapshot.val();
                if (data !== null) {
                  Object.values(data).map((todo) => {
                    setToDoList((oldArray) => [...oldArray, todo]);
                  });

            }
        })
        }
        else if(!user){
                navigate("/")
            }
        })
    }, [])

    const handleSignOut = ()=>{
        signOut(auth).then(()=>{
            navigate("/")
        })
        .catch(error => {alert(error.message)})

    }
    const handleEditConfirm = () => {
        update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`),{
          todo: todo,
          tempUidd: tempUidd
        });
    
        setTodo("");
        setIsEdit(false);
      };

    const writeToDatabase = ()=>{
             const uidd = uid();
             set(ref(db, `/${auth.currentUser.uid}/${uidd}`),{
                todo: todo,
                uidd: uidd
             })

           setTodo("")  
           
      }
  

    const handleUpdate = (todo) => {
        setIsEdit(true);
        setTodo(todo.todo);
        setTempUidd(todo.uidd);
      };
    const handleDelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
      };
   
  return (
    <>
      <div className="homePage">
           <input type="text" placeholder="Add todo..."
           className="add-edit-input"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}/>
             
    {toDos.map((todo) => (
        <div className="todo">
          <h1>{todo.todo}</h1>
          <EditIcon
            fontSize="large"
            onClick={() => handleUpdate(todo)}
            className="edit-button"
          />
          <DeleteIcon
            fontSize="large"
            onClick={() => handleDelete(todo.uidd)}
            className="delete-button"
          />
        </div>
      ))}

   {isEdit ? (
        <div>
         <CheckIcon onClick={handleEditConfirm} className="add-confirm-icon"/>
        </div>
      ) : (
        <div>
          <AddIcon onClick={writeToDatabase} className="add-confirm-icon" />
        </div>
      )}
            <LogoutIcon onClick={handleSignOut} className="logout-icon" />
            {/* <button onClick={handleSignOut}>Sign Out</button> */}
     </div>
    </>
    
  )
}

