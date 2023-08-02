import { useState, useEffect } from "react";
import {collection, getDocs, getDoc, deleteDoc, doc, updateDoc, onSnapshot, addDoc} from "firebase/firestore";
import {db } from "../FireBaseConfig/firebase.js";
import NoteComponent from '../pure/NoteComponent.jsx';
import { CATEGORIES } from "../models/categories.enum.js";
import { useRef } from "react";



const Show = (  ) => {
    // config hooks
    const [notes, setNotes] = useState([]); 
    const [archived, setArchived] = useState([]);
    const [filter, setFilter] = useState("All");
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState("");
    const [content, setContent] = useState("");
     
    const categoriesRef = useRef(CATEGORIES.NORMAL)

    //config ref to DB
    const notesCollection = collection(db, "Notes");
    /* const archivedCollection = collection(db, "Archived");  */
   
   
    //get notes from DB
    const getNotes = async () => {
        const data = await getDocs(notesCollection);
        setNotes(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        console.log(notes);
    }

    const moveNoteToArchived = async (id) => { 
        try {
            const noteRef = doc(db, "Notes", id);
            const noteSnapshot = await getDoc(noteRef);
            const noteData = noteSnapshot.data();
      
            const archivedCollection = collection(db, "Archived");
            await addDoc(archivedCollection, noteData);
      
            await deleteDoc(noteRef);
      
            setNotes(notes.filter((note) => note.id !== id));
            } catch (error) {
            console.error("Error moving note:", error);
            }
        };

    const update = async (id, title, categories, content) => {
    const noteDoc = doc(db, "Notes", id);
    const currentDate = new Date().toLocaleString();
    await updateDoc(noteDoc, {
        title,
        categories,
        content,
        date : currentDate,
    });

        setNotes(notes.map(note =>
        note.id === id ? { ...note, title, categories, content } : note
    ));
    }

    //delete notes
    const deteleNotes = async (id) => {
        const noteDoc = doc(db, "Notes", id);
        await deleteDoc(noteDoc);
        getNotes();
    }
    
    // config useEffect
    useEffect(() => {
        const notesCollection = collection(db, "Notes");
        const unsubscribe = onSnapshot(notesCollection, (querySnapshot) => {
        const updatedNotes = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
            setNotes(updatedNotes);
        });
    
        return () => {
          // Limpieza del listener cuando el componente se desmonta
        unsubscribe();
        };
      }, []);

async function openMOdal (id){
    const modal = notes.find(note => note.id === id);
    if(modal){
        const modalNotes = document.getElementById(`archived_${id}`);
        if(modalNotes){
            await modalNotes.showModal();
        } 
}}

async function openMOdal2 (id){
    const modal = notes.find(note => note.id === id);
    if(modal){
        const modalNotes = document.getElementById(`edit_${id}`);
        if(modalNotes){
            await modalNotes.showModal();
        } 
}}

async function openMOdal3 (id){
    const modal = notes.find(note => note.id === id);
    if(modal){
        const modalNotes = document.getElementById(`delete_${id}`);
        if(modalNotes){
            await modalNotes.showModal();
        } 
}}

function handleFilter (e) {
    e.preventDefault();
    setFilter(categoriesRef.current);

}

const filteredNotes = filter === 'All' ? notes : notes.filter(note => note.categories.includes(filter));

console.log(filteredNotes);
console.log(filter);

    return (
        <div className='flex flex-col justify-center items-center mt-10 gap-7'>
            <form  method="dialog" className="modal-box flex justify-between items-center bg-slate-700 w-full max-w-3xl">
                    <h3 className="font-bold text-3xl ">Filter by categories</h3>
                    <div className="form-control w-[40%] ">
                            <select ref={categoriesRef}  defaultValue="All" onChange={(e) => categoriesRef.current = e.target.value} className="select select-bordered  bg-white  text-black text-lg">
                                <option value="All">See All</option>
                                <option value={CATEGORIES.NORMAL}>Normal</option>
                                <option value={CATEGORIES.DAILY}>Daily</option>
                                <option value={CATEGORIES.HOME}>Home Work</option>
                                <option value={CATEGORIES.IMPORTANT}>Important</option>
                                <option value={CATEGORIES.PERSONAL}>Personal Data</option>
                                <option value={CATEGORIES.URGENT}>Urgent</option>
                            </select>
                    </div> 
                    <div >
                        <button className="btn btn-primary px-7 text-xl " type="submit" onClick= {handleFilter} >Filter</button>
                    </div>
                </form>
            {

                filteredNotes.map((note) =>(
                    <NoteComponent key={note.index} title={note.title} content={note.content} categories={note.categories} id={note.id} date={note.date}  func4={deteleNotes} func1={openMOdal} func2={openMOdal2} func3={openMOdal3}   func5={update}  setTitle={setTitle}  setCategories={setCategories} setContent={setContent}  func6={moveNoteToArchived}/>
                ))
            }
        </div>
    )
}


export default Show


