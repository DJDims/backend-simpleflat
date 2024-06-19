import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Login by credentials' })
    @ApiResponse({ status: 201, description: 'Logined' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Not found' })
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get your profile' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    getProfile(@Request() req) {
        return req.user;
    }

    @Post('email/:token')
    @ApiResponse({ status: 201, description: 'OK' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiResponse({ status: 404, description: 'Not found' })
    async verifyEmail(@Param('token') token: string) {
        return await this.authService.verifyEmail(token);
    }
}
