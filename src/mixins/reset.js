
import firebase from "firebase";
export default {
    methods:{
        resetPassword() {  
            firebase.auth().sendPasswordResetEmail(this.email)
            .then( () =>{
                this.alert('Na twój mail wysłano link resetujący','success');  
                this.email = '';
            }).catch( ()=>{
                this.alert('Wystąpił jakiś problem','error');  
            })
        
        },
    }
}