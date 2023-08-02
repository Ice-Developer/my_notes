import { Link } from "react-router-dom"
import { collection, addDoc, getDocs } from "firebase/firestore"
import { db } from "../FireBaseConfig/firebase"
import { useState } from "react"
import Show from "./Show"
import { CATEGORIES } from "../models/categories.enum"
import { useRef } from "react"

/* import { NavBar } from "./NavBar" */


const Home = () => {
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const [notes, setNotes] = useState([]); 

    const addNotes = collection(db, "Notes");

    const categoriesRef = useRef(CATEGORIES.NORMAL)


    const getNotes = async () => {
        const data = await getDocs(addNotes);
        setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const handleSubmit = async () => {
        const currentDate = new Date().toLocaleString();
        console.log(currentDate); 
        await addDoc(addNotes, {
            title,
            categories: categoriesRef.current.value,
            content,
            date : currentDate,
        

        });
        setTitle("");
        setCategories("");
        setContent("");
        await getNotes();
    }
    

    return (
        
        <div>
                    <div className="flex justify-between items-center m-4">
                <div className="flex justify-center items-center  gap-5">
                    <h1 className="font-bold text-3xl text-left ">My Notes</h1>
                    <button className="btn btn-primary p-4 rounded-xl bg-neutral font-bold text-white" onClick={()=>window.create.showModal()}> Create Note </button>
                    <Link to="/archived">
                        <button className="btn btn-primary p-4 rounded-xl bg-neutral font-bold text-white"> Archived </button>
                    </Link>
                </div>

                <dialog id= "create" className="modal">
                    <form method="dialog" className="modal-box">
                        <h3 className="font-bold text-3xl">Reed o Edit note</h3>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-bold text-xl">Title</span>
                            </label>
                            <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} className="input input-bordered w-full  bg-white  text-black" />
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-bold text-xl">Content</span>
                            </label>
                            <textarea className="textarea textarea-bordered h-48 text-lg  bg-white  text-black" value={content} onChange={(e)=> setContent(e.target.value)}></textarea>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-bold text-xl">Categories</span>
                            </label>
                            <select ref={categoriesRef} defaultValue={CATEGORIES.NORMAL} onChange={(e)=> setCategories(e.target.value)} /* value={CATEGORIES} */ className="select select-bordered  bg-white  text-black text-lg">
                                <option value={CATEGORIES.NORMAL}>Normal</option>
                                <option value={CATEGORIES.DAILY}>Daily</option>
                                <option value={CATEGORIES.HOME}>Home Work</option>
                                <option value={CATEGORIES.IMPORTANT}>Important</option>
                                <option value={CATEGORIES.PERSONAL}>Personal Data</option>
                                <option value={CATEGORIES.URGENT}>Urgent</option>
                            </select>
                        </div>
                        <div className="modal-action">
                        <button type= "submit" className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
                        <button className="btn btn-secondary">Close</button>
                        </div>
                    </form>
                </dialog>

            </div>
            <div>
                <Show />
            </div>

            
        </div>
    )
}

export default Home