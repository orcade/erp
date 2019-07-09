const ProductAdd = {
        template: `

        <div>
    <h1>Produit n° {{ $route.params.id }}</h1>

    {{ message }}

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
            <button v-on:click="sendModif">Valider</button>
        </div>
    </div>
    <router-link to="/product/list">Retour</router-link>
</div>
`,
    data() {
        return {
            loading: true,
            item: {},
            error: null,
            message: ''
        }
    },

    methods: {
        sendModif() {
            const params = new URLSearchParams();
            params.append('name', this.product.name);
            params.append('ref', this.product.ref);
            params.append('qty', this.product.qty);
            params.append('price', this.product.price);

            axios.post('http://files.sirius-school.be/products-api/?action=deleteProduct', params).then(response => {
                console.log(response);
                this.loading = false;
                this.item = response.data.product;
                console.log(response);

                if(response.data.status == 'success') {
                    this.message = 'Produit bien mis à jour!';
                }
                else
                {
                    this.message = 'Erreur, Reessayez plus tard!';
                }
            });
        }
    }
}
