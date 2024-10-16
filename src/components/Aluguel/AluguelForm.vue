<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title class="text-h5">{{
            isEditing ? "Editar Aluguel" : "Novo Aluguel"
          }}</v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <!-- Data de Início -->
              <v-text-field
                v-model="aluguel.dataInicio"
                label="Data de Início"
                type="date"
                required
                :rules="[(v) => !!v || 'Data de Início é obrigatória']"
              ></v-text-field>

              <!-- Data de Fim -->
              <v-text-field
                v-model="aluguel.dataFim"
                label="Data de Fim"
                type="date"
                required
                :rules="[(v) => !!v || 'Data de Fim é obrigatória']"
              ></v-text-field>

              <!-- Valor Total -->
              <v-text-field
                v-model="aluguel.valorTotal"
                label="Valor Total"
                type="number"
                required
                :rules="[
                  (v) =>
                    v > 0 ||
                    'Valor Total é obrigatório e deve ser maior que zero',
                ]"
              ></v-text-field>

              <!-- Status -->
              <v-select
                v-model="aluguel.status"
                :items="['em andamento', 'finalizado']"
                label="Status"
                required
                :rules="[(v) => !!v || 'Status é obrigatório']"
              ></v-select>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" :disabled="!valid" @click="handleSubmit">{{
              isEditing ? "Atualizar" : "Salvar"
            }}</v-btn>
            <v-btn color="secondary" @click="handleCancel">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"],
  data() {
    return {
      aluguel: {
        dataInicio: "",
        dataFim: "",
        valorTotal: 0,
        status: "em andamento",
        idUsuario: "id_do_usuario_aqui", // Adicione o ID do usuário
      },
      valid: false,
      isEditing: false,
    };
  },
  created() {
    if (this.id) {
      this.isEditing = true;
      this.fetchAluguel();
    }
  },
  methods: {
    async fetchAluguel() {
      try {
        const response = await axios.get(
          `http://localhost:3000/alugueis/${this.id}`
        );
        this.aluguel = response.data;
      } catch (error) {
        console.error("Erro ao buscar aluguel:", error);
      }
    },
    async handleSubmit() {
      const form = this.$refs.form;
      if (form.validate()) {
        try {
          // Adicione o ID do usuário ao objeto aluguel antes de enviar
          this.aluguel.idUsuario = "id_do_usuario_aqui"; // Atualize com o ID real

          if (this.isEditing) {
            await axios.put(
              `http://localhost:3000/alugueis/${this.id}`,
              this.aluguel
            );
            console.log("Aluguel atualizado com sucesso!");
          } else {
            await axios.post("http://localhost:3000/alugueis", this.aluguel);
            console.log("Aluguel criado com sucesso!");
          }
          this.$router.push("/alugueis");
        } catch (error) {
          console.error("Erro ao salvar aluguel:", error);
        }
      } else {
        console.log("Formulário inválido");
      }
    },
    handleCancel() {
      this.$router.push("/alugueis");
    },
  },
};
</script>
