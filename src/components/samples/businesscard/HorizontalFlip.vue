<template>
    <div class="flip-card flip-card-horizontal">
        <div class="flip-card-inner">
            <div class="flip-card-front flip-card-front-horizontal">
                <img :src="profile.store.logo" alt="John" style="width:50%; width:50%;">
                <div class="column">
                    <div style="margin: 14px 0;">
                        <h1>{{ profile.store.name }}</h1>
                        <p class="title">{{ profile.store.title }}</p>
                        <p>{{ profile.store.company }}</p>
                    </div>
                </div>
            </div>
            <div class="flip-card-back">
                <div class="column">
                    <div style="margin: 10px 0;">
                        <div><i class="fa fa-phone"></i> {{ profile.store.contact.phone }}</div>
                        <div><i class="fa fa-envelope"></i> {{ profile.store.contact.email }}</div>
                        <div><i class="fa fa-wifi"></i> {{ profile.store.contact.website }}</div>
                    </div>
                    <div style="margin: 10px 0;">
                        <div><i class="fa fa-twitter" ></i> {{ profile.store.social.twitter }}</div>
                        <div><i class="fa fa-linkedin"></i> {{ profile.store.social.linkedin }}</div>
                        <div><i class="fa fa-facebook"></i> {{ profile.store.social.facebook }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from './store'

export default {
	name: 'BusinessCardHorizontalFlip',
	data: () => ({
		profile: store
	})
}
</script>

<style src="./style.css"></style>
