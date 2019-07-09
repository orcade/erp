const ProductDetail = {
    template: `
<div>

<h1>Produit  {{$route.params.products}}</h1>



<div v-if="loading" class="loading">
  Loading...
</div>

<div v-if="error" class="error">
  {{ error }}
</div>

<p v-if="item">
    Id Produit: {{ item.id_product }} <br />
    Nom: {{ item.name}} <br />
    Référence: {{ item.ref}} <br />
    Quantity: {{ item.qty}} <br />
    Prix: {{ item.price}} <br />
</p>


        <router-link :to="{ name: 'product-detail', params: { id: item.id_product }}">{{ item.name }} : {{ item.id_product }}</router-link>

        <router-link class="edit" to=/product/product-edit/:id>Mettre à jour</router-link>
        <router-link class="add" to=/product/product-add/:id>Ajouter</router-link>
        <router-link class="delete" to=/product/product-delete/:id>Supprimer</router-link>

        <router-link class="retour" to="/">Retour</router-link>


</div>
`,

data() {
    return {
        loading: true,
        item:{},
        error: null
    }
},
created() {
    this.fetchData();
},

methods: {

    fetchData() {
        this.loading = false;
        const params = new URLSearchParams();
        params.append('id', this.$route.params.id);
        //this.$route.params.id
        axios.post('http://files.sirius-school.be/products-api/?action=getDetail',params).then(response => {
            console.log('test');
            this.item = response.data.product;
        });
    }
}
}
