import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {
  private filePath = path.join(process.cwd(), 'public', 'data.json');
  private fileContent = fs.readFileSync(this.filePath, 'utf-8');
  private users = JSON.parse(this.fileContent); // Parse JSON into an object or array

  private saveToFile(data: any): void {
    const jsonData = JSON.stringify(data, null, 2); // Pretty-print JSON with 2 spaces
    fs.writeFileSync(this.filePath, jsonData, 'utf-8');
  }
  getAllUser() {
    const Id = this.users.pop().id;
    return { users: this.users };
  }

  getSingleUser(id: number) {
    return (
      this.users.find((user) => user.id === id) || { message: 'User not found' }
    );
  }
  CreateUser(payload) {
    const Id =
      this.users?.reduce((maxId, val) => {
        return val?.id > maxId ? val?.id : maxId;
      }, 0) + 1;
    const users = this.users;
    const SameUser = this.users.find((use) => use?.user === payload?.user);
    if (SameUser) return { msg: 'User Already Exists' };
    const newUser = { id: Id, ...payload };
    users.push(newUser);
    this.saveToFile(users);
    return { Id, body: { ...newUser, timestamp: new Date().toISOString() } };
  }
  UpdateUser(id, payload: any) {
    const user = this.users;
    const userIndex = user.findIndex((us) => us.id == id);
    if (userIndex !== -1) {
      user[userIndex] = { ...user[userIndex], ...payload };
      this.saveToFile(user);
      return user[userIndex];
    }
    return { message: 'User not found' };
  }

  DeleteUser(id: number) {
    const users = this.users;
    const deletedUser = users.filter((us) => us.id != id);
    if (deletedUser.length === users.length) {
      return { message: 'User not found' };
    }
    this.saveToFile(deletedUser);

    return { message: 'User deleted successfully', deletedUser };
  }
}
