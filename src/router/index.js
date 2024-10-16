import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import UsuarioView from '../views/UsuarioView.vue';
import CarroView from '../views/CarroView.vue';
import AluguelView from '../views/AluguelView.vue';
import PagamentoView from '../views/PagamentoView.vue';
import UsuarioList from '../components/Usuario/UsuarioList.vue';
import UsuarioDetail from '../components/Usuario/UsuarioDetail.vue';
import UsuarioForm from '../components/Usuario/UsuarioForm.vue';
import CarroForm from '../components/Carro/CarroForm.vue';
import CarroList from '../components/Carro/CarroList.vue';
import CarroDetail from '../components/Carro/CarroDetail.vue';
import AluguelForm from '../components/Aluguel/AluguelForm.vue';
import PagamentoForm from '../components/Pagamento/PagamentoForm.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },

  { path: '/usuarios', name: 'Usuarios', component: UsuarioView },
  { path: '/usuarios', name: 'UsuarioList', component: UsuarioList },
  { path: '/usuarios/novo', name: 'NovoUsuario', component: UsuarioForm },
  { path: '/usuarios/:id', name: 'UsuarioDetail', component: UsuarioDetail, props: true },
  { path: '/usuarios/:id/editar', name: 'UsuarioEdit', component: UsuarioForm, props: true },

  { path: '/carros', name: 'Carros', component: CarroView },
  { path: '/carros', name: 'CarroList', component: CarroList },
  { path: '/carros/novo', name: 'CarroForm', component: CarroForm },
  { path: '/carros/:id', name: 'CarroDetail', component: CarroDetail, props: true }, // Rota para visualizar detalhes de um carro
  { path: '/carros/:id/editar', name: 'CarroEdit', component: CarroForm, props: true },

  { path: '/carros/novo', name: 'NovoCarro', component: CarroForm },
  { path: '/alugueis', name: 'Alugueis', component: AluguelView },
  { path: '/alugueis/novo', name: 'NovoAluguel', component: AluguelForm },
  { path: '/pagamentos', name: 'Pagamentos', component: PagamentoView },
  { path: '/pagamentos/novo', name: 'NovoPagamento', component: PagamentoForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
