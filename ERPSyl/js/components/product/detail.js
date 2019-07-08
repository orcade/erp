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
</div>
`,

data() {
    return {
        loading: true,
        item: null,
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
            console.log(response.data);
            this.item = response.data.product;
        });
    }
}
}