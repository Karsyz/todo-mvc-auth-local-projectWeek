const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener("mousedown", mouseDown);
    el.addEventListener("mouseup",mouseUp)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})
var mouseTimer;
function mouseDown() {
        mouseUp();
        console.log("mouse down")
        mouseTimer = setTimeout(execMouseDown,3000); //set timeout to fire in 3 seconds when the user presses mouse button down
    }
   
  
    function mouseUp() { 
        if (mouseTimer) clearTimeout(mouseTimer);  //cancel timer when mouse button is released
        console.log("mouse up")
    }  
 async function deleteTodo(){
           
            const todoId = this.parentNode.dataset.id
            try{
                const response = await fetch('todos/deleteTodo', {
                    method: 'delete',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({
                        'todoIdFromJSFile': todoId
                    })
                })
                const data = await response.json()
                console.log(data)
                location.reload()
            }catch(err){
                console.log(err)
            }
            
        }
      
  
function execMouseDown() { 
    
    Array.from(deleteBtn).forEach((el)=>{
        //el.addEventListener('click', deleteTodo)
        el.addEventListener("mouseup", deleteTodo)  
    })
       console.log("mouse held")
    };
  

    


async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}