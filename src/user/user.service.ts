import { Injectable } from '@nestjs/common';


const Users = [
    {
        id : 1 ,
        user : 'R'
    },
    {
        id : 2 ,
        user : 'D'
    },
    {
        id : 3 ,
        user : 'K'
    },
    {
        id : 4 ,
        user : 'R'
    }
]


@Injectable()
export class UserService {
    getAllUser(){
        return Users;
    }
getSingleUser(id:number){
   return Users?.find((val,i)=>val?.id === id)
}

}
