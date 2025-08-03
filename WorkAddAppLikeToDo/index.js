
       let todos = JSON.parse(localStorage.getItem('todos')) || [];
       //console.log(todos);

        function saveTodos() {
            localStorage.setItem('todos', JSON.stringify(todos));
        }

        function renderTodos() {
            const todoList = document.getElementById('todoList');
           // console.log(todoList.innerHTML);
            todoList.innerHTML = '';
               
            todos.forEach((todo, index) => {
                const li = document.createElement('li');
                li.className = `listItem ${todo.status}`;
                //console.log(li.className);
                li.innerHTML = `
                    <div class="todo-content">
                        <div>${todo.text}</div>
                        <div class="timestamp">
                            Created: ${new Date(todo.created).toLocaleString()} | 
                            Updated: ${new Date(todo.updated).toLocaleString()}
                        </div>
                    </div>
                    <div class="todo-actions">
                        <button onclick="toggleStatus(${index})">${todo.status === 'completed' ? 'Mark Pending' : 'Mark Complete'}</button>
                        <button onclick="editTodo(${index})">Edit</button>
                        <button class="delete" onclick="deleteTodo(${index})">Delete</button>
                    </div>
                `;
                todoList.appendChild(li);
            });
        }

        function addTodo() {
            const input = document.getElementById('textEnter');
            const text = input.value.trim();
           // console.log(text);
            if (text) {
                todos.push({
                    text,
                    status: 'pending',
                    created: Date.now(),
                    updated: Date.now()
                });
                saveTodos();
                
                renderTodos();
                input.value = '';
            }
            else{
                alert("Enter Your TO Do");
                input.focus();
            }
        }

        function deleteTodo(index) {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        }

        function toggleStatus(index) {
            todos[index].status = todos[index].status === 'completed' ? 'pending' : 'completed';
            todos[index].updated = Date.now();
            saveTodos();
            renderTodos();
        }

        function editTodo(index) {
            const newText = prompt('Edit task:', todos[index].text);
            if (newText !== null && newText.trim() !== '') {
                todos[index].text = newText.trim();
                todos[index].updated = Date.now();
                saveTodos();
                renderTodos();
            }
        }

        // Initial render
        renderTodos();

        console.log(todos);

