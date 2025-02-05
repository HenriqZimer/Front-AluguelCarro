<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title class="text-h5">{{ isEditing ? 'Editar Carro' : 'Novo Carro' }}</v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <!-- Campo Modelo -->
              <v-text-field
                v-model="carro.modelo"
                label="Modelo"
                required
                :rules="[v => !!v || 'Modelo é obrigatório']"
              ></v-text-field>

              <!-- Campo Marca -->
              <v-text-field
                v-model="carro.marca"
                label="Marca"
                required
                :rules="[v => !!v || 'Marca é obrigatória']"
              ></v-text-field>

              <!-- Campo Ano -->
              <v-text-field
                v-model="carro.ano"
                label="Ano"
                type="number"
                required
                :rules="[v => v > 0 || 'Ano é obrigatório e deve ser maior que zero']"
              ></v-text-field>

              <!-- Campo Placa -->
              <v-text-field
                v-model="carro.placa"
                label="Placa"
                required
                :rules="[v => !!v || 'Placa é obrigatória']"
              ></v-text-field>

              <!-- Campo Cor -->
              <v-text-field
                v-model="carro.cor"
                label="Cor"
                required
                :rules="[v => !!v || 'Cor é obrigatória']"
              ></v-text-field>

              <!-- Campo Preço por Dia -->
              <v-text-field
                v-model="carro.precoPorDia"
                label="Preço por Dia"
                type="number"
                required
                :rules="[v => v > 0 || 'Preço por Dia é obrigatório e deve ser maior que zero']"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" :disabled="!valid" @click="handleSubmit">{{ isEditing ? 'Atualizar' : 'Salvar' }}</v-btn>
            <v-btn color="secondary" @click="handleCancel">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'],
  data() {
    return {
      carro: {
        modelo: '',
        marca: '',
        ano: '',
        placa: '',
        cor: '',
        status: 'disponivel',
        precoPorDia: ''
      },
      valid: false, // Controla a validade do formulário
      isEditing: false // Define se estamos editando ou criando um novo carro
    };
  },
  created() {
    if (this.id) {
      this.isEditing = true;
      this.fetchCarro();
    }
  },
  methods: {
    async fetchCarro() {
      try {
        const response = await axios.get(`http://localhost:3000/carros/${this.id}`);
        this.carro = response.data;
      } catch (error) {
        console.error('Erro ao buscar carro:', error);
      }
    },
    async handleSubmit() {
      const form = this.$refs.form;
      
      if (form.validate()) {
        try {
          if (this.isEditing) {
            await axios.put(`http://localhost:3000/carros/${this.id}`, this.carro);
            console.log('Carro atualizado com sucesso!');
          } else {
            await axios.post('http://localhost:3000/carros', this.carro);
            console.log('Carro criado com sucesso!');
          }
          this.$router.push('/carros');
        } catch (error) {
          console.error('Erro ao salvar carro:', error);
        }
      } else {
        console.log('Formulário inválido');
      }
    },
    handleCancel() {
      this.$router.push('/carros'); // Redireciona para a lista de carros ao cancelar
    }
  }
};
</script>

<style scoped>
.v-card {
  margin-top: 20px;
}
.v-btn {
  margin-right: 10px;
}
</style>
