import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, getRepository} from 'typeorm';
import {UserEntity} from '../../registration/entity/user.entity';
import {UserRO} from '../../registration/interfaces/user.interface';
import {CreateUserDto} from '../../registration/dto';
import {validate} from 'class-validator';

@Injectable()
export class RegistrationService {
    // 'UserRepositoryToken'
    constructor(@InjectRepository(UserEntity)
                private readonly userRepository: Repository<UserEntity>) {
    }

    async create(dto: CreateUserDto): Promise<UserRO> {
        const {name, password, email} = dto;

        const cn = await getRepository(UserEntity)
            .createQueryBuilder('users')
            .where('users.name = :name', {name})
            .orWhere('users.email = :email', {email});
        const user = await cn.getOne();

        if (user) {
            const errors = {name: 'Username is already exist'};
            throw new HttpException({message: 'Dublicate username', errors}, HttpStatus.BAD_REQUEST);
        }

        let newUser = new UserEntity();
        newUser.name = dto.name;
        newUser.password = dto.password;
        newUser.email = dto.email;

        const error = await validate(newUser);

        if (error.length > 0) {
            const _errors = {name: 'Username is not valid'};
            throw new HttpException({message: 'Input data validation  failed', _errors}, HttpStatus.BAD_REQUEST);
        } else {
            const savedUser = await this.userRepository.save(newUser);
            return this.buildUser(savedUser);
        }
    }

    private buildUser(user: UserEntity) {
        const userSave = {
            name: user.name,
            email: user.email
        };
        return {user: userSave};
    }
}