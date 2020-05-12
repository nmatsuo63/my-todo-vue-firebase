<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>ToDo一覧</h1>
      </v-flex>

      <v-flex xs12 mt-5 mr-5 text-right>
        <router-link :to="{ name: 'todo_edit' }">
          <v-btn color="info">
            ToDo追加
          </v-btn>
        </router-link>
      </v-flex>

      <v-flex xs12 mt-3 justify-center>
        <v-data-table :headers='headers' :items='todos'>
          <template v-slot:item.action="{ item }">
            <router-link :to="{ name: 'todo_edit', params: { todo_id: item.id }}">
              <v-icon small class="mr-2">mdi-pencil</v-icon>
            </router-link>
            <v-icon small class="mr-2" @click="deleteConfirm(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created () {
    this.todos = this.$store.state.todos
  },
  data () {
    return {
      headers: [
        { text: 'タスク名', value: 'name' },
        { text: '内容', value: 'todo' },
        { text: '操作', value: 'action', sortable: false }
      ],
      todos: []
    }
  },
  methods: {
    deleteConfirm (id) {
      if (confirm('削除してよろしいですか？')) {
        this.deleteTodo({ id })
      }
    },
    ...mapActions(['deleteTodo'])
  }
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>
