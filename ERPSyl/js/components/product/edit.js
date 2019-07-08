const ProductEdit = {
        template: `
        <div>
        
        <h1>Modifier les produits</h1>
        
        
        
        <div v-if="loading" class="loading">
          Loading...
        </div>
        
        <div v-if="error" class="error">
          {{ error }}
        </div>

        <div>
            <input v-model="itemName" v-on:keyup.enter="postItemName" placeholder="Modifier le nom du produits">
            <label>Nom: {{ item.name}}</label><br />
        </div>

        <button @click.prevent='postResponse'>Envoyer</button>


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