import inquirer from "inquirer";
//array
let todolist = [];
//function
let mainMenu = async () => {
    const { action } = await inquirer.prompt({
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["Add Task", "View List", "Mark as complete", "Delete Task", "Exit"]
    });
    switch (action) {
        case "Add Task":
            await addTask();
            break;
        case "View List":
            viewList();
            break;
        case "Mark as complete":
            await markCompleted();
            break;
        case "Delete Task":
            await deleteTask();
            break;
        case "Exit":
        case 'Exit':
            console.log("good bye");
            return;
    }
    mainMenu();
};
let addTask = async () => {
    let { task } = await inquirer.prompt({
        type: "input",
        name: "task",
        message: "enter the task",
    });
    todolist.push({
        task: task,
        completed: false
    });
    console.log("task added successfully");
};
let viewList = () => {
    console.log("*********To Do List**********");
    todolist.forEach((item, index) => {
        console.log(`${index + 1}.[${item.completed ? `x` : ``}]${item.task}`);
    });
    console.log("*************");
};
let markCompleted = async () => {
    let { index } = await inquirer.prompt({
        type: 'number',
        name: 'index',
        message: 'what task did you want to mark as completed?',
    });
    if (index < 1 || index > todolist.length) {
        console.log('invalid task number');
        return;
    }
    todolist[index - 1].completed = true;
    console.log('task marked completed');
};
let deleteTask = async () => {
    let { index } = await inquirer.prompt({
        type: "number",
        name: "index",
        message: "Select task to delete",
    });
    if (index <= 0) {
        console.log("Please Fist Add any task");
        return;
    }
    else if (index < 1 || index > todolist.length) {
        console.log('invalid task number please try again');
        return;
    }
    ;
    todolist.splice(index - 1, 1);
    console.log("Task Deleted successfully");
};
mainMenu();
