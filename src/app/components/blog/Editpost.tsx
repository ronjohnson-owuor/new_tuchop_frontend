import React from 'react'

interface prop {
    close:Function
}
function Editpost({close}:prop) {
  return (
    <div className=' w-full h-screen'>
        <div>
            <h3>Edit post</h3>
            <div>
                <button>save</button>
                <button onClick={()=>close(false)}>close</button>
            </div>
        </div>

    </div>
  )
}

export default Editpost