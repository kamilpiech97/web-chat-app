<template>
    <div>
        <div class="button-div">
        <a v-on:click="openMenu();"><font-awesome-icon icon="bars" style="font-size:30px;" /></a>
        </div>
        <div class="container-fluid">
            <button id="button-addon23" style="position:absolute;z-index:1001;" type="submit" class="btn btn-link"> <font-awesome-icon icon="paper-plane" v-on:click="user()" /></button>
            <div class="row rounded-lg overflow-hidden shadow">
                <List />
                <SingleChat />
            </div>
        </div>
    </div>

</template>

<script>
// @ is an alias to /src
import List from "@/components/List.vue";
import SingleChat from "@/components/SingleChat.vue";
import firebase, { auth } from 'firebase';
import { mapGetters } from "vuex";
import store from "../store";

export default {
    name: "Board",
    data() {
        return {
        authUser:{},
        peerUser:{}
        };
    },
    components: {
        List,
        SingleChat
    },

    methods:{
        openMenu(){
            document.getElementById('messages-div').classList.add("active");
            console.log('open');
        },
        closeMenu(){
            document.getElementById('messages-div').classList.remove("active");
            console.log('close');
        },
        user(){
            alert(this.$store.state.user.uid);
        },
        
        hashString(str){
            console.log(this.peerUser);
            console.log(this.authUser);
            let hash = 0
            for (let i = 0; i < str.length; i++) {
                hash += Math.pow(str.charCodeAt(i) * 31, str.length - i)
                hash = hash & hash // Convert to 32bit integer
            }
            return hash
        },

        getGroupChatId(){
            this.messages=[];
            if ( this.hashString(this.authUser.uid) <= this.hashString(this.peerUser)) {
                this.groupChatId = `${this.authUser.uid}-${this.peerUser}`
            } else {
                this.groupChatId = `${this.peerUser}-${this.authUser.uid}`
            }
            
            store.dispatch("setChatId", this.groupChatId);
            console.log(this.groupChatId);
        },
        
    },

    
    created() {
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                console.log('works');
                store.dispatch("setSession", user);
                this.authUser=user;
            }else{
                this.authUser={}
            }
        })

        this.unsubscribe = this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'storePeerUser') {
                console.log(`Updating to ${state.currentPeerUser}`);
                
                this.peerUser=this.$store.state.currentPeerUser;
                this.getGroupChatId();
            }
        });

    },
    
    beforeDestroy() {
        this.unsubscribe();
    },
    
    beforeRouteEnter(to,from,next){
        next(vm=>{
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
            next();
            }else{
            next('/login');
            }
        })
        })
    }
};
</script>
