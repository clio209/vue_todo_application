 const app = Vue.createApp({
    data()  {
      return {
      newItem: '',
      editedTodo: null,
      beforeEditCache: '',
      todos: []
      }
    },
    watch: {
      todos: {
        handler: function () {
          localStorage.setItem('todos', JSON.stringify(this.todos))
        },
        deep: true
      }
    },
    mounted: function () {
      this.todos = JSON.parse(localStorage.getItem('todos')) || []
    },
    methods: {
      addItem: function () {
        const item = {
          title: this.newItem,
          isDone: false
        }
        this.todos.push(item)
        this.newItem = ''
      },
      deleteItem: function (index) {
        if (confirm('削除していいですか?')) {
          this.todos.splice(index, 1)
        }
      },
      editTodo: function (todo) {
        this.beforeEditCache = todo.title
        this.editedTodo = todo
      },
      doneEdit: function (todo) {
        if (!this.editedTodo) {
          return
        }
        this.editedTodo = null
        const title = todo.title.trim()
        if (title) {
          todo.title = title
        }
      },
      cancelEdit: function (todo) {
        this.editedTodo = null
        todo.title = this.beforeEditCache
      }
    },
    computed: {
      remaining: function () {
        return this.todos.filter(function (todo) {
          return !todo.isDone
        })
      }
    },
    directives: {
      'todo-focus' (element, binding) {
        if (binding.value) {
          element.focus()
        }
      }
    }
  })

  const vm = app.mount('#app')
