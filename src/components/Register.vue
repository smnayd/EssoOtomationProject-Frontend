<template>
    <div class="container">
        <div class="card">
            <div class="card-body">
                <h1>Register</h1>
                <p>Please fill all the fields to create an account.</p>

                <label for="username"><b>Username</b></label>
                <input v-model="user.username" ref="username" type="text" placeholder="Enter Username" name="username"/>

                <label for="email"><b>Email</b></label>
                <input v-model="user.email" ref="email" type="email" placeholder="Enter Email" name="email"/>

                <label for="psw"><b>Password</b></label>
                <input v-model="user.password" ref="psw" type="password" placeholder="Enter Password" name="psw"/>

                <label>
                    <input type="checkbox"   name="remember" style="margin-bottom:15px"/> Remember me
                </label>

                <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p>

                <div class="clearfix">
                    <button class="button" @click="signup()">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default{
    data(){
        return{
            user:{
                username:"",
                email:"",
                password:""
            },
        }
    },
    methods: {
        signup(){
                if(this.checkValidation()){
                    this.$ajax.post("Users/Registration/", {Username:this.user.username, Password:this.user.password, Email:this.user.email})
                    .then(response => {
                        if(response.data){
                            Swal.fire("Successfully registered")
                            .then(()=>{
                                this.$router.push('/login');
                            });
                        }else{
                            Swal.fire("Error: Something went wrong.(You cannot create an account with an existing email address!");
                        }
                    })
                    .catch(error=> {
                        if(error.response){
                            Swal.fire(error.response.data);
                        }
                    });
                }
        },
        checkValidation(){
            if(!this.user.username){
                    this.$refs.username.focus();
                    Swal.fire("Give username!");
                    return;
                }
            if(!this.user.email){
                    this.$refs.email.focus();
                    Swal.fire("Give password!");
                    return;
                }
            if(!(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/).test(this.user.email)){
                this.$refs.email.focus();
                Swal.fire("Give a correct email!");
                return;
            }
            if(!this.user.password){
                this.$refs.psw.focus();
                Swal.fire("Give password!");
                return;
            }
            return true;
        }
    }
}
</script>

<style scoped>
    .container{
        width: 35%;
        height: -30px;
        padding: 70px 30px 50px 80px;
    }
    input[type=text], input[type=password], input[type=email]{
        width: 100%;
        padding: 15px;
        margin: 5px 0 22px 0;
        display: inline-block;
        border: none;
        background: #f1f1f1;
    }
    input[type=text]:focus, input[type=password]:focus, input[type=email]:focus{
        background-color: #ddd;
        outline: none;
    }

    button{
        background-color: rgb(26, 15, 97);
        width: 60%;
        color: rgb(254, 254, 254);
        border: 2px black; 
        border-radius: 30px;       
        padding: 15px 35px;    
        text-align: center;    
        text-decoration: none;    
        display: inline-block;    
        font-size: 18px;  
        margin: 5px 65px;    
        cursor: pointer;
        transition-duration: 0.3s;
    }
    button:hover{
        background-color: lightblue;
    }
</style>