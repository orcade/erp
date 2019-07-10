const ProductAdd = {
        template: `

        <div>
    <h1>Produit n° {{ $route.params.id }}</h1>


    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div>
        <div>
            <label>Nom</label>
            <input type="text" v-model="item.name" />
        </div>
        <div>
            <label>Réf.</label>
            <input type="text" v-model="item.ref" />
        </div>
        <div>
            <label>Prix</label>
            <input type="text" v-model="item.price" />
        </div>
        <div>
            <label>Qté</label>
            <input type="text" v-model="item.qty" />
        </div>
        <div>
            <button class="valider" v-on:click="sendModif">Valider</button>

            <button class= "valider">
            <router-link class= "valider" to="/product/product-list">Retour</router-link>
            </button>
        </div>
    </div>


    {{ message }}
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

    methods: {
        sendModif() {
            const params = new URLSearchParams();
            params.append('name', this.item.name);
            params.append('ref', this.item.ref);
            params.append('qty', this.item.qty);
            params.append('price', this.item.price);

            axios.post('http://files.sirius-school.be/products-api/?action=insertProduct', params).then(response => {
                console.log(response);
                this.loading = false;

                //this.item = response.data.product;
                //console.log(response);

                if(response.data.status == 'success') {
                    this.message = 'Produit ajouté';
                }
                else
                {
                    this.message = 'Veuillez, Reessayez plus tard svp';
                }
            });
        }
    }
}
