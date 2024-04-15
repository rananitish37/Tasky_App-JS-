const state = { 
    taskList: [],
};

const taskContent = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");
console.log(taskContent);
console.log(taskModal);



            // since we don't have url field as required so we will do like that to first check if exist then display

const htmlTaskContent = ({url, title, type, description, id}) => `
    <div class="col-md-6 col-lg-4 mt-3" id=${id}>
        <div class='card shadow-sm task__card'>
            <div class='card-header d-flex justify-content-end task__card__header'>
                <button type='button' class='btn btn-outline-info mr-1.5' name=${id}>
                    <i class='fas fa-pencil-alt' name=${id}> </i>
                </button>
                <button type='button' class='btn btn-outline-danger mr-1.5' name=${id} onclick="deleteTask.apply(this, arguments)">
                    <i class='fas fa-trash-alt' name=${id} onclick="deleteTask.apply(this, arguments)"> </i>
                </button>
            </div>
            
            <div class='card-body'>
                ${
                    url ?
                    `<img width='100%' src=${url} alt='Card image' class='card-img-top md-3 rounded-lg' />`
                    :`<img width='100%' src="https://tse1.mm.bing.net/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&pid=Api&rs=1&c=1&qlt=95&w=223&h=117" alt='Card image' class='card-img-top md-3 rounded-lg' />`
                }
                <h4 class='card-title task__card__title'>${title}</h4>
                <p class='description trim-3-lines text-muted'>${description}</p>
                <div class='tags text-white d-flex flex-wrap'>
                    <span class='badge bg-primary m-1'>${type}</span>
                </div>
            </div>
            <div class='card-footer'>
                <button type='button' class='btn btn-outline-primary float-right' data-bs-toggle="modal" data-bs-target="#showTask" onclick='openTask.apply(this, arguments)' id=${id}>Open Task</button>
            </div>

    </div>
`;

// modal body on >> click of open task
const htmlModalContent = ({id, title, description, url}) => {
    const date = new Date(parseInt(id));
    return `
    <div id=${id}>
        ${
            // url &&
            // `<img width='100%' src=${url} alt='Card image' class='img-fluid place__holder__image mb-3' />`

            url
                ? `<img width='100%' src=${url} alt='Card image' class='card-img-top md-3 rounded-lg' />`
                :`<img width='100%' src="https://tse1.mm.bing.net/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&pid=Api&rs=1&c=1&qlt=95&w=223&h=117" alt='Card image' class='card-img-top md-3 rounded-lg' />`
        }
        <strong class='test-muted text-sm'>Created on: ${date.toDateString()}</strong>
        <h2 class='my-3'>${title}</h2>
        <p class='text-muted'>${description}</p>
    </div>
    `;
};


// local storage
// convert JSON data to string
const updateLocalStorage = () => {
    localStorage.setItem(
        "task",
        JSON.stringify({
        tasks: state.taskList,
    })
    )
}

// load initial data
// convert string data back to JSON
const loadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.task);

    // if there is somethng in local storage then asign it to array 

    if(localStorageCopy) state.taskList = localStorageCopy.tasks;

    state.taskList.map((cardDate) => {
        taskContent.insertAdjacentHTML("beforeend",htmlTaskContent(cardDate));
    });
};


/**
    Spread operator

    const obj = {name: "Nitish",age:22}

    console.log(obj)
    {name: 'Nitish', age: 22}

    console.log({obj})
    {obj: {…}}obj: {name: 'Nitish', age: 22}


    console.log({...obj})
    {name: 'Nitish', age: 22}

    We can add new field in the object directly when we use spread operator
    console.log({...obj, designation:"Student"})
    {name: 'Nitish', age: 22, designation: 'Student'}
    age:22
    designation:"Student"
    name:"Nitish"
    [[Prototype]]:Object

 */

// when we want to upadate or edit we need to save it
/**
 
    why we using date as id

    Date()
    'Wed Apr 10 2024 13:06:39 GMT+0530 (India Standard Time)'

    Date.now()
    1712734614308

    Date.now()
    1712734699521
 */
const handleSubmit = (event) => {

    const id = `${Date.now}`;
    const input = {
        url : document.getElementById("imageUrl").value,
        title : document.getElementById("taskTitle").value,
        tags : document.getElementById("taskTags").value,
        taskDescription : document.getElementById("taskDescription").value,
    };
    // if(input.title === "" || input.tags === "" || input.taskDescription === ""){
    //     return alert("Please fill all the neccessary details....")
    // }

    taskContent.insertAdjacentHTML("beforeend",htmlTaskContent({ ...input, id }));
    state.taskList.push({ ...input, id });
    updateLocalStorage();
};

// Open task
const openTask = (e) => {
    if (!e) e = window.event;
    const getTask = state.taskList.find(({ id }) => id === e.target.id);
    taskModal.innerHTML = htmlModalContent(getTask);
};


// delete task
const deleteTask = (e) => {
    if (!e) e = window.event;
    
    const targetId = e.target.getAttribute("name");
    console.log(targetId);

    const type = e.target.tagName;

    const removeTask = state.taskList.filter(({id}) => id !== targetId);

    updateLocalStorage();

    if(type === "BUTTON"){
        // console.log(e.target.parentNode.parentNode.parentNode.parentNode);
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode
        );
    }
    // if we click on icon then have to 5 parent back
    else if(type === "I"){
        return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode.parentNode
        );
    }
};

