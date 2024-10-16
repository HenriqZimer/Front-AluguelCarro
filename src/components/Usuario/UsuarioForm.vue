<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title class="text-h5">{{ isEditing ? 'Editar Usuário' : 'Novo Usuário' }}</v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="usuario.nome" label="Nome" required></v-text-field>
              <v-text-field v-model="usuario.cpf" label="CPF" required></v-text-field>
              <v-text-field v-model="usuario.cnh" label="CNH" required></v-text-field>
              <v-text-field v-model="usuario.endereco" label="Endereço" required></v-text-field>
              <v-text-field v-model="usuario.telefone" label="Telefone" required></v-text-field>
              <v-text-field v-model="usuario.email" label="Email" required></v-text-field>
              <v-text-field v-model="usuario.senha" label="Senha" type="password" required></v-text-field>
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
      usuario: {},
      valid: false,
      isEditing: false
    };
  },
  created() {
    if (this.id) {
      this.isEditing = true;
      this.fetchUsuario();
    }
  },
  methods: {
    async fetchUsuario() {
      try {
        const response = await axios.get(`http://localhost:3000/usuarios/${this.id}`);
        this.usuario = response.data;
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    },
    async handleSubmit() {
      try {
        if (this.isEditing) {
          await axios.put(`http://localhost:3000/usuarios/${this.id}`, this.usuario);
          console.log('Usuário atualizado com sucesso!');
        } else {
          await axios.post('http://localhost:3000/usuarios', this.usuario);
          console.log('Usuário criado com sucesso!');
        }
        this.$router.push('/usuarios');
      } catch (error) {
        console.error('Erro ao cadastrar o usuário:', error);
      }
    },
    handleCancel() {
      this.$router.push('/usuarios');
    }
  }
};
</script>
