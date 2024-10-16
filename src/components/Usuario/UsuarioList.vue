<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <!-- Verifica se há usuários na lista -->
        <v-card v-if="usuarios.length > 0" outlined>
          <v-card-title class="text-h5"> Lista de Usuários </v-card-title>

          <v-card-text>
            <v-list>
              <v-list-item
                v-for="usuario in usuarios"
                :key="usuario._id"
                class="user-list-item"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    <router-link
                      :to="`/usuarios/${usuario._id}`"
                      class="user-link"
                    >
                      {{ usuario.nome }}
                    </router-link>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ usuario.email }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn
                    icon
                    @click="$router.push(`/usuarios/${usuario._id}/editar`)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon color="red" @click="deleteUsuario(usuario._id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <!-- Mensagem de "nenhum usuário encontrado" caso a lista esteja vazia -->
        <v-card v-else outlined>
          <v-card-title class="text-h5"> Nenhum Usuário Encontrado </v-card-title>
          <v-card-text>
            Não há usuários cadastrados no momento.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      usuarios: [],
    };
  },
  created() {
    this.fetchUsuarios();
  },
  methods: {
    async fetchUsuarios() {
      try {
        const response = await axios.get("http://localhost:3000/usuarios");
        this.usuarios = response.data;
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    },
    async deleteUsuario(id) {
      try {
        await axios.delete(`http://localhost:3000/usuarios/${id}`);
        this.fetchUsuarios(); // Atualiza a lista após exclusão
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
      }
    },
  },
};
</script>

<style scoped>
.user-link {
  text-decoration: none;
  color: #1976d2;
}

.user-link:hover {
  text-decoration: underline;
}

.user-list-item {
  transition: background-color 0.3s;
}

.user-list-item:hover {
  background-color: #f0f0f0;
}
</style>
