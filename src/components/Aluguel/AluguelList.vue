<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <!-- Verifica se há aluguéis na lista -->
        <v-card v-if="alugueis.length > 0" outlined>
          <v-card-title class="text-h5"> Lista de Aluguéis </v-card-title>

          <v-card-text>
            <v-list>
              <v-list-item
                v-for="aluguel in alugueis"
                :key="aluguel._id"
                class="aluguel-list-item"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    <router-link
                      :to="`/alugueis/${aluguel._id}`"
                      class="aluguel-link"
                    >
                      Data: {{ aluguel.dataInicio }} até {{ aluguel.dataFim }} | Valor: R$ {{ aluguel.valorTotal }} | Status: {{ aluguel.status }}
                    </router-link>
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn
                    icon
                    @click="$router.push(`/alugueis/${aluguel._id}/editar`)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon color="red" @click="deleteAluguel(aluguel._id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <!-- Mensagem de "nenhum aluguel encontrado" caso a lista esteja vazia -->
        <v-card v-else outlined>
          <v-card-title class="text-h5"> Nenhum Aluguel Encontrado </v-card-title>
          <v-card-text>
            Não há aluguéis cadastrados no momento.
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
      alugueis: [],
    };
  },
  created() {
    this.fetchAlugueis();
  },
  methods: {
    async fetchAlugueis() {
      try {
        const response = await axios.get("http://localhost:3000/alugueis");
        this.alugueis = response.data;
      } catch (error) {
        console.error("Erro ao buscar aluguéis:", error);
      }
    },
    async deleteAluguel(id) {
      try {
        await axios.delete(`http://localhost:3000/alugueis/${id}`);
        this.fetchAlugueis(); // Atualiza a lista após exclusão
      } catch (error) {
        console.error("Erro ao excluir aluguel:", error);
      }
    },
  },
};
</script>

<style scoped>
.aluguel-link {
  text-decoration: none;
  color: #1976d2;
}

.aluguel-link:hover {
  text-decoration: underline;
}

.aluguel-list-item {
  transition: background-color 0.3s;
}

.aluguel-list-item:hover {
  background-color: #f0f0f0;
}
</style>
