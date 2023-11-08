import { Client, Account, ID} from 'appwrite';
import conf from '../config/conf';

class AuthService {
    client = new Client;
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }
    async createAccount({email, password, name}){
        try {
           const userAccount =  await this.account.create(ID.unique(), email, password, name);
           if(userAccount){
            return this.login({email, password});
            
           } else {
            return userAccount;
           }
        } catch(error){
            throw error;
        }
    }
    async login({email, password}){
        try {
            const response = await this.account.createEmailSession(email, password);
            return response;
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser(){
        try {
            const response =  await this.account.get();
            return response;
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error ", error);
        }
        return null;
    }
    async logout() {
        try {
            await this.account.deleteSession('current');
        } catch (error) {
            console.log("Appwrite service:: logout:: " , error);
        }
    }
}

const authService = new AuthService();

export default authService;