const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const addbutton = document.querySelector('.plusButtonCont')
const darkMode = document.getElementById('darkMode')

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

// delete button press and hold
var mouseTimer;

function mouseDown() {
        mouseUp();
        console.log("mouse down")
        mouseTimer = setTimeout(execMouseDown,1000); //set timeout to fire in 1 seconds when the user presses mouse button down
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

//dark mode


localStorage.getItem('isDarkMode')

if(localStorage.getItem('isDarkMode') != 'false') {
        localStorage.setItem('isDarkMode', 'false')
    }

window.addEventListener('load', () => {
    if (!localStorage.isDarkMode) {
        console.log(localStorage.isDarkMode)
        enableDarkMode()
    } else {
        disableDarkMode()
    }
})

document.querySelector('#darkMode').addEventListener('click', () => {
    enableDarkMode()
})

function enableDarkMode() {
        document.querySelector('body').style.backgroundColor = '#121212'
        document.querySelector('h1').style.color = 'white'
        document.querySelector('h2').style.color = 'white'
        document.querySelector('#darkMode').value = 'Light Mode'
        localStorage.setItem('isDarkMode', "true")
        console.log(localStorage.isDarkMode)
        if (document.querySelector('#darkMode').value === 'Light Mode') {
            document.querySelector('#darkMode').addEventListener('click', () => {
                disableDarkMode()
            })
        }
}

function disableDarkMode() {
        document.querySelector('body').style.backgroundColor = 'white'
        document.querySelector('h1').style.color = 'black'
        document.querySelector('h2').style.color = 'black'
        document.querySelector('#darkMode').value = 'Dark Mode'
        localStorage.setItem('isDarkMode', "false")
        if (document.querySelector('#darkMode').value === 'Dark Mode') {
            document.querySelector('#darkMode').addEventListener('click', () => {
                enableDarkMode()
            })
        }
}

// add button form text box animation
addbutton.addEventListener('click', () => {
    document.querySelector('#addTextBox').classList.toggle('textBoxGrow')
    console.log('clicked')
}) 



