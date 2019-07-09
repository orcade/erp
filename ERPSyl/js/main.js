
// 1. Define route components.
// These can be imported from other files

// files is loaded from js/components

// 2. Define some routes
const routes = [
    {path: '/', name: 'home', component: ProductList},
    {path: '/product/product-list', name: 'product-list', component: ProductList},
    {path: '/product/product-detail/:id', name: 'product-detail', component:ProductDetail},
    {path: '/product/product-add/:id', name: 'product-add', component:ProductAdd},
    {path: '/product/product-edit', name: 'product-edit', component:ProductEdit},
    {path: '/product/product-delete/:id', name: 'product-delete', component:ProductDelete}
];

// 3. Create the router instance and pass the `routes` option
const router = new VueRouter({
    routes // short for `routes: routes`
});

// 4. Create and mount the root instance.
const app = new Vue({
    router
}).$mount('#app');
