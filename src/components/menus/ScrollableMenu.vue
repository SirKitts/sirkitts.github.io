<template>
    <div class="scrollmenu">
        <a href="./">HOME</a>
        <a href="./#services">SERVICES</a>
        <a href="./#products">PRODUCTS</a>
        <a href="./#aboutus">ABOUT US</a>
        <a href="./#contactus">CONTACT US</a>
    </div>
</template>

<script>
export default {
    name: 'scrollablemenu',
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        onClick($event) {
             this.$emit('click', $event);
        }
    }
}
</script>

<style scoped>
div.scrollmenu {
    background-color: #333;
    overflow: auto;
    white-space: nowrap;
}

div.scrollmenu a {
    display: inline-block;
    color: #fff;
    text-align: center;
    padding: 14px;
    text-decoration: none;
    font-size: 14px;
    font-weight: bold;
}

div.scrollmenu a:hover {
    background-color: #777;
}
</style>
