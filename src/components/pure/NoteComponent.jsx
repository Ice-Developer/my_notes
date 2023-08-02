/* eslint-disable react/no-unescaped-entities */
import{BiArchive, BiEditAlt, BiNote, BiSolidTrash} from 'react-icons/bi'
import { useState } from 'react';
import { CATEGORIES } from '../models/categories.enum';
import { useRef } from 'react';
import { useEffect } from 'react';

const NoteComponent = ({title, categories, content, date, id, func1, func2, func3, func4, func5, func6})=> {
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedCategories, setEditedCategories] = useState(categories);
    const [editedContent, setEditedContent] = useState(content);

    

    const categoriesRef = useRef(CATEGORIES.NORMAL)

    const handleSaveChanges = async () => {
        await func5(id, editedTitle, editedCategories, editedContent);
    };

    useEffect(() => {
        setEditedTitle(title);
        setEditedCategories(categories);
        setEditedContent(content);
    }, [title, categories, content]);

    return (
        <div className="card card-side bg-neutral shadow-xl w-[80%]">
            <div className='flex justify-center items-center p-6'>
                <BiNote className='font-bold text-[150px]'/>   
            </div>
            <div className="card-body">
                <h2 className="card-title">Title: {title} </h2>
                <p>Last edited on: {date}</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary" >
                    <BiArchive className='font-bold text-2xl' onClick={()=>{func1(id)}}/>
                </button>
                <button className="btn btn-primary" >
                    <BiEditAlt className='font-bold text-2xl'onClick={()=>{func2(id)}}/>
                </button>
                <button className="btn btn-primary">
                    <BiSolidTrash className='font-bold text-2xl' onClick={()=>{func3(id)}}/>
                </button>
                </div>
            </div>

            <dialog id={`archived_${id}`} className="modal">
                <form method="dialog" onSubmit={"Notes"} className="modal-box">
                    <h3 className="font-bold text-lg">Hey!</h3>
                    <p className="py-4">Are you sure to move the note to Archived?</p>
                    <div className="modal-action">
                        <button className="btn btn-primary" onClick={()=>{func6(id)}} >I'm Sure</button>
                        <button className="btn btn-secondary">Don't</button>
                    </div>
                </form>
            </dialog>

            <dialog id={`edit_${id}`} className="modal">
            <form  method="dialog" onSubmit={"Notes"} className="modal-box">
                    <h3 className="font-bold text-3xl">Reed o Edit note</h3>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-bold text-xl">Title</span>
                        </label>
                        <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className="input input-bordered w-full  bg-white  text-black" />
                    </div>

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-bold text-xl">Content</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-48 text-xl  bg-white  text-black" value={editedContent} onChange={(e) => setEditedContent(e.target.value)}></textarea>
                    </div>


                    <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-bold text-xl">Categories</span>
                            </label>
                            <select ref={categoriesRef} defaultValue={CATEGORIES.NORMAL} onChange={(e) => setEditedCategories(e.target.value)} value={editedCategories} className="select select-bordered  bg-white  text-black text-lg">
                                <option value={CATEGORIES.NORMAL}>Normal</option>
                                <option value={CATEGORIES.DAILY}>Daily</option>
                                <option value={CATEGORIES.HOME}>Home Work</option>
                                <option value={CATEGORIES.IMPORTANT}>Important</option>
                                <option value={CATEGORIES.PERSONAL}>Personal Data</option>
                                <option value={CATEGORIES.URGENT}>Urgent</option>
                            </select>
                    </div> 
                    <div className="modal-action">
                    <button className="btn btn-primary" onClick={handleSaveChanges}>Save Changes</button>
                    <button className="btn btn-secondary">Close</button>
                    </div>
                </form>

            </dialog>

            <dialog id={`delete_${id}`} className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Hey!</h3>
                    <p className="py-4">Are you sure to delete the note forever?</p>
                    <div className="modal-action">
                    <button className="btn btn-primary" onClick={()=>func4(id)}>Yes, I'm Sure</button>
                    <button className="btn btn-secondary">Maybe later</button>
                    </div>
                </form>
            </dialog>

            
            
            
        </div>
    )
}

export default NoteComponent;