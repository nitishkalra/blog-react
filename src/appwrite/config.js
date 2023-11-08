import { Client, ID, Databases, Storage, Query} from 'appwrite';
import conf from '../config/conf';

export class Service {
    client = new Client();
    databases;
    bucket;
 
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client); 
        this.bucket = new Storage(this.client);
    }
    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                status,
                featuredImage,
                userId
            })
        } catch (error) {
            console.log("Appwrite Service:: createPost:: ", error);
        }
    }
    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                status,
                featuredImage
            })
        } catch (error) {
            console.log("Appwrite Service:: updatePost:: ", error);
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
            return true;
        } catch (error) {
            console.log('Appwrite Service: deletePost ', error);
            return false;
        }
    }
    async getPost(slug){
        try {
            const response =  await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
            console.log('get post-----');
            console.log(response);
            return response;
        } catch (error) {
            console.log('Appwrite service:: getPost:: ', error);
            return false;
        }
    }
    async getPosts(queries = [Query.equal('status', 'active')]){
        try {  
            const response =  await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
            console.log(response);
            return response;
        } catch (error) {
            console.log('Appwrite service:: getPosts:: ', error);
            return false;
        }
    }

    // file upload methods
    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
        } catch (error) {
            console.log('Appwrite service:: uploadFile ', error);
            return false;
        }
    }
    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
        } catch (error) {
            console.log('Appwrite service:: deleteFile ', error);
            return false;
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    }
}

const service = new Service();

export default service