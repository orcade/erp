const ProductDetail = {
    template: `
<div>

<h1>Produit  {{$route.params.id}}</h1>



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


        <router-link :to="{ name: 'product-detail', params: { id: item.id_product }}"></router-link>

       
        <button class="edit">
        <router-link class="edit":to="{ name: 'product-edit', params: { id: item.id_product }}"> Modifier</router-link>
        </button>
      
        <button class="delete" v-on:click="deleteProduct">supprimer</button>
        
        <button class="return">
        <router-link class="return" to="/">Retour</router-link>
        </button>

        {{message}}

</div>
`,

data() {
    return {
        loading: true,
        item:{},
        error: null,
        message:''
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
    },

    deleteProduct(){
        const params = new URLSearchParams();
                params.append('id', this.$route.params.id);
                params.append('name', this.item.name);
                params.append('ref', this.item.ref);
                params.append('qty', this.item.qty);
                params.append('price', this.item.price);
    
                axios.post('http://files.sirius-school.be/products-api/?action=deleteProduct', params).then(response => {
                    console.log(response);
                    this.loading = false;
    
                    //this.item = response.data.product;
                    //console.log(response);
    
                    if(response.data.status == 'success') {
                        this.message = 'Produit supprimer';
                    }
                    else
                    {
                        this.message = 'Veuillez, Reessayez plus tard svp';
                    }
                });
    },
},
};
