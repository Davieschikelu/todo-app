//Login
function handleSubmit(event){
    event.preventDefault();
    let username = document.getElementById('username').value
    let userErr = document.getElementById('userErr')
    let passW = document.getElementById('passW').value
    let password_error = document.getElementById('password_error')

    let storedData = JSON.parse(localStorage.getItem('userData'))
if(storedData){
    let storedUser = storedData.username
    let storedPass = storedData.password

    if(username === ''){
        userErr.innerHTML = '**please enter username**'
    }else if(username !== storedUser){
        userErr.innerHTML = '**user not found**'
    }else{
        userErr.innerHTML = '';
    }


    if(passW === ''){
        password_error.innerHTML = '**please enter a password**'
    }else if(passW < 8){
        password_error.innerHTML = '**password must be atleast 8 characters**'
    }else if(passW !== storedPass){
       password_error.innerHTML = '**wrong password please try again**'
    }else{
        password_error.innerHTML = ''
    }

    if(
        username === storedUser&&
        passW === storedPass){

            alert('LogIn Successful')
            window.location.href = "TODO.html"
    }
}
}

//Register
// let Data = JSON.parse(localStorage.getItem('userData')) || []
function handle2Submit(event){
    event.preventDefault();
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let user = document.getElementById('username').value
    let userErr = document.getElementById('userErr')
    let email2 = document.getElementById('email2').value
    let emailErr2 = document.getElementById('emailErr2')
    let passW2 = document.getElementById('passW2').value
    let password_error2 = document.getElementById('password_error2')
    let passCon = document.getElementById('passWd').value
    let password_error3 = document.getElementById('password_error3')
    //username
    if(user === ''){
        userErr.innerHTML = '**enter user name**'
    }else{
        userErr.innerHTML = ''
        
    }
    //emailaddress for admin
    if(email2 === ''){
        emailErr2.innerHTML = '**please enter an email address**'
    }else if(!regex.test(email2)){
     emailErr2.innerHTML = '**please enter a valid email address**'
    }else{
        emailErr2.innerHTML = '';
        
    }
     //password for admin
    if(passW2 === ''){
        password_error2.innerHTML = '**please enter a password**'
    }else if(passW2 < 8){
        password_error2.innerHTML = '**password must be atleast 8 characters**'
    }else{
        password_error2.innerHTML = ''
        
    }
    //confirm password
    if( passCon === ''){
         password_error3.innerHTML = '**please enter a password**'
    }else if(passCon!==passW2){
         password_error3.innerHTML = "**password doesn't match**"
    }else{
         password_error3.innerHTML = ''
         
    }
    if(
        user !== ''&&
        regex.test(email2)&&
        passW2.length >= 8 &&
        passCon == passW2){
           let userData = {
            username : user,
            email : email2,
            password : passW2
           }

           localStorage.setItem('userData', JSON.stringify(userData))
           alert('SignUp Successful!')
            window.location.href = "index.html"
    }
}



// todo
let todos = JSON.parse(localStorage.getItem("todos")) || [];
function addTodo(event) {
    event.preventDefault();

    let todoInput = document.getElementById('todoInput').value;
    let todoErr = document.getElementById('todoErr');
    if(todoInput === ''){
        todoErr.innerHTML = "**please enter an item**"
     }else {
        let newTodo = {
        id: Date.now(),
        text : todoInput,
        completed: false,
    };
     todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos))
    // toDOIn.value = ''
    window.location.reload();
     }
}

function showTodo(){
    let todolist = document.getElementById("todolist");
    todolist.innerHTML = "";
    
    todos.forEach((todo) => {
        // console.log('here')
        let todoItem = document.createElement("div");
        todoItem.classList.add("item");
        todoItem.innerHTML = `
        <h3 class="${todo.completed ? 'completed' : ''}">${todo.text}</h3>
        <div class="flex d">
        <div>
        <button onclick="deleteTodo(${todo.id})" class="fein">delete</button>
        <button onclick="editTodo(${todo.id})" class="fein">edit</button>
        </div>
        <input type="checkbox" ${todo.completed ? 'checked' : ''} onclick= "toggleComplete(${todo.id})"/>
        </div>
        `

        todolist.appendChild(todoItem);
    })

    // console.log('after')
}
showTodo()

function toggleComplete(id){
    todos = todos.map((todo) =>{
        if(todo.id === id){
            return{
                ...todo,
                completed: !todo.completed
            }
        }
        return todo;
    })
    localStorage.setItem("todos", JSON.stringify(todos))
    showTodo();
}

function deleteTodo(todoId){
    todos = todos.filter((todo) => todo.id !== todoId);
    localStorage.setItem("todos", JSON.stringify(todos))
    showTodo();
}

function editTodo(todoId){
    let todo  = todos.find((todo) => todo.id === todoId);
    let todoInput = document.getElementById('todoInput')
todoInput.value = todo.text;
todos = todos.filter((todo) => todo.id !== todoId); 
localStorage.setItem("todos", JSON.stringify(todos));
    showTodo();
}