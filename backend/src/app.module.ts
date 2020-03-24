import { Module, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { GraphQLError } from 'graphql';
import { getMongoRepository } from 'typeorm';
import { User } from './entities/user.entity';
import * as jwt from 'jsonwebtoken';
const directiveResolvers = {
  hasRoles: async (next, source, args, ctx) => {
      const { roles } = args;

      const { currentUserID } = ctx;
      if (!currentUserID) {
          throw new GraphQLError('you dont have permission');
      }

      const foundUser = await getMongoRepository(User).findOne(currentUserID);

      if (roles.indexOf(foundUser.role) === -1) {
          throw new GraphQLError('warning');
      }

      return next();
  },
};
@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: true,
      directiveResolvers,
      typePaths: ['./**/*.graphql'],
      context: async ({ req, connection }) => {
        if (connection) {
          // check connection for metadata
          return { req: connection.context };
        }
        const auth = req && req.headers.authorization;
        if (!auth) {
            return false;
          }
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid token', 401);
          }
        jwt.verify(auth.split(' ')[1], 'manh.pham', (err, decoded) => {
            if (err) {
              throw new HttpException({
                status: HttpStatus.FORBIDDEN,
              }, 403);
            } else {
              req.user = decoded;
            }
          });
        return req.user;
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url:
        'mongodb+srv://root1:ZM0TBkzYD9ClZw9U@cluster0-ov7gi.mongodb.net/pvms1998?retryWrites=true&w=majority',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      logging: true,
    }),
    UserModule,
  ],
  providers: [AppService],
})
export class AppModule {}
