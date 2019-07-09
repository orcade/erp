const ProductList = {
    template: `
    <div class="post">
    <h1>Liste des produits</h1>
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <!-- on vérifie que products n'est pas vide, et puis on boucle avec v-for sur un tableau d'objet "item" -->
    <ul v-if="products" id="example-1">
        <li v-for="item in products">
            <router-link :to="{ name: 'product-detail', params: { id: item.id_product }}">{{ item.name }} </router-link>
        </li>
    </ul>
  </div>
`,


    data() {
        return {
            loading: true,
            products:[],
            error: null
        }
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        this.fetchData();
    },

    methods: {

        fetchData() {
            axios.get('http://files.sirius-school.be/products-api/?action=getProduct').then(response => {
                console.log(response.data.products);
                this.loading = false;
                this.products = response.data.products;
                console.log(this.products);
            });
        }
    }
};
