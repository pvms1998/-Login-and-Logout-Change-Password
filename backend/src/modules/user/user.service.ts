import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-core';
import { User } from '../../entities/user.entity';
import { MongoRepository, getMongoRepository } from 'typeorm';

import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserInput, LoginResponse } from 'src/graphql.schema';
import { GraphQLError } from 'graphql';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      role: 'MEMBER',
    });
  }
  async me(id: string): Promise<User> {
    const account = await getMongoRepository(User).findOne(id);
    if (!account) {
      throw new GraphQLError('User doesnt exit');
    }
    return account;
  }

  async create(input: UserInput): Promise<User> {
    const {username, password} = input;
    const check = await getMongoRepository(User).findOne({username});
    if (check) {
      throw new GraphQLError('Username đã tồn tại');
    }
    const hash = bcrypt.hashSync(password, 10);
    const user = {
      username,
      password: hash,
      role: 'MEMBER',
      activate: false,
    };
    return this.userRepository.save(user);
  }
  async login(username: string, password: string): Promise<LoginResponse> {
    const activate = await getMongoRepository(User).findOne({activate: true});
    const account = await getMongoRepository(User).findOne({username});
    if (!activate && account.role === 'MEMBER') {
      throw new ApolloError('Tài khoản chưa được kích hoạt', '201', {});
    }
    const check = await bcrypt.compare(password, account.password);
    if (!account || !check) {
      throw new ApolloError('Incorrect username or password', '401', {});
    }
    const token = await jwt.sign(
      { currentUserID: account._id }, 'manh.pham');
    return { token };
  }
  async deleteUser(username: string) {
    const foundUser = await getMongoRepository(User).findOne({username});
    if (!foundUser) {
      throw new ApolloError('User doesnt exit');
    }
    const deleteuser = await getMongoRepository(User).deleteOne(foundUser);
    return deleteuser.deletedCount;
  }
  async changePassword(id: string, oldpassword: string, password: string) {
    const foundUser = await getMongoRepository(User).findOne(id);
    const check = await bcrypt.compare(oldpassword, foundUser.password);
    if (!check) {
      throw new ApolloError('Incorrect password', '401', {});
    }
    const hash = bcrypt.hashSync(password, 10);
    foundUser.password = hash;
    const update = getMongoRepository(User).save(foundUser);
    return update ? true : false;
  }
  async activateUser(id: string) {
    const foundUser = await getMongoRepository(User).findOne(id);
    if (foundUser.activate === false) {
      foundUser.activate = true;
    } else {
      foundUser.activate = false;
    }
    return getMongoRepository(User).save(foundUser);
  }
}
