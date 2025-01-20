import { Body, Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { GetLike } from "./dto/get-like.dto";
import { LikeService } from "./like.service";
import { ApiBearerAuth, ApiParam } from "@nestjs/swagger";

@Controller('like')
export class LikeController {
    constructor(
        private likeService: LikeService
    ) { }
    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiParam({
        name: 'id',
        description: 'ID of the news to get',
        required: true,
        type: Number,
    })
    getById(@Param() params: GetLike, @Body() body: GetLike) {
        return this.likeService.getById(params.id, body);
    }
}