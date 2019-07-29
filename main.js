moment.locale("pt")

Vue.component('title-article', {
    template: '<h1><slot></slot></h1>'
})

Vue.component('dropdown', {
    template: `
     <li class="nav-item dropdown">
        <a @click.prevent="toggle"
            class="nav-link dropdown-toggle"
            :class="{ show: showMenu }"
            href="#">
            {{ label }}: {{ value }}
        </a>
        <div class="dropdown-menu"
            :class="{ show: showMenu }">
            <a v-for="option in options"
                class="dropdown-item" href="#"
                @click.prevent="change(option)"
                v-text="option"></a>
        </div>
    </li>
    `,
    data() {
        return {
            showMenu: false
        }
    },
    props: {
        value: String,
        options: Array,
        label: String
    },
    methods: {
        toggle() {
            this.showMenu = !this.showMenu
        },
        change(option) {
            this.$emit('input', option)
            this.showMenu = false
        }
    }
})

Vue.component('nav-bar', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Clarim Diário</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse"  id="navbarSupportedContent" >
      <ul class="navbar-nav ml-auto">
        <dropdown label="Category" 
      v-model="category"
      :options="categories"></dropdown>
        <dropdown label="Country"
      v-model="country"
      :options="countries"></dropdown>
      </ul>
    </div>
  </nav>
        `,
    data() {
        return {
            showMenuCategories: false,
            showMenuCountries: false,
            category: 'sports',
            country: 'pt',
            categories: [
                "business",
                "entertainment",
                "general",
                "health",
                "science", 
                "sports",
                "technology"
            ],
            countries: [
                "ae",
                "ar",
                "at",
                "au",
                "be",
                "bg",
                "br",
                "ca",
                "ch",
                "cn",
                "co",
                "cu",
                "cz",
                "de",
                "eg",
                "fr",
                "gb",
                "gr",
                "hk",
                "hu",
                "id",
                "ie",
                "il",
                "in",
                "it",
                "jp",
                "kr",
                "lt",
                "lv",
                "ma",
                "mx",
                "my",
                "ng",
                "nl",
                "no",
                "nz",
                "ph",
                "pl",
                "pt",
                "ro",
                "rs",
                "ru",
                "sa",
                "se",
                "sg",
                "si",
                "sk",
                "th",
                "tr",
                "tw",
                "ua",
                "us",
                "ve",
                "za"
            ]


        }
    },
    methods: {
        goCategory(category) {
            this.$emit("category-change", category)
            this.showMenuCategories = false
        },
        goCountry(country) {
            this.$emit("country-change", country)
            this.showMenuCountries = false
        }
    },
    watch: {
        category: 'goCategory',
        country: 'goCountry'
    }
    
})


Vue.component('footer-bar', {
    template: `
    <footer class="navbar navbar-expand-lg navbar-light bg-light">
    feito com

    <ul class="list-group list-group-horizontal ml-auto">
        <li class="list-group-item">
            <a href="https://vuejs.org/">
                <img  width="30px" src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png">
            </a>
        </li>
        <li class="list-group-item">
            <a href="https://getbootstrap.com/">
                <img  width="30ox" src="https://www.pinclipart.com/picdir/big/35-353932_bootstrap-bootstrap-4-logo-png-clipart.png">
            </a>
        </li>
    </ul>
    </footer>
        `,

})


Vue.component('article-columns', {
    template: '<div class="card-columns"><slot></slot></div>'
})

Vue.component('article-card', {
    template: `

        <div class="card">
            <img :src="article.urlToImage" class="card-img-top" :alt="article.title">
            <div class="card-body">
                <h5 class="card-title" v-text="article.title"></h5>
                <p class="card-text" v-text="article.content">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a :href="article.url" class="btn">leia mais</a>
                <!--button class="btn btn-warning btn__favorite">
                    <i>&#9734;</i>
                    <i>&#9733;</i>
                </button -->
            </div>
            <div class="card-footer">
                <small class="text-muted" v-text="fromNow"></small>
            </div>
        </div>

    `,
    methods: {
        isSapo(article) {
            return article.source.name == 'Sapo.pt'
        }

    },
    props: {
        article : Object
    },
    computed: {
        fromNow() {
            return moment(this.article.publishedAt).fromNow()
        }
    }

})

Vue.component('article-card-news', {
    template: `
        <div class="card"  :class="{'border-success' : isSapo(article) }">
            <div class="row">
                <div class="col-md-5">
                    <img :src="article.urlToImage" class="card-img-top" :alt="article.title">
                </div>
                <div class="col-md-7">
                    <div class="card-body">
                        <h5 class="card-title" v-text="article.title"></h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a :href="article.url" class="btn">leia mais</a>
                        <!--button class="btn btn-warning btn__favorite" :data-id="article.publishedAt">
                            <i>&#9734;</i>
                            <i>&#9733;</i>
                        </button-->
                    </div>
                    <div class="card-footer">
                <small class="text-muted" v-text="fromNow"></small>
            </div>
                </div>
            </div>
        </div>
    `,
    methods: {
        isSapo(article) {
            return article.source.name == 'Sapo.pt'
        }
    },
    props: {
        article : Object
    },
    computed: {
        fromNow() {
            return moment(this.article.publishedAt).fromNow()
        }
    }

})

new Vue({
    el: "#root",
    data: {
        articles: [],
        favorites: [],
        categorySelected:  "",
        country: 'pt',
        category: 'sports'
    },
    mounted() {
        this.loadNews()


    },
    computed: {
        recentArticles() {
            return this.articles.filter(article => 
                moment(article.publishedAt).isAfter(moment().subtract(2, 'hours'))
            )
        },

        olderArticles() {
            return this.articles.filter(article => !this.recentArticles.includes(article) )
        },
    },
    methods: {
        loadNews() {
            axios.get('https://newsapi.org/v2/top-headlines', {
                params: {
                    country: this.country,
                    category: this.category,
                    apiKey: 'a141caba00b34f80af293be1ba12e184'
                }
            })
                .then(response => this.articles = response.data.articles)
        },
        onCategoryChange(category) {
            this.category = category
            this.loadNews()
        },
        onCountryChange(country) {
            this.country = country
            this.loadNews()
        }
    }


})




