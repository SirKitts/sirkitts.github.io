<template>
    <v-card class="card card-input">
        <v-tabs v-model="tab" background-color="primary" dark>
            <v-tab>Personal</v-tab>
            <v-tab>Contact</v-tab>
            <v-tab>Style</v-tab>
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <img :src="profile.store.logo" alt="John" style="width:100%;">
                            <h1><v-text-field label="Name" v-model="profile.store.name"></v-text-field></h1>
                            <v-text-field label="Title" v-model="profile.store.title"></v-text-field>
                            <v-text-field label="Company" v-model="profile.store.company"></v-text-field>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <div style="margin: 14px 0;">
                                <v-text-field label="Phone" v-model="profile.store.contact.phone"></v-text-field>
                                <v-text-field label="Email" v-model="profile.store.contact.email"></v-text-field>
                                <v-text-field label="Website" v-model="profile.store.contact.website"></v-text-field>
                                <v-text-field label="Twitter" v-model="profile.store.social.twitter"></v-text-field>
                                <v-text-field label="LinkedIn" v-model="profile.store.social.linkedin"></v-text-field>
                                <v-text-field label="Facebook" v-model="profile.store.social.facebook"></v-text-field>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <div style="margin: 14px 0;">
                                <v-checkbox 
                                    v-model="style.horizontal"
                                    :label="` Horizontal Orientation`"
                                    color="indigo"
                                    name="StyleHorizontal"
                                    @change="isHorizontal"></v-checkbox>
                                <v-checkbox 
                                    v-model="style.flipped" 
                                    :label="` With Back Design`"
                                    color="indigo"
                                    name="Flipped"
                                    @change="isFlipped"></v-checkbox>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-tabs>
    </v-card>
</template>

<script>
import store from './store'

export default {
	name: 'BusinessCardCustomiser',
    data () {
        return {
            profile: store,
            rules: [
                value => !!value || 'Required.',
                value => (value && value.length >= 3) || 'Min 3 characters',
            ],
            tab: null,
            style: {
                flipped: false,
                horizontal: false
            }
        }
	},
	methods: {
		isFlipped() {
			this.$emit('is-flipped', this.style.flipped)
		},
		isHorizontal() {
            this.$emit('is-horizontal', this.style.horizontal)
		}
	}
}
</script>

<style src="./style.css"></style>
