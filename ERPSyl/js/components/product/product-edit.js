const ProductEdit = {
        template: `
    <div>

    <h1>Mettre à jour le produit n°{{ $route.params.id }} </h1>

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
            <input type="text"  v-model="item.ref" >
        </div>

        <div>
            <label>Quantité</label>
            <input type="text"  v-model=" item.qty" >
        </div>

        <div>
            <label>Prix</label>
            <input type="text"  v-model="item.price" >

    </form>

        <div>
            <button @click.prevent='sendModif' v-on:keyup.enter="sendModif" >Modifier le produit
            </button>

        <button class="return">
        <router-link  to="/">Retour</router-link>
        </button>

        </div>

        {{message}}

    </div>

        `,

        data() {
            return {
                loading: true,
                item: {},
                error: null,
                message: '',
                id:null
            }
        },

        created() {
            this.fetchData();
            this.sendModif();
        },
        
    
        methods: {

            fetchData() {
                this.loading = false;
                const params = new URLSearchParams();
                params.append('id', this.$route.params.id);
                //this.$route.params.id
                axios.post('http://files.sirius-school.be/products-api/?action=getDetail',params).then(response => {
                    console.log(this.item);
                    this.item = response.data.product;
                });
            },
        


            sendModif() {
                const params = new URLSearchParams();
                params.append('id', this.$route.params.id);
                params.append('name', this.item.name);
                params.append('ref', this.item.ref);
                params.append('qty', this.item.qty);
                params.append('price', this.item.price);
    
                axios.post('http://files.sirius-school.be/products-api/?action=updateProduct', params).then(response => {
                    console.log(response);
                    this.loading = false;
    
                    //this.item = response.data.product;
                    //console.log(response);
    
                    if(response.data.status == 'success') {
                        this.message = 'Produit mis à jour';
                    }
                    else
                    {
                        this.message = 'Veuillez, Reessayez plus tard svp';
                    }
                });
            }
        }
    }
    