/* eslint-disable react/no-unescaped-entities */
import { addDoc, doc } from 'firebase/firestore';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {collection, getDocs, getDoc, deleteDoc} from "firebase/firestore";
import {db} from "../FireBaseConfig/firebase.js";

import {AiOutlineArrowLeft}from 'react-icons/ai';
import { BiNote, BiSolidTrash } from 'react-icons/bi';
import {FaUpload} from 'react-icons/fa';



const Archived = () => {
    const [archived, setArchived] = useState([]);


    //config ref to DB
    const notesCollection = collection(db, "Archived");

    //get notes from DB
    const getNotes = async () => {
        const data = await getDocs(notesCollection);
        setArchived(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        console.log(archived);
    }

    // delete note from archived
    const deteleNotes = async (id) => {
        const noteDoc = doc(db, "Archived", id);
        await deleteDoc(noteDoc);
        getNotes();
    }

    //move note to My Notes
    const moveNoteBack = async (id) => { 
        try {
            const noteRef = doc(db, "Archived", id);
            const noteSnapshot = await getDoc(noteRef);
            const noteData = noteSnapshot.data();
      
            const notesCollection = collection(db, "Notes");
            await addDoc(notesCollection, noteData);
      
            await deleteDoc(noteRef);
      
            setArchived(archived.filter((note) => note.id !== id));
            } catch (error) {
            console.error("Error moving note:", error);
            }
        };
    
    // config useEffect
    useEffect(() => {
        getNotes();
    },[])
  
    //config moldal of move back 
    function openMOdal (id){
        const modal = archived.find(note => note.id === id);
        if(modal){
            const modalNotes = document.getElementById(`goBack_${id}`);
            if(modalNotes){
                modalNotes.showModal();
            } 
    }}
    
    //config moldal of delete
    function openMOdal2 (id){
        const modal = archived.find(note => note.id === id);
        if(modal){
            const modalNotes = document.getElementById(`delete_${id}`);
            if(modalNotes){
                modalNotes.showModal();
            } 
    }}

    return (
        <div>
            <Link to="/">
            <AiOutlineArrowLeft className='text-4xl cursor-pointer m-5'/>
            </Link>
            <h1 className='text-center text-3xl font-bold mt-10'>Archived Notes</h1>
        <div className='flex flex-col justify-center items-center mt-10 gap-5'>
        {
                archived.map((note) =>(
                    <div className="card card-side bg-neutral shadow-xl w-[80%]" key={note.index}>
                    <div className='flex justify-center items-center p-6'>
                    <BiNote className='font-bold text-[150px]'/>   
                    </div>
                    <div className="card-body">
                    <h2 className="card-title">Title: {note.title} </h2>
                    <p>Last edited on: {note.date}</p>
                    <div className="card-actions justify-end">
                    <button className="btn btn-primary" >
                        <FaUpload className='font-bold text-2xl' onClick={()=>openMOdal(`${note.id}`)}/>
                    </button>
                    <button className="btn btn-primary">
                        <BiSolidTrash className='font-bold text-2xl' onClick={() => openMOdal2(note.id)}/>
                    </button>
                    </div>
                    </div>
                    
                    <dialog id={`goBack_${note.id}`} className="modal">
                    <form method="dialog" onSubmit={"Notes"} className="modal-box">
                        <h3 className="font-bold text-lg">Hey!</h3>
                        <p className="py-4">Are you sure to move the note to My Notes?</p>
                        <div className="modal-action">
                            <button className="btn btn-primary" onClick={()=>moveNoteBack(note.id)}>I'm Sure</button>
                            <button className="btn btn-secondary">Don't</button>
                        </div>
                    </form>
                    </dialog>

                    <dialog id={`delete_${note.id}`} className="modal">
                        <form method="dialog" className="modal-box">
                            <h3 className="font-bold text-lg">Hey!</h3>
                            <p className="py-4">Are you sure to delete the note forever?</p>
                            <div className="modal-action">
                            <button className="btn btn-primary" onClick={()=>deteleNotes(note.id)}>Yes, I'm Sure</button>
                            <button className="btn btn-secondary">Maybe later</button>
                            </div>
                        </form>
                    </dialog>

                    </div>


                )
                )
            }
        </div>

        </div>
  )
}

export default Archived