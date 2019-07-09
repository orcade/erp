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

        <div v-if="item">

            <label>Nom</label>
            <input type="text"  v-model="item.name" v-on:keyup.enter="sendModif">
        </div>

        <div>

            <label>Référence</label>
            <input type="text"  v-model="item.ref" v-on:keyup.enter="sendModif">
        </div>

        <div>
            <label>Quantité</label>
            <input type="text"  v-model=" item.qty" v-on:keyup.enter="sendModif">
        </div>

        <div>
            <label>Prix</label>
            <input type="text"  v-model="item.price" v-on:keyup.enter="sendModif">

    </form>

        <div>
            <button @click.prevent='sendModif' v-on:keyup.enter="sendModif" >Modifier le produit</button>

        </div>

        <router-link class="retour" to="/">Retour</router-link>

    </div>
        `,

      data() {
    return {
        loading: true,
        item:{},
        error: null,
        message: ''

    }
},
created() {
    this.fetchData();
},

methods: {

    fetchData() {

        const params = new URLSearchParams();
        params.append('id', this.$route.params.id);
        //console.log(this.$route.params.id);
        //this.$route.params.id
        axios.post('http://files.sirius-school.be/products-api/?action=getDetail',params).then(response => {
            this.loading = false;
            //this.item = response.data.product;
            console.log(this.item);

        });
    },



sendModif() {


   const params = new URLSearchParams();
       params.append('id', this.$route.params.id);
       params.append('name',this.product.name);
       params.append('ref',this.product.ref);
       params.append('price',this.product.price);
       params.append('qty',this.product.qty);
       //this.$route.params.id
       axios.post('http://files.sirius-school.be/products-api/?action=updateProduct',params).then(response => {
           this.loading = false;
           console.log(response.data);
           this.item = response.data.product;

           if(response.data.status == 'success') {
                  this.message = 'Le produit a bien été mis à jour';
              }
          else{
                  this.message = 'Erreur, Réessayez plus tard';
              }
       });
   }
}
}
