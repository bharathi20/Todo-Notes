import React ,{useEffect,useState} from 'react';
import './App.css';

function App() {
  const id=new Date().getTime().toString()

    const [title , setTitle] = useState('')
    const [myArr ,setMyArr] = useState(()=>{
        const localArr=localStorage.getItem("myArr")
        if (localArr){
        return JSON.parse(localArr)
     
        }
        else{
            return [];
        }
    })
    const [Editing,setEditing]=useState(false)
    const [currentNote,setcurrentNote]=useState({})


    useEffect(()=>{
        localStorage.setItem("myArr",JSON.stringify(myArr))
    
    },[myArr])

    const handleInputChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //adding notes here
        setMyArr([...myArr,{
            id:id,
            title:title}])
        //clear data in input after submit
        setTitle('')
        
    }


    const handleEditForm=(e)=>{
        e.preventDefault()
        handleUpdate(currentNote.id,currentNote)
      
        console.log(currentNote)
        

        
    }

    const handleEditInputChange=(e)=>{
        setcurrentNote({...currentNote, title:e.target.value})
        console.log(currentNote)

    }

    const EditNote1=(data)=>{
        setEditing(true)
        setcurrentNote({...data})
    }

    const handleUpdate=(id,updated)=>{
        const updatedArr=myArr.map((x)=>{
            <li key={x.toString()}>/</li>
            return x.id===id?updated:x
        })
        setEditing(false)
        setMyArr(updatedArr)
    }
  
    const deleteNote1 = (id) =>{
      
        //const tmp = myArr.findIndex(d => d===data)
        //myArr.splice(tmp-1,1)
       //setMyArr((myArr) => myArr.filter((_, i) => i !== data))
       const removeItem=myArr.filter((myArr)=>{
           return myArr.id !==id;
       })

       setMyArr(removeItem)

       
    }
  return (
    <div className='todoApp'>
        {/* Form */}
        <div className="formDiv" id='formDiv' >
        {Editing ? (
            <form onSubmit={handleEditForm}>
                <input 
                name="editData"
                type="text"
                value={currentNote.title} 
                onChange={handleEditInputChange}/>
                <button type="submit">Replace</button>
                <button onClick={() => setEditing(false)}>Cancel</button>
            </form>
        ):(
            <form action="" id="formId" onSubmit= {handleSubmit}>
                <div 
                    className='title '>
                    Title
                </div>
                <input 
                    className='  ' 
                    value={title}
                    onChange={handleInputChange}
                    type="text" 
                    id="titleValue" 
                    required />
                <button
                    className='submitButton' 
                    type="submit">
                        Submit
                </button>
        
            </form>
            
        )}
        </div>

        <div className='dataList' id="dataList" >
            {myArr.map((data)=>(
            
                <div className='main'key={data.id}>
                <div id='display'>{data.title}</div>
                <button className='edit button' onClick={()=>EditNote1(data)}>edit</button>
                <button className='button' onClick={()=>deleteNote1(data.id)}>delete</button>
                </div>
            ))}
        

        </div>
    </div>
  );
}

export default App;
