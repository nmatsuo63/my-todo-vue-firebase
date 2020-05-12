<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-center">
        <h1>ToDo編集</h1>
      </v-flex>

      <v-flex xs5 mt-5>
        <v-card>
          <v-card-text>
            <v-form>
               <v-text-field v-model="todo.name" label="タスク名"></v-text-field>
               <v-text-field v-model="todo.todo" label="内容"></v-text-field>
               <div class="text-center">
                 <v-btn @click="$router.push({ name: 'todos' })">キャンセル</v-btn>
                 <v-btn color="info" class="ml-2" @click="submit">保存</v-btn>
               </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created () {
    if (!this.$route.params.todo_id) return

    const todo = this.$store.getters.getTodoById(this.$route.params.todo_id)
    if (todo) {
      this.todo = todo
    } else {
      this.$router.push({ name: 'todos' })
    }
  },
  data () {
    return {
      todo: {}
    }
  },
  methods: {
    submit () {
      if (this.$route.params.todo_id) {
        this.updateTodo({ id: this.$route.params.todo_id, todo: this.todo })
      } else {
        this.addTodo(this.todo)
      }
      this.$router.push({ name: 'todos' })
      this.todo = {}
    },
    ...mapActions(['addTodo', 'updateTodo'])
  }
}
</script>
