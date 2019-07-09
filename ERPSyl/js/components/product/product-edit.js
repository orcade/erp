const ProductEdit = {
        template: `
    <div>

    <h1>Mettre à jour les produits </h1>

        <div v-if="loading" class="loading">
          Loading...
        </div>

        <div v-if="error" class="error">
          {{ error }}
        </div>



    <form>

        <div>
            
            <label for="productName">Nom</label>
            <input v-model="item.name" v-on:keyup.enter="sendModif">
        </div>
    
        <div>
            
            <label for="productRef">Référence</label>
            <input v-model="item.ref" v-on:keyup.enter="sendModif">
        </div>

        <div>
            <label for="productqty">Quantité</label>
            <input v-model=" item.qty" v-on:keyup.enter="sendModif">
        </div>

        <div>
            <label for="productPrice">Prix</label>
            <input v-model="item.price" v-on:keyup.enter="sendModif">

    </form>

        <div>
            <button @click.prevent='sendModif'>Modifier le produit</button>
            
        </div>

        <router-link class="retour" to="/">Retour</router-link>

    </div>
        `,

      data() {
    return {
        loading: true,
        item:{},
        error: null,
      
    }
},
created() {
    this.fetchData();
},

methods: {

    fetchData() {
        this.loading = false;
        const params = new URLSearchParams();
        params.append('id', this.$route.params.id_product);
        console.log(this.$route.params.id_product);
        //this.$route.params.id
        axios.post('http://files.sirius-school.be/products-api/?action=getDetail',params).then(response => {
            console.log('test');
            //this.item = response.data.product;
        });
    },



sendModif() {

   this.loading = false;
   const params = new URLSearchParams();
       params.append('id', this.$route.params.id);
       params.append('name',this.item.name);
       params.append('ref',this.item.ref);
       params.append('price',this.item.price);
       params.append('qty',this.item.qty);
       //this.$route.params.id
       axios.post('http://files.sirius-school.be/products-api/?action=updateProduct',params).then(response => {
           console.log(response.data);
           this.item = response.data.product;
       })
   },
},
};


