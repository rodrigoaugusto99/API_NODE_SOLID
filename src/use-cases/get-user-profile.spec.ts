import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';
import { GetUserProfileUseCase } from './get-user-profile';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });
  it('should be able to get user profile', async () => {
    const userCreated = await usersRepository.create({
      email: 'rodrigo@a.com',
      name: 'rodrigo augusto',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      userId: userCreated.id,
    });

    expect(user.name).toEqual('rodrigo augusto');
  });

  it('should not be able to get user profile withh wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
