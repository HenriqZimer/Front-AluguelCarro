<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Sistema de Aluguel de Carros</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/usuarios">Gerenciar Usuários</v-btn>
      <v-btn text to="/carros">Gerenciar Carros</v-btn>
      <v-btn text to="/alugueis">Gerenciar Aluguéis</v-btn>
      <v-btn text to="/pagamentos">Gerenciar Pagamentos</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
}
</style>
