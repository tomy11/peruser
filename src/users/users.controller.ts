import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IResponse, IResponses } from '../utils/IResponse';
import { UserDto, UserResultDto } from './dto/users.dto';
import { Users } from './entity/users.entity';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersRepository: UsersService) {}

  @Get()
  async findAll(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<IResponse> {
    try {
      const current: number = limit ? limit : 100;
      const pageSize: number = offset ? offset : 0;

      const result = await this.usersRepository.findAll(current, pageSize);
      const resultData: IResponses = {
        message: 'get all user successfuly',
        data: result[0].datas,
        currenCount: result[0].datas.length,
        totalCount: result[0].countTotal,
      };
      this.logger.log('get all user successfuly');
      return resultData;
    } catch (error) {
      console.log('error ', error);
      const result: IResponse = {
        message: 'error get all user ',
        data: error.message,
      };
      this.logger.log('error get all user ', error);
      return result;
    }
  }

  @Get('/:id')
  async findName(@Param('id') id: number): Promise<IResponse> {
    try {
      const result: any = await this.usersRepository.findById(id);
      if (result != null || result != undefined) {
        const resultData: IResponse = {
          message: 'get user by id successfuly',
          data: result,
        };
        this.logger.log('get user by id successfuly');
        return resultData;
      } else {
        const resultData: IResponse = {
          message: 'get user by id not found',
          data: null,
        };
        return resultData;
      }
    } catch (error) {
      console.log('error ', error);
      const result: IResponse = {
        message: 'error get user by id ',
        data: error.message,
      };
      this.logger.log('error get user by id ', error);
      return result;
    }
  }

  @Get('/select/:id')
  async findUserSelectId(@Param('id') id: number): Promise<IResponse> {
    try {
      const result: any = await this.usersRepository.findUserSelect(id);
      if (result != null || result != undefined) {
        const resultData: IResponse = {
          message: 'get user by id select successfuly',
          data: result,
        };
        this.logger.log('get user by id select successfuly');
        return resultData;
      } else {
        const resultData: IResponse = {
          message: 'get user by id select not found',
          data: null,
        };
        return resultData;
      }
    } catch (error) {
      console.log('error ', error);
      const result: IResponse = {
        message: 'error get user by id ',
        data: error.message,
      };
      this.logger.log('error get user by id ', error);
      return result;
    }
  }

  @Post()
  async save(@Body() idata: UserDto): Promise<IResponse> {
    try {
      const result = await this.usersRepository.save(idata);
      const resultData: IResponse = {
        message: 'save user successfuly',
        data: result,
      };
      this.logger.log('save user successfuly');
      return resultData;
    } catch (error) {
      console.log('error ', error);
      const result: IResponse = {
        message: 'error save user ',
        data: error.message,
      };
      this.logger.log('error save user ', error);
      return result;
    }
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() idata: any,
  ): Promise<IResponse> {
    try {
      const result: UserResultDto = await this.usersRepository.update(
        id,
        idata,
      );
      const resultData: IResponse = {
        message: 'update user successfuly',
        data: result,
      };
      this.logger.log('update user successfuly');
      return resultData;
    } catch (error) {
      console.log('error ', error);
      const result: IResponse = {
        message: 'error update user ',
        data: error.message,
      };
      this.logger.log('error update user ', error);
      return result;
    }
  }
}
