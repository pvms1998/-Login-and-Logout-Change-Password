import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { LoginResponse, UserInput } from 'src/graphql.schema';
import { User } from 'src/entities/user.entity';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async hello() {
    return await 'world';
  }

  @Query(() => [User])
  async user() {
    return this.userService.findAll();
  }
  @Query(() => [User])
  async me(@Context('currentUserID')currentUserID: string) {
    return await this.userService.me(currentUserID);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: UserInput) {
    return await this.userService.create(input);
  }
  @Mutation()
  async login(@Args('input') input: UserInput): Promise<LoginResponse> {
    const { username, password } = input;
    const loginResponse = await this.userService.login(username, password);
    return loginResponse;
  }
  @Mutation(() => User)
  async deleteUser(@Args('username') username: string) {
    return await this.userService.deleteUser(username);
  }
  @Mutation(() => User)
  async activateUser(@Args('id') id: string) {
    return await this.userService.activateUser(id);
  }
  @Mutation()
  async changePassword(@Args('id') id: string, @Args('oldpassword') oldpassword: string, @Args('password') password: string) {
    return await this.userService.changePassword(id, oldpassword, password);
  }
}
