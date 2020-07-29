<template>
  <section class="design-images">
    <div v-for="(design, index) in designs" :key="index" class="thumb-icons">
        <img :src="design | logoUrl" class="thumbnail" />
        <p class="title-font">{{ design }}</p>
    </div>
  </section>
</template>

<script>
export default {
    name: 'servicesdesignimages',
    data () {
        return {
            baseUrl: 'http://www.hexsoftstudio.com/images/design-services-icons/256px/',
            designs: [
                'App',
                'Business Card',
                'Brochure',
                'Character',
                'Flyer',
                // 'Graphic',
                'Icon',
                'Logo',
                // 'Tshirt',
                'Vector',
                'Web',
            ]
        }
    },
    filters: {
        logoUrl: function (value) {
            const baseUrl = 'http://www.hexsoftstudio.com/images/design-services-icons/256px/'
            if (!value) return ''
            const url = baseUrl + value.toString().replace(" ", "").toLowerCase() + '-design.png'
            return url
        }
    },
    methods: {}
}
</script>

<style scoped>
.design-images {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}
.thumb-icons {
    padding: 5px 5px;
}

.thumbnail {
    width: 90px;
    height: 90px;
}

/*
.title-font {
    display: flex;
}
*/

@media only screen and (max-device-height: 812px) and (orientation: portrait) {
    .thumbnail {
        width: 50px;
        height: 50px;
    }
}

@media only screen and (max-device-height: 736px) and (orientation: portrait) {
    .thumbnail {
        width: 60px;
        height: 60px;
    }
}

@media only screen and (max-device-height: 731px) and (orientation: portrait) {
    .thumbnail {
        width: 40px;
        height: 40px;
    }
}

@media only screen and (max-device-width: 411px) and (orientation: portrait) {
    .thumbnail {
        width: 50px;
        height: 50px;
    }
}

@media only screen and (max-device-width: 360px) and (orientation: portrait) {
    .thumbnail {
        width: 40px;
        height: 40px;
    }
}

@media only screen and (max-device-height: 1024px) and (orientation: lanscape) {
    .thumbnail {
        width: 90px;
        height: 90px;
    }
}

@media only screen and (max-device-height: 823px) and (orientation: landscape) {
    .thumbnail {
        width: 40px;
        height: 40px;
    }
}

@media only screen and (max-device-height: 768px) and (orientation: landscape) {
    .thumbnail {
        width: 90px;
        height: 90px;
    }
}

@media only screen and (max-device-height: 414px) and (orientation: landscape) {
    .thumbnail {
        width: 40px;
        height: 40px;
    }
}

</style>