import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<any> {
    const user = await this.repository.createQueryBuilder("user")
      .leftJoinAndSelect("user.games", "games")
      .where(`user.id = '${user_id}'`)
      .getOne();
    return user;
    // Complete usando ORM
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(
      `SELECT *
      FROM users
      ORDER BY first_name ASC`
    );
     // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(
      `SELECT *
      FROM users
      WHERE UPPER(first_name) = '${first_name.toUpperCase()}'
      AND UPPER(last_name) = '${last_name.toUpperCase()}'`
    );
     // Complete usando raw query
  }
}
